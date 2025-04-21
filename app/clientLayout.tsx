"use client";

import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import SessionHandler from "@/components/session-handler";
import { AddressProvider } from "@/store/address-context";
import { CartProvider } from "@/store/cart-context";
import { ToastContainer } from "react-toastify";
import MainHeader from "@/components/header/main-header";
import ScrollButtons from "@/components/scroll-btn";
import Footer from "@/components/footer/footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    console.log("클라이언트에서 실행됨!");
  }, []);

  return (
    <>
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
    </>
  );
}
