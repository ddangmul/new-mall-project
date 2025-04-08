import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Address {
    id: string;
    postcode: String;
    address: String;
    detailAddress: String;
    isDefault: Boolean;
    userId: number;
    addressname: String;
    addressmobile: String;
    user: User;
  }

  interface User {
    id: string;
    username: string;
    birthdate: string;
    mobile: string;
    addresses: any[];
  }

  interface Session {
    user: {
      id: string;
      username: string;
      birthdate: string;
      mobile: string;
      addresses: Address[]; // 실제 타입으로 바꿔도 좋음
    } & DefaultSession["user"];
  }

  interface JWT {
    id: string;
    email?: string | null;
    username?: string | null;
    birthdate?: string | null;
    mobile?: string | null;
    addresses?: string | null;
  }
}

// 주소 추가 시 사용할 타입
export type AddressInput = Omit<Address, "id" | "user"> & {
  id?: number;
  user?: User;
};
