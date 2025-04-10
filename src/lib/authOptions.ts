import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NewUser } from "../../types/next-auth";
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

        const customUser: NewUser = {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
          birthdate: user.birthdate,
          mobile: user.mobile,
        };

        return customUser;
      },
    }),
    // 구글 로그인 제공자
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "select_account", // 매번 계정 선택하게 함
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          username: profile.name,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user) {
        console.error("Google 로그인 실패: 사용자 정보가 없습니다.");
        return false;
      }

      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              username: profile?.name ?? "", // 기본값 설정
              provider: "google",
              password: null,
              birthdate: null,
              mobile: null,
              // birthdate, mobile 등은 나중에 입력 받거나 비워두기
            },
          });
        }
      }

      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username ?? null;
        token.birthdate = user.birthdate ?? null;
        token.mobile = user.mobile ?? null;
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

        console.log("session.user:", session.user); // 확인용
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
