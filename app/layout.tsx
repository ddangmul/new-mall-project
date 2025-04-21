import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./clientLayout";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="https://js.tosspayments.com/v1/payment"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
