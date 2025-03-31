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
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { signOut } from "next-auth/react";

export default function myshop() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const mode = searchParams.get("mode") || "order";

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // 로그아웃 후 홈으로 이동
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]); // 상태가 바뀔 때만 실행되도록 설정

  if (status === "loading" || status === "unauthenticated") {
    return <p>Loading...</p>; // 로그인 안 된 경우 아무것도 렌더링하지 않음
  }

  const user = session?.user;

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
    <div className="myshop_content basis-4/5 mt-16">
      <div className="myshop-top-area flex gap-4 relative h-70">
        <div className="basis-3/5 h-100% p-6 bg-[#2d2c2a] text-[#d6d2c8] rounded-[6px]">
          <p className="text-2xl font-serif">Welcome</p>
          <p className="text-3xl">
            <span>{user.username}</span>
            님, 환영합니다.
          </p>
          <ul className="flex gap-5 text-lg absolute bottom-6 ">
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
            <p className="text-sm ">
              <Link href="/">쿠폰</Link>
            </p>
            <p className="count_number absolute bottom-5 text-2xl ">
              {/* {쿠폰 수} */}
              <span>1장</span>
            </p>
          </div>
          <div className="bg-[#d8d4cc] h-33 rounded-[6px] p-3 relative">
            <p className="text-sm ">
              <Link href="/">포인트</Link>
            </p>
            <p className="count_number absolute bottom-5 text-2xl">
              {/* 마일리지 점수 */}
              <span>3,000원</span>
            </p>
          </div>
        </div>
      </div>
      <div className="myshop-content-area mt-14">{myshopContent}</div>
    </div>
  );
}
