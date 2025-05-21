"use client";

import { useEffect } from "react";

export default function SuccessModal({ onConfirm }: { onConfirm: () => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onConfirm();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onConfirm]);

  return (
    <div className="fixed inset-0 bg-foreground z-50 flex justify-center items-center">
      <div className="bg-[#ffffff] p-6 rounded-md text-center max-w-sm w-[90%] shadow-lg">
        <h2 className="text-md md:text-lg font-bold mb-4">
          회원정보가 수정되었습니다.
        </h2>
        <p className="text-xs md:text-md mb-6 text-gray-600">
          보안을 위해 다시 로그인 해주세요.
        </p>
        <button
          onClick={onConfirm}
          className="bg-foreground text-[#ffffff] px-4 py-2 rounded hover:bg-gray-800 transition text-xs md:text-md"
        >
          다시 로그인하기
        </button>
      </div>
    </div>
  );
}
