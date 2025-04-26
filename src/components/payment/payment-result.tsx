"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

type PaymentResultProps = {
  title: string;
  description: string;
  isSuccess: boolean;
};

const PaymentResult = ({
  title,
  description,
  isSuccess,
}: PaymentResultProps) => {
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="bg-white rounded-lg shadow-xl p-10 max-w-md w-full">
        <h1
          className={`text-2xl font-bold mb-4 ${
            isSuccess ? "" : "text-red-500"
          }`}
        >
          {title}
        </h1>
        <p className="mb-8">{description}</p>
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
      </div>
    </section>
  );
};

export default PaymentResult;
