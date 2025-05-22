
import Script from "next/script";
import "./globals.css";
import ClientLayout from "./clientLayout";

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
