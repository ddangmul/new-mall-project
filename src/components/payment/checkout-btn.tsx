"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function CheckoutButton() {
  const router = useRouter();
  const { data: session } = useSession();

  // useEffect(() => {
  //   // 확인용 로그
  //   console.log("TossPayments?", (window as any).TossPayments);
  // }, []);

  const handlePayment = async () => {
    if (!session) {
      alert("회원가입이 필요합니다.");
      router.push("/login");
      return;
    }

    const orderId = `order-${Date.now()}`;
    const amount = 10000;

    const orderData = {
      orderId,
      amount,
      productName: "샘플",
      customerName: "길동",
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payment/confirm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );
    if (!response.ok) {
      alert("주문 생성에 실패했습니다.");
      return;
    }

    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;
    const tossPayments = (window as any).TossPayments?.(clientKey);

    if (!tossPayments) {
      alert("TossPayments SDK가 아직 로드되지 않았습니다.");
      return;
    }

    try {
      await tossPayments.requestPayment("카드", {
        amount,
        orderId,
        orderName: "샘플",
        customerName: "길동",
        successUrl: `${window.location.origin}/api/payment/success`,
        failUrl: `${window.location.origin}/api/payment/fail`,
      });
    } catch (error) {
      alert("결제창 에러: " + error);
    }
  };
  return (
    <button
      onClick={handlePayment}
      className="bg-[#524f4c] shadow-lg text-[#f8f7f5] basis-1/2 py-2 rounded-xs"
    >
      Buy
    </button>
  );
}
