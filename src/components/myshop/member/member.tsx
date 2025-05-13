"use client";

import ModifyMember from "@/components/myshop/modify-member";
import Address from "../address";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import "./member.css";

export default function Member() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const mode = searchParams.get("mode2") || "member";

  const changeMode = (mode: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("mode2", mode);
    router.push(`${pathname}?${params.toString()}`);
  };

  const selectedCSS = "px-5 py-2 rounded-sm bg-[#2d2c2a] text-[#d6d2c8]";
  const unSelectedCss = "px-5 py-2 bg-[#e5e3e2] text-[#2d2c2a]";

  return (
    <>
      <div className="basis-2/3 my-6 md:mt-20">
        <div className="tap_btn flex justify-arounded gap-4 text-sm md:text-md lg:text-lg pb-5 border-b-1 border-b-[#a9a9a9]">
          <button
            onClick={() => changeMode("member")}
            className={mode === "member" ? selectedCSS : unSelectedCss}
          >
            회원정보 수정
          </button>
          <button
            onClick={() => changeMode("address")}
            className={
              mode === "address" || mode === "new" ? selectedCSS : unSelectedCss
            }
          >
            배송주소록 관리
          </button>
        </div>
      </div>
      {mode === "member" && <ModifyMember />}
      {(mode === "address" || mode === "new") && <Address />}
    </>
  );
}
