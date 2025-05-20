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
  // const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;

  // useEffect(() => {
  //   if (isMobile) return;

  //   window.scrollTo({ top: 50, behavior: "auto" });

  //   // 항목 클릭 시 바로 내려가도록
  //   const immediateScroll = () => {
  //     if (navRef.current) {
  //       const navTop =
  //         navRef.current.getBoundingClientRect().top + window.scrollY;

  //       // 바로 해당 위치로 즉시 스크롤
  //       window.scrollTo({ top: navTop - 20, behavior: "auto" });
  //     }
  //   };

  //   immediateScroll();
  // }, [mode, isMobile]);

  return (
    <section className="w-full overflow-visibl">
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
