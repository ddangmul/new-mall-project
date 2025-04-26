"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");
  const router = useRouter();
  useEffect(() => {
    const paymentKey = searchParams.get("paymentKey");
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");

    if (!paymentKey || !orderId || !amount) {
      setMessage("필수 결제 정보가 없습니다.");
      return;
    }

    const confirmPayment = async () => {
      const res = await fetch(
        `/api/payment/success?paymentKey=${paymentKey}&orderId=${orderId}&amount=${amount}`
      );

      if (res.ok) {
        setMessage("결제가 정상적으로 완료되었습니다.");
      } else {
        setMessage("결제 승인에 실패했습니다.");
      }
    };

    confirmPayment();
  }, [searchParams]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="bg-white rounded-lg shadow-xl p-10 max-w-md w-full">
        {!message ? (
          <p className="text-lg">결제 확인 중...</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">{message}</h1>
            <p className="mb-8">구매해 주셔서 감사합니다.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="http://localhost:3000/myshop?mode=order"
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

export default PaymentSuccess;
