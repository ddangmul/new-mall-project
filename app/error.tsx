"use client";

import { useEffect } from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("An error occurred:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
        에러가 발생했습니다.
      </h2>
      <p className="mt-2 text-gray-600 text-sm md:text-md lg:text-lg">
        {error.message}
      </p>
      <button
        onClick={reset}
        className="text-sm md:text-md lg:text-lg mt-4 px-4 py-2 bg-[#313030] text-white rounded"
      >
        다시 시도하기
      </button>
    </div>
  );
}
