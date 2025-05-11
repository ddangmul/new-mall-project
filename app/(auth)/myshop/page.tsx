"use client";

import Link from "next/link";
import MyshopContentsNavBar from "@/components/nav-bar/myshop-contents-nav";
import Order from "@/components/myshop/order";
import Returns from "@/components/detail-item-content/returns";
import ReturnsOrder from "@/components/myshop/returns";
import Point from "@/components/myshop/point";
import QnA from "@/components/detail-item-content/qna";
import OneQnA from "@/components/myshop/one-qna";
import Member from "@/components/myshop/member/member";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { signOut } from "next-auth/react";
import LoadingIndicator from "@/components/loading-indicator";

export default function Myshop() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") || "order";
  const pathname = usePathname();

  const user = session?.user;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const isFirstVisitWithoutMode =
      pathname === "/myshop" && !searchParams.get("mode");

    const active = window.innerWidth < 1280;

    window.scrollTo({
      top: isFirstVisitWithoutMode ? 0 : active ? 550 : 0,
      behavior: "smooth",
    });
  }, [pathname, searchParams]);
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
    <div className="myshop_content xl:basis-4/5 mt-10">
      <div className="myshop-top-area flex gap-4 relative h-70">
        <div className="basis-3/5 h-100% p-6 bg-[#2d2c2a] text-[#d6d2c8] rounded-[6px]">
          <p className="text-lg xl:text-xl font-serif mb-2">Welcome</p>
          <p className="text-xl xl:text-2xl">
            <span>{user.name || user.username}</span>
            님, 환영합니다.
          </p>
          <ul className="flex gap-2 xl:gap-4 text-sm xl:text-lg absolute bottom-5">
            <li className="bg-[#615e58] text-[#d6d2c8] px-4 py-1 text-center rounded-[5px]">
              <Link href="/myshop?mode=member">회원정보 수정</Link>
            </li>
            <button
              onClick={handleLogout}
              className="bg-[#615e58] text-[#d6d2c8] px-4 py-1 text-center rounded-[5px]"
            >
              로그아웃
            </button>
          </ul>
        </div>
        <div className="basis-2/5 space-y-4">
          <div className="bg-[#d8d4cc] h-33 rounded-[6px] p-3 relative">
            <p className="text-sm">
              <Link href="/">쿠폰</Link>
            </p>
            <p className="count_number absolute bottom-5 text-xl ">
              {/* {쿠폰 수} */}
              <span>1장</span>
            </p>
          </div>
          <div className="bg-[#d8d4cc] h-33 rounded-[6px] p-3 relative">
            <p className="text-sm">
              <Link href="/">포인트</Link>
            </p>
            <p className="count_number absolute bottom-5 text-xl">
              {/* 마일리지 점수 */}
              <span>3,000원</span>
            </p>
          </div>
        </div>
      </div>
      <div className="myshop-content-area mt-14 min-h-100">{myshopContent}</div>
    </div>
  );
}
