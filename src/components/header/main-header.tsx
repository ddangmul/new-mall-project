"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import hyangnangLogo from "@/assets/logo/HyangNang-Logo-White.png";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import SearchArea from "./search-area";

const MainHeader: React.FC = () => {
  // const [opacityHeaderBg, setOpacityHeaderBg] = useState(0); // 배경 불투명도 상태
  // const [isClient, setIsClient] = useState(false);

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
      <div
        className="header-inner bg-[#121111] py-6 px-6"
        // style={{
        //   backgroundColor: isClient
        //     ? `rgba(18, 17, 17, ${opacityHeaderBg})`
        //     : `rgb(255, 255, 255)`,
        // }}
      >
        <div className="flex justify-between items-center text-[#d0d0d0] font-serif">
          <div className="basis-1/3 flex gap-4 xl:text-lg xl:gap-8">
            <span>
              <Link href="/">Home</Link>
            </span>
            <span>
              <Link href="/about">About</Link>
            </span>
            <span>
              <Link href="/archive">Archive</Link>
            </span>
          </div>
          <Link href="/">
            <Image
              src={hyangnangLogo}
              alt="hyangnang-logo"
              style={{ width: "100%", height: "auto" }}
              priority
              className="min-w-20"
            ></Image>
          </Link>
          <div className="basis-1/3 flex justify-end xl:text-lg gap-4 xl:gap-8">
            {content}
            <span>
              <Link href="/cart">Cart</Link>
            </span>
            <SearchArea />
          </div>
        </div>
      </div>
    </header>
  );
};
export default MainHeader;
