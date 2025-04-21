import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./clientLayout";

export const metadata: Metadata = {
  title: {
    default: "online shop",
    template: "%s | MyShop",
  },
  description: "online shop homepage",
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
