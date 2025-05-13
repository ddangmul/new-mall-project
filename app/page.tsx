import ItemsGrid from "@/components/items/items-grid";
import MainImage from "@/components/main-img/main-image";
import ItemsCategory from "@/components/nav-bar/items_category_nav";
import "react-toastify/dist/ReactToastify.css";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import SearchArea from "@/components/header/search-area";

export const metadata: Metadata = {
  title: {
    default: "HyangNang",
    template: "%s | HyangNang",
  },
  description: "온라인 쇼핑몰",
  keywords: [
    "쇼핑몰",
    "Next.js",
    "타입스크립트",
    "React",
    "인센스",
    "향수",
    "향낭",
  ],
  authors: [{ name: "물땅", url: "/" }],
  openGraph: {
    title: "hyangnang | online mall",
    description: "온라인 쇼핑몰",
    url: "https://localhost:3000/hyangnang",
    siteName: "hyangnang",
    images: [
      {
        url: "https://localhost:3000/og-image.png",
        width: 1200,
        height: 630,
        alt: "MyShop 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "hyangnang | online mall",
    description: "온라인 쇼핑몰",
    images: ["https://localhost:3000/hyangnang/twitter-image.png"],
    creator: "@myshop",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  category: "shopping",
};

export default async function Home() {
  const items = await prisma.item.findMany();

  return (
    <>
      <MainImage />
      <ItemsCategory />
      <section className="home-container px-4 py-5">
        <ItemsGrid items={items} />
      </section>
    </>
  );
}
