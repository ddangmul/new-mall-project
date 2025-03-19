import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/components/header/main-header";
import Footer from "@/components/footer/footer";
import { CartProvider } from "@/store/cart-context";
import { AuthProvider } from "@/store/Auth-content";

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
        <AuthProvider>
          <MainHeader />
          <CartProvider>
            <div id="wrap" className="min-h-screen pt-26">
              {children}
            </div>
          </CartProvider>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
