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
