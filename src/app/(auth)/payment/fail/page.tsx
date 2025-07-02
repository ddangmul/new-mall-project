"use client";

import { useSearchParams } from "next/navigation";
import PaymentResult from "@/components/payment/payment-result";

const PaymentFailPage = () => {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("errorCode");
  const errorMessage = searchParams.get("errorMessage");

  return (
    <>
      <PaymentResult
        title="결제에 실패했습니다."
        description="
        포트폴리오용 데모 환경에서는 실제 결제가 불가능합니다. 테스트용 결제
        키임을 참고 부탁드립니다."
        isSuccess={false}
      />
    </>
  );
};

export default PaymentFailPage;
