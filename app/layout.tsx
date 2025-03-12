import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/components/header/main-header";
import Footer from "@/components/footer/footer";
import { CartProvider } from "@/store/cart-context";

export const metadata: Metadata = {
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
        <MainHeader />
        <CartProvider>
          <div id="wrap" className="min-h-screen mt-26">
            {children}
          </div>
        </CartProvider>
        <Footer />
      </body>
    </html>
  );
}
