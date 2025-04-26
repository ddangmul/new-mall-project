"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const PaymentFail = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage("결제에 실패했습니다. 다시 시도해 주세요.");
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="bg-white rounded-lg shadow-xl p-10 max-w-md w-full">
        {!message ? (
          <p className="text-lg">결제 결과 확인 중...</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4 text-red-500">{message}</h1>
            <p className="mb-8">문제가 지속되면 고객센터로 문의해 주세요.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/myshop?mode=order"
                className="bg-[#313030] text-[#f2f0eb] px-6 py-2 rounded-lg hover:bg-[#363532] transition"
              >
                주문내역 확인
              </Link>
              <button
                onClick={() => router.push("/")}
                className="bg-[#d6d2c8] px-6 py-2 rounded-lg hover:bg-[#c4c0b6]"
              >
                쇼핑 계속하기
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default PaymentFail;
