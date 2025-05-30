"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SearchArea from "@/components/header/search-area";

const ItemsCategory: React.FC = () => {
  const pathname = usePathname(); // Next.js 13부터 userouter가 아닌 usePathname 사용
  const [activeLink, setActiveLink] = useState<string>("");

  useEffect(() => {
    const currentPath = pathname.split("/")[1]; // '/'를 기준으로 경로를 추출
    setActiveLink(currentPath || ""); // 경로가 없으면 기본값은 빈 문자열
  }, [pathname]);

  return (
    <section className="items_category flex flex-col gap-4 mb-2">
      <div className="pt-10 flex justify-end px-9 items-center md:hidden">
        <SearchArea id="sm_search" />
      </div>
      <nav className="items_category_inner py-2 mb-4 md:py-12 md:my-2">
        <ul className="flex justify-center text-xs gap-3 md:gap-14 md:text-lg lg:text-xl font-serif">
          {["All", "Best", "New", "HomeCare", "FabricCare", "HandBody"].map(
            (category) => (
              <li key={category}>
                <Link
                  href={`/${category}`}
                  className={activeLink === category ? "text-graytext" : ""}
                >
                  {category.replace(/([A-Z])/g, " $1")}{" "}
                  {/* camelCase를 space로 변환 */}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </section>
  );
};
export default ItemsCategory;
