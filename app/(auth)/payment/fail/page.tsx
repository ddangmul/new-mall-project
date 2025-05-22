"use client";

import { useSearchParams } from "next/navigation";
import PaymentResult from "@/components/payment/payment-result";

const PaymentFailPage = () => {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("errorCode");
  const errorMessage = searchParams.get("errorMessage");

  return (
    <PaymentResult
      title="결제에 실패했습니다."
      description={
        errorMessage
          ? `오류 코드: ${errorCode ?? "알 수 없음"}, 내용: ${errorMessage}`
          : "다시 시도해주세요."
      }
      isSuccess={false}
    />
  );
};

export default PaymentFailPage;
