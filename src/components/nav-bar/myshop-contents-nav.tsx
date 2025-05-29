"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import PageTitle from "../page-title";

const MyshopContentsNavBar: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const mode = searchParams.get("mode") || "order";

  const changeMode = (mode: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("mode", mode);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const modes = [
    { key: "order", label: "주문내역" },
    { key: "returns", label: "취소/교환/반품" },
    { key: "point", label: "포인트" },
    { key: "oneqna", label: "1:1 문의" },
    { key: "member", label: "회원정보 수정" },
  ];

  return (
    <div className="pt-12 md:pt-12 lg:pt-14">
      <PageTitle children="MyPage" />
      <nav className="flex flex-row justify-between px-2 w-full md:w-20% md:flex-col md:items-start gap-2 md:gap-4 lg:gap-8 mt-4 md:mt-0 text-xs md:text-lg lg:text-xl">
        {modes.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => changeMode(key)}
            className={
              mode === key
                ? "text-graytext underline underline-offset-4 decoration-[#cec7c4] cursor-pointer"
                : "cursor-pointer"
            }
          >
            {label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default MyshopContentsNavBar;
