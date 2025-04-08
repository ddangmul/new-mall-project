import { Address, User } from "next-auth";

// 주소 추가 시 사용할 타입
export type AddressInput = Omit<Address, "id" | "user"> & {
  id?: number;
  user?: User;
};

export type AddressWithCheck = Address & { checked?: boolean };
