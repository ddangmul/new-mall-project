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
    <div className="mt-4">
      <Link href="/myshop" className="text-3xl font-serif">
        MyPage
      </Link>
      <nav className="flex flex-row w-full xl:w-50 xl:flex-col justify-arounded items-start gap-4 xl:gap-8 mt-12 text-md xl:text-xl">
        {modes.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => changeMode(key)}
            className={
              mode === key
                ? "text-[#686360] underline underline-offset-7 decoration-[#cec7c4]"
                : ""
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
