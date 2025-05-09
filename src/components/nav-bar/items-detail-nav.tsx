"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const DetailContentsNavBar: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const mode = searchParams.get("mode") || "Explanation";

  const changeMode = (mode: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("mode", mode);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const buttons = [
    { label: "상세정보", mode: "Explanation" },
    { label: "Q&A", mode: "QnA" },
    { label: "Review", mode: "Review" },
    { label: "반품&교환", mode: "Returns" },
  ];

  return (
    <nav className="text-center flex justify-center text-md gap-6 xl:gap-10 xl:text-xl">
      {buttons.map(({ label, mode: buttonMode }) => (
        <button
          key={buttonMode}
          onClick={() => changeMode(buttonMode)}
          className={mode === buttonMode ? "text-[#8e8a88]" : ""}
        >
          {label}
        </button>
      ))}
    </nav>
  );
};

export default DetailContentsNavBar;
