"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const MyshopContentsNavBar: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const mode = searchParams.get("mode") || "order";

  const changeMode = (mode: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("mode", mode);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-10">
      <Link href="/myshop" className="text-3xl font-serif">
        MyPage
      </Link>
      <nav className="w-50 flex flex-col items-start gap-8 mt-12 text-xl">
        <button
          onClick={() => changeMode("order")}
          className={
            mode === "order"
              ? "text-[#686360] underline underline-offset-7 decoration-[#cec7c4]"
              : ""
          }
        >
          주문내역
        </button>
        <button
          onClick={() => changeMode("returns")}
          className={
            mode === "returns"
              ? "text-[#686360] underline underline-offset-7 decoration-[#cec7c4]"
              : ""
          }
        >
          취소/교환/반품
        </button>
        <button
          onClick={() => changeMode("point")}
          className={
            mode === "point"
              ? "text-[#686360] underline underline-offset-7 decoration-[#cec7c4]"
              : ""
          }
        >
          포인트
        </button>
        <button
          onClick={() => changeMode("oneqna")}
          className={
            pathname === "oneqna"
              ? "text-[#686360] underline underline-offset-7 decoration-[#cec7c4]"
              : ""
          }
        >
          1:1 문의
        </button>
        <button
          onClick={() => changeMode("member")}
          className={
            mode === "member"
              ? "text-[#686360] underline underline-offset-7 decoration-[#cec7c4]"
              : ""
          }
        >
          회원정보 수정
        </button>
      </nav>
    </div>
  );
};

export default MyshopContentsNavBar;
