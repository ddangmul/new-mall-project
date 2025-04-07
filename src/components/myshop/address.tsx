"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import RegisterAddress from "./register-address";
import { useSession } from "next-auth/react";
import AddressItem from "./addressItem";

export default function Address() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const editMode = searchParams.get("mode2");

  const changeMode = (mode: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (mode) {
      params.set("mode2", mode);
    } else {
      params.delete("mode2"); // 모드 해제 시 URL에서 mode 제거
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {editMode === "address" && (
        <section className="address mt-10">
          <h1 className="text-xl">배송지 목록</h1>
          <div className="address_list my-5 rounded-xl bg-[#f8f7f7] h-50">
            <ul className="px-2">
              {session.user.addresses.map((address) => (
                <AddressItem key={address.id} address={address}></AddressItem>
              ))}
            </ul>
          </div>
          <div className="adress_action_btn w-full flex justify-between mt-6">
            <button className="px-8 py-2 rounded-sm bg-[#e6e2de] text-[#2d2c2a]">
              선택 배송지 삭제
            </button>
            <button
              className="px-8 py-2 rounded-sm bg-[#2d2c2a] text-[#d6d2c8]"
              onClick={() => {
                changeMode("new");
              }}
            >
              신규 배송지 등록
            </button>
          </div>
        </section>
      )}
      {editMode === "new" && <RegisterAddress />}
    </>
  );
}
