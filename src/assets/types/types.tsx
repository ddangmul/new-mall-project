import { User } from "next-auth";

export interface Address {
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

export type AddressWithCheck = Address & { checked?: boolean };

export type Item = {
  id?: number;
  title: string;
  image: string;
  category?: string;
  description: string;
  price: number;
  sales?: number;
  createdAt?: Date;
};

// quantity가 추가된 Item
export interface ItemWithQuantity extends Item {
  quantity: number;
}

// 주소 추가 시 사용할 타입
export type AddressInput = Omit<Address, "id" | "user"> & {
  id?: number;
  user?: User;
};

export type NewUser = Omit<User, "addresses"> & {
  addresses?: Address[];
};
