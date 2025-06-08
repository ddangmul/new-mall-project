import { Address } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {

  interface User {
    id: string;
    username: string;
    birthdate: string;
    mobile: string;
    provider: string;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      birthdate: string;
      mobile: string;
      accessToken?: string;
      provider: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    email?: string | null;
    username?: string | null;
    birthdate?: string | null;
    mobile?: string | null;
    provider?: string;
  }
}
