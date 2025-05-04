"use client";

import "../globals.css";
import MainImage from "@/components/main-img/main-image";
import ItemsCategory from "@/components/nav-bar/items_category_nav";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const filterPathnames = ["l/", "t/", "w/", "e/", "d/"];

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // filterPathnames 배열 중 하나라도 pathname에 포함되면, ShopLayout을 사용하지 않음
  const shouldSkipLayout = filterPathnames.some((name) =>
    pathname.includes(name)
  );

  if (shouldSkipLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <MainImage />
      <ItemsCategory />
      {children}
    </>
  );
}
