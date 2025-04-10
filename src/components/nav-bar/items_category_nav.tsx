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
        <ul className="flex justify-center gap-14 text-xl font-serif">
          <li>
            <Link
              href="/All"
              className={activeLink === "All" ? "text-[#7c5e5e]" : ""}
            >
              All
            </Link>
          </li>
          <li>
            <Link
              href="/Best"
              className={activeLink === "Best" ? "text-[#7c5e5e]" : ""}
            >
              Best
            </Link>
          </li>
          <li>
            <Link
              href="/New"
              className={activeLink === "New" ? "text-[#7c5e5e]" : ""}
            >
              New
            </Link>
          </li>
          <li>
            <Link
              href="/HomeCare"
              className={activeLink === "HomeCare" ? "text-[#7c5e5e]" : ""}
            >
              Home Care
            </Link>
          </li>
          <li>
            <Link
              href="/FabricCare"
              className={activeLink === "FabricCare" ? "text-[#7c5e5e]" : ""}
            >
              Fabric Care
            </Link>
          </li>
          <li>
            <Link
              href="/HandBody"
              className={activeLink === "HandBody" ? "text-[#7c5e5e]" : ""}
            >
              Hand & Body
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};
export default ItemsCategory;
