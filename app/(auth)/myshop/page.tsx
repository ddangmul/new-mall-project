"use client";

import Link from "next/link";
import Order from "@/components/myshop/order";
import ReturnsOrder from "@/components/myshop/returns";
import Point from "@/components/myshop/point";
import OneQnA from "@/components/myshop/one-qna";
import Member from "@/components/myshop/member/member";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { signOut } from "next-auth/react";
import LoadingIndicator from "@/components/loading-indicator";

export default function Myshop() {
  const TOP_BTN_CSS =
    "bg-[#615e58] text-[#d6d2c8] px-2 md:px-3 lg:px-4 py-1 text-center rounded-[5px] text-xs md:text-md lg:text-lg";
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") || "order";
  const pathname = usePathname();
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 640;
  const user = session?.user;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // useEffect(() => {
  //   if (isMobile) return;

  //   const isFirstVisitWithoutMode =
  //     pathname === "/myshop" && !searchParams.get("mode");

  //   let topPosition = 0;

  //   if (!isFirstVisitWithoutMode) {
  //     const width = window.innerWidth;
  //     if (width < 640) {
  //       // sm 이하
  //       topPosition = 300;
  //     } else if (width < 768) {
  //       // md 이하
  //       topPosition = 310;
  //     } else if (width < 1024) {
  //       // lg 이하
  //       topPosition = 350;
  //     } else {
  //       // xl 이상
  //       topPosition = 400;
  //     }
  //   }

  //   setTimeout(() => {
  //     window.scrollTo({
  //       top: topPosition,
  //       behavior: "smooth",
  //     });
  //   }, 1000); // 100ms 딜레이
  // }, [mode]);

  if (status === "loading" || status === "unauthenticated") {
    return <LoadingIndicator />;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // 로그아웃 후 홈으로 이동
  };

  let myshopContent;

  switch (mode) {
    case "order":
      myshopContent = <Order />;
      break;
    case "returns":
      myshopContent = <ReturnsOrder />;
      break;
    case "point":
      myshopContent = <Point />;
      break;
    case "oneqna":
      myshopContent = <OneQnA />;
      break;
    case "member":
      myshopContent = <Member />;
      break;
  }

  return (
    <div className="w-full myshop_content md:basis-4/5 mt-4 md:mt-30 lg:mt-34">
      <div className="myshop-top-area flex gap-2 md:gap-4 relative">
        <div className="basis-3/5 p-3 md:p-4 lg:p-6 bg-[#2d2c2a] text-[#d6d2c8] rounded-[6px]">
          <p className="text-xs md:text-md lg:text-lg font-serif mb-2">
            Welcome
          </p>
          <p className="text-sm md:text-lg lg:text-xl xl:text-xl">
            <span>{user.name || user.username}</span>
            님, 환영합니다.
          </p>
          <ul className="flex gap-1.5 md:gap-2 absolute bottom-2 md:bottom-4">
            <li className={TOP_BTN_CSS}>
              <Link href="/myshop?mode=member">회원정보 수정</Link>
            </li>
            <button onClick={handleLogout} className={TOP_BTN_CSS}>
              로그아웃
            </button>
          </ul>
        </div>
        <div className="basis-2/5 space-y-4 flex flex-col">
          <div className="bg-[#d8d4cc] rounded-[6px] p-2 md:p-3 relative">
            <p className="text-xs md:text-sm pb-4 md:pb-6 lg:pb-8">
              <Link href="/">쿠폰</Link>
            </p>
            <p className="count_number text-sm md:text-md lg:text-lg">
              {/* {쿠폰 수} */}
              <span>1장</span>
            </p>
          </div>
          <div className="bg-[#d8d4cc] rounded-[6px] p-2 md:p-3 relative">
            <p className="text-xs md:text-sm pb-4 md:pb-6 lg:pb-8">
              <Link href="/">포인트</Link>
            </p>
            <p className="count_number text-sm md:text-md lg:text-lg">
              {/* 마일리지 점수 */}
              <span>3,000원</span>
            </p>
          </div>
        </div>
      </div>
      <div className="myshop-content-area mt-4 md:mt-16 w-full min-h-screen">
        {myshopContent}
      </div>
    </div>
  );
}
