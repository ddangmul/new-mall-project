import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/components/header/main-header";
import Footer from "@/components/footer/footer";

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
        <div id="wrap" className="min-h-screen">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
