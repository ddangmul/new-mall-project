"use client";

import PaymentResult from "@/components/payment/payment-result";

const PaymentFailPage = () => {
  return (
    <PaymentResult
      title="결제에 실패했습니다."
      description="다시 시도해주세요."
      isSuccess={false}
    />
  );
};

export default PaymentFailPage;
