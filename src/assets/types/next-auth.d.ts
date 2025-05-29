import { Address } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Address {
    id: string;
    postcode: string;
    address: string;
    detailAddress: string;
    isDefault: boolean;
    userId: string;
    addressname: string;
    addressmobile: string;
    user: User;
  }

  interface User {
    id: string;
    username: string;
    birthdate: string;
    mobile: string;
    addresses: any[];
    provider: string;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      birthdate: string;
      mobile: string;
      addresses?: Address[];
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
    addresses?: string | null;
    provider?: string;
  }
}
