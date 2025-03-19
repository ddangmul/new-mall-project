"use client";

import Link from "next/link";
import { useAuth } from "@/store/Auth-content";
import MyshopContentsNavBar from "@/components/nav-bar/myshop-contents-nav";
import Order from "@/components/myshop/order";
import Returns from "@/components/detail-item-content/returns";
import RetuensOrder from "@/components/myshop/returns";
import Point from "@/components/myshop/point";
import QnA from "@/components/detail-item-content/qna";
import OneQnA from "@/components/myshop/one-qna";

export default function myshop() {
  // const { user, logout } = useAuth();

  // if (!user) {
  //   return <p>로그인이 필요합니다.</p>;
  // }

  return (
    <section>
      <div className="flex gap-2 px-16 mt-50">
        <div className="myshop-conetents-nav basis-1/5">
          <MyshopContentsNavBar />
        </div>
        <div className="myshop_content basis-4/5">
          <div className="myshop-top-area flex gap-4 relative h-70">
            <div className="basis-3/5 h-100% p-6 bg-[#2d2c2a] text-[#d6d2c8] rounded-[6px]">
              <p className="text-2xl font-serif">Welcome</p>
              <p className="text-3xl">
                {/* <span>{user.username}</span>  */}
                님, 환영합니다.
              </p>
              <ul className="flex gap-5 text-lg absolute bottom-6 ">
                <li className="bg-[#615e58] text-[#d6d2c8] px-4 py-1 text-center rounded-[5px]">
                  <Link href="/">회원정보 수정</Link>
                </li>
                <li className="bg-[#615e58] text-[#d6d2c8] px-4 py-1 text-center rounded-[5px]">
                  <Link href="/">로그아웃</Link>
                </li>
              </ul>
            </div>
            <div className="basis-2/5 space-y-4">
              <div className="bg-[#d8d4cc] h-33 rounded-[6px] p-3 relative">
                <p className="text-sm ">
                  <Link href="/">쿠폰</Link>
                </p>
                <p className="count_number absolute bottom-5 text-2xl ">
                  {/* {쿠폰 수} */}
                  <span>장</span>
                </p>
              </div>
              <div className="bg-[#d8d4cc] h-33 rounded-[6px] p-3 relative">
                <p className="text-sm ">
                  <Link href="/">마일리지</Link>
                </p>
                <p className="count_number absolute bottom-5 text-2xl">
                  {/* 마일리지 점수 */}
                  <span>원</span>
                </p>
              </div>
            </div>
          </div>
          <div className="myshop-content-area mt-14">
            {/* <Order /> */}
            {/* <RetuensOrder /> */}
            {/* <Point /> */}
            <OneQnA />
          </div>
        </div>
      </div>
    </section>
  );
}
