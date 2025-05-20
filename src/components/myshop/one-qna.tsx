import Link from "next/link";

export default function OneQnA() {
  return (
    <article className="relative max-w-full">
      <h1 className="text-lg md:text-xl lg:text-2xl py-4 md:pb-6">
        1:1 문의 내역
      </h1>
      <div className="mt-2 border-t-1 border-[#565451]">
        <ul className="li-header flex justify-around text-center border-b-1 py-3 border-[#b4b1af] text-xs md:text-sm lg:text-md">
          <li className="grow-1">상태</li>
          <li className="grow-3">제목</li>
          <li className="grow-1">등록일</li>
        </ul>
        <ul className="li-body flex justify-around text-center border-b-1 py-3 border-[#b4b1af] text-sm md:text-md lg_text-lg">
          <li className="grow-1">
            <div>답변완료</div>
          </li>
          <li className="grow-3">비밀글입니다.</li>
          <li className="grow-1">2025-02-12</li>
        </ul>
      </div>
      <Link
        href="/myshop/qna_post"
        className="bg-foreground text-background grow-1 p-2 rounded-xs
        shadow-xs shadow-[#d6cebf] mt-4 md:mt-6 absolute right-0 text-xs md:text-sm lg:text-md"
      >
        1:1 문의 작성
      </Link>
    </article>
  );
}
