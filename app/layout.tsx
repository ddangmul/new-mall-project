"use client";

import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import MainHeader from "@/components/header/main-header";
import Footer from "@/components/footer/footer";
import { CartProvider } from "@/store/cart-context";
import { SessionProvider } from "next-auth/react";
import { authOptions } from "@/lib/authOptions";
import { ToastContainer } from "react-toastify";
import { AddressProvider } from "@/store/address-context";
import SessionHandler from "@/components/session-handler";
import ScrollButtons from "@/components/scroll-btn";

// const metadata: Metadata = {
//   title: "Online Mall App",
//   description: "online shop homepage",
// };

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
        <SessionProvider>
          <SessionHandler />
          <AddressProvider>
            <MainHeader />
            <CartProvider>
              <div id="modal"></div>
              <div id="wrap" className="min-h-screen pt-18">
                {children}
                <ToastContainer
                  position="bottom-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  closeOnClick
                  theme="dark"
                />
              </div>
              <ScrollButtons />
            </CartProvider>
          </AddressProvider>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
