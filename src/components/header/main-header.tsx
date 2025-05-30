"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import logo_light from "@/assets/logo/HyangNang-Logo-White.png";
import logo_dark from "@/assets/logo/HyangNang-Logo-Dark.png";
import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import SearchArea from "./search-area";

const MainHeader: React.FC = () => {
  const [scrollRatio, setScrollRatio] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = Math.min((scrollTop / maxScroll) * 2, 1);
      setScrollRatio(ratio);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const backgroundColor = useMemo(() => {
    const r = 18 + (242 - 18) * scrollRatio;
    const g = 17 + (240 - 17) * scrollRatio;
    const b = 17 + (235 - 17) * scrollRatio;
    return `rgb(${r}, ${g}, ${b})`;
  }, [scrollRatio]);

  const textColor = useMemo(() => {
    const val = 208 + (18 - 208) * scrollRatio;
    return `rgb(${val}, ${val}, ${val})`;
  }, [scrollRatio]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header id="mainHeader" className="fixed top-0 left-0 w-full z-50">
      <motion.div
        className="header-inner px-4 py-5"
        animate={{ backgroundColor, color: textColor }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center font-serif">
          <div className="hidden md:flex basis-1/3 gap-4 text-md md:text-lg lg:gap-6">
            <Link href="/" className="flex justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={scrollRatio > 0.5 ? "light" : "dark"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-24 h-6"
                >
                  <Image
                    src={scrollRatio > 0.5 ? logo_dark : logo_light}
                    alt="hyangnang-logo"
                    fill
                    sizes="200px"
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </Link>
            <Link href="/archive">Archive</Link>
          </div>

          <div className="hidden md:flex basis-1/3 justify-end text-sm md:text-lg gap-4 xl:gap-8">
            <Link href={user ? "/myshop" : "/login"} className="font-serif">
              {user ? "MyPage" : "Login"}
            </Link>
            <Link href="/cart" className="font-serif">
              Cart
            </Link>
            <SearchArea id="md_search" />
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="cursor-pointer"
            >
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-current"></div>
                <div className="w-6 h-0.5 bg-current"></div>
                <div className="w-6 h-0.5 bg-current"></div>
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 w-full bg-[#f2f0eb] text-foreground shadow-md z-50"
            >
              <ul className="flex flex-col items-center gap-2 py-4 px-30 font-serif text-sm">
                <li>
                  <Link href="/" onClick={() => setMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/archive" onClick={() => setMenuOpen(false)}>
                    Archive
                  </Link>
                </li>
                <li>
                  <Link href="/cart" onClick={() => setMenuOpen(false)}>
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    href={user ? "/myshop" : "/login"}
                    onClick={() => setMenuOpen(false)}
                  >
                    {user ? "MyPage" : "Login"}
                  </Link>
                </li>
                <li className="text-center mt-2 pt-2 border-t border-[#ceccc8] w-full">
                  <ul className="space-y-2">
                    {[
                      "All",
                      "Best",
                      "New",
                      "HomeCare",
                      "FabricCare",
                      "HandBody",
                    ].map((category) => (
                      <li key={category}>
                        <Link
                          href={`/${category}`}
                          onClick={() => setMenuOpen(false)}
                        >
                          {category.replace(/([A-Z])/g, " $1")}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default MainHeader;
