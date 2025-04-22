import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
// import { NewUser } from "../../types/next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions = {
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

        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
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
        };
      },
    }),
    // 구글 로그인 제공자
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account", // 매번 계정 선택하게 함
          scope:
            "openid email profile https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read",
        },
      },
      profile: (profile, tokens) => {
        console.log("Google 기본 프로필:", profile);
        console.log("Google accessToken:", tokens.access_token);

        // const res = await fetch(
        //   "https://people.googleapis.com/v1/people/me?personFields=birthdays,phoneNumbers",
        //   {
        //     headers: {
        //       Authorization: `Bearer ${tokens.access_token}`,
        //     },
        //   }
        // );

        // const data = await res.json();
        // console.log("Google People API 응답", JSON.stringify(data, null, 2));

        return {
          id: profile.sub ?? profile.id,
          name: profile.name,
          email: profile.email,
          // mobile: data.phoneNumbers?.[0]?.value ?? null,
          // birthdate: data.birthdays?.[0]?.date
          //   ? `${data.birthdays[0].date.year}-${data.birthdays[0].date.month
          //       .toString()
          //       .padStart(2, "0")}-${data.birthdays[0].date.day
          //       .toString()
          //       .padStart(2, "0")}`
          //   : null,
        };
      },
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "", // 카카오는 clientSecret 없어도 작동하지만 명시 가능
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

          const phone = data.phoneNumbers?.[0]?.value ?? null;
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
                username: user.name ?? "",
                provider: "google",
                password: null,
                birthdate: birthday,
                ...(phone && { mobile: phone }),
              },
            });

            // 생성 후 다시 조회해서 user.id 얻기
            existingUser = await prisma.user.findUnique({
              where: { email: user.email! },
            });

            // user 객체에 prisma의 id 설정
            if (existingUser) {
              user.id = existingUser.id;
              user.username = existingUser.username;
              user.birthdate = existingUser.birthdate;
              user.mobile = existingUser.mobile;
            }

            console.log("SignIn → user.id:", user.id);
          }
        } catch (err) {
          console.error("People API 에러:", err);
        }
      }

      if (account?.provider === "kakao") {
        try {
          const kakaoAccount = profile?.kakao_account;
          const kakaoProfile = kakaoAccount?.profile;

          const email = kakaoAccount?.email;
          const username = kakaoProfile?.nickname || "카카오사용자";

          if (!email) {
            throw new Error("카카오 이메일 정보를 가져올 수 없습니다.");
          }

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
        // 항상 이메일로 DB에서 유저 ID 조회
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.email = dbUser.email;
          token.username = dbUser.username;
          token.birthdate = dbUser.birthdate;
          token.mobile = dbUser.mobile;
          token.provider = dbUser.provider;
        }
      }

      if (account?.provider === "google" && account?.access_token) {
        token.accessToken = account.access_token; // 구글의 accessToken을 JWT에 추가
      }
      console.log("JWT token.email:", token.email);
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.birthdate = token.birthdate;
        session.user.mobile = token.mobile;
        session.user.accessToken = token.accessToken;
        session.user.provider = token.provider;
      }
      console.log("Final Session:", session);
      console.log("Token:", token);
      return session;
    },
    async redirect({ url, baseUrl }) {
      // 로그인 성공 후 항상 /myshop으로 리디렉션
      return `${baseUrl}/myshop`;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
