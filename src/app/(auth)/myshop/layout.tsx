"use client";
import MyshopContentsNavBar from "@/components/nav-bar/myshop-contents-nav";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function MyshopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const mode = searchParams.get("mode") || "order";

  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row gap-2 px-4 md:px-6 xl:px-16">
        <div className="myshop-conetents-nav md:basis-1/5">
          {pathname === "/myshop" && (
            <aside
              ref={navRef}
              className="md:block sticky top-20 h-fit md:w-60"
            >
              <MyshopContentsNavBar />
            </aside>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
