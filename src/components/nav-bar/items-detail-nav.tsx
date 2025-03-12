"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const DetailContentsNavBar: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const mode = searchParams.get("mode") || "상세정보";

  const changeMode = (mode: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("mode", mode);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <nav className="text-center flex justify-center gap-10 text-xl">
      <button
        onClick={() => changeMode("Explanation")}
        className={mode === "Explanation" ? "text-[#8e8a88]" : ""}
      >
        상세정보
      </button>
      /
      <button
        onClick={() => changeMode("QnA")}
        className={mode === "QnA" ? "text-[#8e8a88]" : ""}
      >
        Q&A
      </button>
      /
      <button
        onClick={() => changeMode("Review")}
        className={mode === "Review" ? "text-[#8e8a88]" : ""}
      >
        Review
      </button>
      /
      <button
        onClick={() => changeMode("Returns")}
        className={mode === "Returns" ? "text-[#8e8a88]" : ""}
      >
        반품&교환
      </button>
    </nav>
  );
};

export default DetailContentsNavBar;
