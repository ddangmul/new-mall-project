import NextAuth from "next-auth";

export interface Item {
  title: string;
  image: string;
  price: number;
  category: string;
  sales: number;
}

export interface User {
  username: string;
  email: string;
  password: string;
  birthdate: string;
}

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    username: string;
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    email: string;
    username: string;
  }
}
