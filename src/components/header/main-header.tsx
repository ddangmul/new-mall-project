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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
    // #f2f0eb = rgb(242, 240, 235)
    const r = 18 + (242 - 18) * scrollRatio;
    const g = 17 + (240 - 17) * scrollRatio;
    const b = 17 + (235 - 17) * scrollRatio;
    return `rgb(${r}, ${g}, ${b})`;
  }, [scrollRatio]);

  const textColor = useMemo(() => {
    const val = 208 + (18 - 208) * scrollRatio;
    return `rgb(${val}, ${val}, ${val})`;
  }, [scrollRatio]);

  const { data: session, status } = useSession();
  const user = session?.user;

  let content;
  // session이 로딩 중일 때
  if (status === "loading") {
    content = (
      <span>
        <Link href="/login">Login</Link>
      </span>
    );
  } else if (!user) {
    content = (
      <span>
        <Link href="/login">Login</Link>
      </span>
    );
  } else {
    content = (
      <span>
        <Link href="/myshop">MyPage</Link>
      </span>
    );
  }

  return (
    <header id="mainHeader" className="fixed top-0 left-0 w-full z-50">
      <motion.div
        className="header-inner py-5 px-4"
        animate={{
          backgroundColor,
          color: textColor,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center font-serif">
          <div className="basis-1/3 flex gap-4 text-sm md:text-lg xl:text-lg xl:gap-8">
            <span className="hidden md:block">
              <Link href="/">Home</Link>
            </span>
            <span>
              <Link href="/about" className="md: block">
                About
              </Link>
            </span>
            <span className="hidden md:block">
              <Link href="/archive">Archive</Link>
            </span>
          </div>
          <Link href="/">
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
                  style={{ objectFit: "contain" }} // 이미지 비율 유지
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </Link>
          <div className="basis-1/3 flex justify-end text-sm md:text-lg gap-4 xl:gap-8">
            {content}
            <span>
              <Link href="/cart" className="hidden md:block">
                Cart
              </Link>
            </span>
            <span className="hidden md:block">
              <SearchArea />
            </span>
          </div>
        </div>
      </motion.div>
    </header>
  );
};
export default MainHeader;
