import { Interface } from "readline";

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
