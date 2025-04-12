import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
// import { NewUser } from "../../types/next-auth";
import GoogleProvider from "next-auth/providers/google";

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
  ],
  callbacks: {
    signIn: async ({ user, account }) => {
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

          const existingUser = await prisma.user.findUnique({
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
                mobile: phone,
              },
            });
          }
        } catch (err) {
          console.error("People API 에러:", err);
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username ?? null;
        token.birthdate = user.birthdate ?? null;
        token.mobile = user.mobile ?? null;
      }

      if (account?.provider === "google" && account?.access_token) {
        token.accessToken = account.access_token; // 구글의 accessToken을 JWT에 추가
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.birthdate = token.birthdate;
        session.user.mobile = token.mobile;
        session.user.accessToken = token.accessToken;

        // console.log("session.user:", session.user); // 확인용
      }
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
