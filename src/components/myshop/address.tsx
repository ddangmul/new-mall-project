"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import RegisterAddress from "./register-address";
import AddressItem from "./addressItem";
import { useAddress } from "@/store/address-context";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

export default function Address() {
  const { fetchAddresses, addresses, deleteAddress } = useAddress();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const editMode = searchParams.get("mode2");

  // 체크 상태 관리
  const [checkedMap, setCheckedMap] = useState<{ [id: number]: boolean }>({});

  useEffect(() => {
    if (session?.user && status === "authenticated") {
      console.log("로그인된 사용자:", session.user);
      fetchAddresses();
    }

    if (addresses.length === 0) {
      setCheckedMap({});
      return;
    }

    // 주소 목록이 변경될 때마다 체크 상태 초기화
    const initialCheckedMap = addresses.reduce((acc, address) => {
      acc[address.id] = false; // 기본값으로 false 설정
      return acc;
    }, {} as { [id: number]: boolean });

    setCheckedMap(initialCheckedMap);
  }, [session, status]);

  const toggleCheck = (id: number) => {
    // console.log("Toggling check for id:", id, "Previous state:", checkedMap);
    setCheckedMap((prev) => ({
      ...prev,
      [id]: !prev[id], // 체크 상태를 반전시킴
    }));
  };

  const handleDelete = async () => {
    const checkedIds = Object.entries(checkedMap)
      .filter(([_, checked]) => checked)
      .map(([id]) => parseInt(id));
    console.log("삭제할 ID들:", checkedIds);

    if (checkedIds.length === 0) {
      toast.error("삭제할 주소를 선택해주세요.");
      return;
    }

    await deleteAddress(checkedIds); // 삭제 처리 후 다시 주소 목록을 갱신
    await fetchAddresses(); // 최신 주소 목록을 다시 가져옴
  };

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
          <div className="address_list my-5 rounded-xl bg-[#f8f7f7] min-h-50">
            <ul className="px-2">
              {addresses.map((address) => (
                <AddressItem
                  key={address.id}
                  address={address}
                  checked={!!checkedMap[address.id]}
                  onToggle={() => toggleCheck(Number(address.id))}
                ></AddressItem>
              ))}
            </ul>
          </div>
          <div className="adress_action_btn w-full flex justify-between mt-6">
            <button
              onClick={handleDelete}
              className="px-8 py-2 rounded-sm bg-[#e6e2de] text-[#2d2c2a]"
            >
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
