"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import PaymentResult from "@/components/payment/payment-result";

const PaymentSuccess = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "fail">(
    "loading"
  );

  const paymentKey = useMemo(
    () => searchParams.get("paymentKey"),
    [searchParams]
  );
  const orderId = useMemo(() => searchParams.get("orderId"), [searchParams]);
  const amount = useMemo(() => searchParams.get("amount"), [searchParams]);

  useEffect(() => {
    if (!paymentKey || !orderId || !amount) {
      setStatus("fail");
    } else {
      setStatus("success");
    }
  }, [paymentKey, orderId, amount]);

  if (status === "loading") {
    return <p className="text-center mt-10">결제 확인 중...</p>;
  }

  return (
    <PaymentResult
      title={status === "success" ? "결제가 완료되었습니다." : "결제 승인 실패"}
      description={
        status === "success"
          ? "구매해 주셔서 감사합니다."
          : "문제가 발생했습니다. 다시 시도해 주세요."
      }
      isSuccess={status === "success"}
    />
  );
};

export default PaymentSuccess;
