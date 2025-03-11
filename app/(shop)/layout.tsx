import type { Metadata } from "next";
import "../globals.css";
import MainImage from "@/components/main-img/main-image";
import ItemsCategory from "@/components/nav-bar/items_category_nav";

export const metadata: Metadata = {
  title: "Online Mall App",
  description: "online shop homepage",
};

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainImage />
      <ItemsCategory />
      {children}
    </>
  );
}
