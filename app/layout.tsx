"use client";

import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/components/header/main-header";
import Footer from "@/components/footer/footer";
import { CartProvider } from "@/store/cart-context";
import { SessionProvider } from "next-auth/react";
import { authOptions } from "@/lib/authOptions";
import { ToastContainer } from "react-toastify";
import { AddressProvider } from "@/store/address-context";
import { useEffect } from "react";
import { signOut } from "next-auth/react";

const metadata: Metadata = {
  title: "Online Mall App",
  description: "online shop homepage",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      // 브라우저 새로 켰거나, 세션 초기화 상태라면
      signOut({ redirect: false });
    }
  }, []);
  return (
    <html lang="ko">
      <body>
        <SessionProvider>
          <AddressProvider>
            <MainHeader />
            <CartProvider>
              <div id="modal"></div>
              <div id="wrap" className="min-h-screen pt-22">
                {children}
                <ToastContainer
                  position="bottom-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  closeOnClick
                  theme="dark"
                />
              </div>
            </CartProvider>
          </AddressProvider>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
