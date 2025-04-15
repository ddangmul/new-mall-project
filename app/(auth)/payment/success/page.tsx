"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const paymentKey = searchParams.get("paymentKey")!;
    const orderId = searchParams.get("orderId")!;
    const amount = searchParams.get("amount")!;

    // 결제 승인 API 호출 (백엔드로 요청)
    const confirmPayment = async () => {
      const res = await fetch(
        `/api/payment/success?paymentKey=${paymentKey}&orderId=${orderId}&amount=${amount}`
      );

      if (res.ok) {
        setMessage("결제 성공!");
      } else {
        setMessage("결제 승인 실패!");
      }
    };

    confirmPayment();
  }, [searchParams]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default PaymentSuccess;
