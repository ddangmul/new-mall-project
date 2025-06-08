import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import { TokenSet } from "next-auth";

// Kakao 프로필 타입 정의
interface KakaoAccount {
  email: string | null;
  profile: {
    nickname?: string;
    email?: string;
  };
}

interface KakaoProfile {
  id: number; // 카카오는 number 타입을 반환하므로 number로 설정
  kakao_account: KakaoAccount;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { addresses: true },
        });

        if (!user) {
          throw new Error("사용자가 존재하지 않습니다.");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        return {
          id: user.id,
          username: user.username,
          email: user.email,
          birthdate: user.birthdate,
          mobile: user.mobile,
          provider: user.provider,
          addresses: user.addresses,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account",
          scope:
            "openid email profile https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read",
        },
      },
      // profile: 액세스 토큰으로 가져온 사용자 정보를 앱의 User 형태로 매핑 (user 반환)
      profile: (profile) => {
        return {
          id: profile.sub ?? profile.id,
          name: profile.name,
          email: profile.email,
          mobile: null,
          birthdate: null,
          username: profile.name ?? "구글 사용자",
          provider: "google",
          addresses: [],
        };
      },
    }),

    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
      // TokenSet의 access_token으로 api호출, 생일 데이터 가져오기 추가
      authorization: {
        params: {
          scope: "profile_nickname account_email",
        },
      },
      profile: async (profile: KakaoProfile, tokens: TokenSet) => {
        let birthday: string | null = null;

        try {
          const response = await fetch("https://kapi.kakao.com/v2/user/me", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${tokens.access_token}`,
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          });

          const data = await response.json();
          const kakaoAccount = data.kakao_account;

          if (!kakaoAccount) {
            throw new Error("카카오 계정 정보가 없습니다.");
          }
          if (kakaoAccount?.birthday) {
            birthday = birthday = `${kakaoAccount.birthday.slice(
              0,
              2
            )}-${kakaoAccount.birthday.slice(2)}`;
          }
        } catch (err) {
          console.error("카카오 API 호출 오류:", err);
        }

        const email =
          profile.kakao_account.email || `kakao_${profile.id}@kakao.com`; // 이메일이 없을 경우 기본값 설정
        const username =
          profile.kakao_account.profile?.nickname || `kakao_${profile.id}`; // 닉네임이 없을 경우 기본값 설정

        return {
          id: String(profile.id), // `profile.id`를 string으로 변환
          name: username || "카카오 사용자",
          email: email,
          mobile: null,
          birthdate: birthday || null, // 카카오는 비즈니스 앱에만 생일 정보 수집 가능
          username: username,
          provider: "kakao",
          addresses: [],
        };
      },
    }),
  ],

  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (account?.provider === "google" && account.access_token) {
        try {
          const res = await fetch(
            "https://people.googleapis.com/v1/people/me?personFields=birthdays,phoneNumbers",
            {
              headers: {
                Authorization: `Bearer ${account.access_token}`,
              },
            }
          );
          const data = await res.json();

          const phone = data.phonenumbers?.[0]?.value ?? null;
          const birthday = data.birthdays?.[0]?.date
            ? `${data.birthdays[0].date.year}-${data.birthdays[0].date.month
                .toString()
                .padStart(2, "0")}-${data.birthdays[0].date.day
                .toString()
                .padStart(2, "0")}`
            : null;

          let existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email!,
                username: user.name ?? "구글 사용자",
                provider: "google",
                password: null,
                birthdate: birthday,
                ...(phone && { mobile: phone }),
              },
            });

            existingUser = await prisma.user.findUnique({
              where: { email: user.email! },
            });

            if (existingUser) {
              user.id = existingUser.id;
              user.username = existingUser.username;
              user.birthdate = existingUser.birthdate;
              user.mobile = existingUser.mobile;
            }
          }
        } catch (err) {
          console.error("People API 에러:", err);
        }
      }

      if (account?.provider === "kakao") {
        try {
          const kakaoProfile = profile as any;
          const kakaoAccount = kakaoProfile?.kakao_account;

          const email =
            kakaoAccount.email || `kakao_${kakaoProfile.id}@kakao.com`; // 이메일이 없을 경우 기본값 설정
          const username =
            kakaoAccount.profile?.nickname || `kakao_${kakaoProfile.id}`; // 닉네임이 없을 경우 기본값 설정

          let existingUser = await prisma.user.findUnique({
            where: { email },
          });

          if (!existingUser) {
            await prisma.user.create({
              data: {
                email,
                username,
                provider: "kakao",
                password: null,
                birthdate: null,
                mobile: null,
              },
            });

            existingUser = await prisma.user.findUnique({ where: { email } });
          }

          if (existingUser) {
            user.id = existingUser.id;
            user.username = existingUser.username;
            user.birthdate = existingUser.birthdate;
            user.mobile = existingUser.mobile;
          }
        } catch (err) {
          console.error("카카오 로그인 처리 중 에러:", err);
        }
      }

      if (account?.provider === "credentials") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser && !existingUser.provider) {
          await prisma.user.update({
            where: { email: user.email! },
            data: { provider: "credentials" },
          });
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        console.log("jwt dbUser", dbUser);
        if (dbUser) {
          token.id = dbUser.id;
          token.email = dbUser.email;
          token.username = dbUser.username;
          token.birthdate = dbUser.birthdate;
          token.mobile = dbUser.mobile;
          token.provider = dbUser.provider;
        }
      }

      // 재로그인 시 user = undefined -> id 저장 안됨 등 문제 보완
      if (!token.id && token.email) {
        const existingUser = await prisma.user.findUnique({
          where: { email: token.email },
        });
        if (existingUser) {
          token.id = existingUser.id;
        }
      }

      if (account?.provider === "google" && account?.access_token) {
        token.accessToken = account.access_token;
      }

      return token;
    },

    // 클라이언트 useSession(), getSession() 호출 시 받을 세션 구조 커스터마이징
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.birthdate = token.birthdate as string;
        session.user.mobile = token.mobile as string;
        session.user.provider = token.provider as string;
      }

      if (token.accessToken) {
        session.user.accessToken = token.accessToken as string;
      }

      return session;
    },

    async redirect({ url, baseUrl }) {
      // 상대경로라면 baseUrl 붙여서 리턴
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // 동일한 도메인이라면 그대로 사용
      else if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },

  // 세션 전략
  session: {
    strategy: "jwt", //JSON Web Token
  },

  //JWT 서명 및 암호화된 쿠키 생성에 사용되는 비밀 키 -> JWT 검증 & 신뢰 가능한 세션 유지
  secret: process.env.NEXTAUTH_SECRET,

  debug: false,
};
