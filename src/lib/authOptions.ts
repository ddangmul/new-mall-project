import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { User } from "next-auth";

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
        // username: { label: "username", type: "text" },
        // birthYear: { label: "birthYear", type: "text" },
        // birthMonth: { label: "birthMonth", type: "text" },
        // birthDay: { label: "birthDay", type: "text" },
        // mobile: { label: "mobile", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("이메일과 비밀번호를 입력해주세요.");
        }

        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { addresses: true },
        });

        if (!user) {
          // const hashedPassword = await bcrypt.hash(credentials.password, 10);
          // user = await prisma.user.create({
          //   data: {
          //     email: credentials.email,
          //     password: hashedPassword,
          //     username: credentials.username,
          //     birthdate: `${credentials.birthYear}-${credentials.birthMonth}-${credentials.birthDay}`,
          //     mobile: credentials.mobile,
          //   },
          // });
          throw new Error("사용자가 존재하지 않습니다.");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("비밀번호가 일치하지 않습니다.");
        }

        const customUser: User = {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
          birthdate: user.birthdate,
          mobile: user.mobile,
          addresses: user.addresses || undefined, // 타입 정의가 맞으면 OK
        };

        return customUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
        token.birthdate = user.birthdate;
        token.mobile = user.mobile;
        token.addresses = JSON.stringify(user.addresses); // 추가
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
        session.user.addresses = JSON.parse(token.addresses || "[]");

        console.log("session.user:", session.user); // 확인용
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};
