"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const ItemsCategory: React.FC = () => {
  const pathname = usePathname(); // Next.js 13부터 userouter가 아닌 usePathname 사용
  const [activeLink, setActiveLink] = useState<string>("");

  useEffect(() => {
    const currentPath = pathname.split("/")[1]; // '/'를 기준으로 경로를 추출
    setActiveLink(currentPath || ""); // 경로가 없으면 기본값은 빈 문자열
  }, [pathname]);

  return (
    <section className="items_category">
      <nav className="items_category_inner py-12">
        <ul className="flex justify-center gap-4 md:gap-14 md:text-xl font-serif">
          {["All", "Best", "New", "HomeCare", "FabricCare", "HandBody"].map(
            (category) => (
              <li key={category}>
                <Link
                  href={`/${category}`}
                  className={activeLink === category ? "text-[#7c5e5e]" : ""}
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
