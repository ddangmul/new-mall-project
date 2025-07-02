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
        description={
          errorMessage
            ? `오류 코드: ${errorCode ?? "알 수 없음"}, 내용: ${errorMessage}`
            : "다시 시도해주세요."
        }
        isSuccess={false}
      />
      <div style={{ marginTop: 16, color: "#666", fontSize: 14 }}>
        {/* 테스트용 결제 키 사용 안내 */}
        포트폴리오용 데모 환경에서는 실제 결제가 불가능합니다. 테스트용 결제
        키임을 참고 부탁드립니다.
      </div>
    </>
  );
};

export default PaymentFailPage;
