"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import hyangnangLogo from "@/assets/logo/HyangNang-Logo-White.png";

import { useEffect, useState } from "react";

const MainHeader: React.FC = () => {
  const [opacityHeaderBg, setOpacityHeaderBg] = useState(0); // 배경 불투명도 상태
  const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   setIsClient(true); // 클라이언트에서만 실행되도록 설정
  // }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);

  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     const maxScroll =
  //       document.documentElement.scrollHeight - window.innerHeight;

  //     const newOpacity = (scrollPosition / maxScroll) * 2;

  //     const clampedOpacity = Math.min(Math.max(newOpacity, 0), 1);

  //     setOpacityHeaderBg(clampedOpacity);
  //   };

  //   // 스크롤 이벤트 리스너 추가
  //   window.addEventListener("scroll", handleScroll);

  //   // 컴포넌트 언마운트 시 이벤트 리스너 제거
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <header id="mainHeader" className="fixed top-0 left-0 w-full z-50">
      <motion.div
        className="header-inner bg-[#121111] p-10 "
        // style={{
        //   backgroundColor: isClient
        //     ? `rgba(18, 17, 17, ${opacityHeaderBg})`
        //     : `rgb(255, 255, 255)`,
        // }}
      >
        <div className="flex justify-between items-center text-[#d0d0d0] text-lg font-serif">
          <div className="basis-1/3 flex gap-8">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>
              <Link href="/">Shop</Link>
            </span>
            <span>
              <Link href="/about">About</Link>
            </span>
            <span>
              <Link href="/archive">Archive</Link>
            </span>
          </div>
          <div className="">
            <Link href="/">
              <Image
                src={hyangnangLogo}
                alt="hyangnang-logo"
                style={{ width: "70%", height: "auto" }}
                priority
              ></Image>
            </Link>
          </div>
          <div className="basis-1/3 flex justify-end gap-8">
            <span>
              <Link href="/login">Login</Link>
            </span>
            <span>
              <Link href="/cart">Cart</Link>
            </span>
            <span className="flex items-center ml-10">
              <p>Search</p>
              <input
                name="searchItem"
                type="text"
                className="border-b-1 border-b-amber-50 max-w-30"
              ></input>
            </span>
          </div>
        </div>
      </motion.div>
    </header>
  );
};
export default MainHeader;
