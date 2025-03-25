"use client";

import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/components/header/main-header";
import Footer from "@/components/footer/footer";
import { CartProvider } from "@/store/cart-context";
import { SessionProvider } from "next-auth/react";

const metadata: Metadata = {
  title: "Online Mall App",
  description: "online shop homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
          <SessionProvider>
            <MainHeader />
            <CartProvider>
              <div id="wrap" className="min-h-screen pt-22">
                {children}
              </div>
            </CartProvider>
            <Footer />
          </SessionProvider>
      </body>
    </html>
  );
}
