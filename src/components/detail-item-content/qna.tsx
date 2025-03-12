import Link from "next/link";

export default function QnA() {
  return (
    <article>
      <div>
        <p>구매하시려는 상품에 궁금한 점이 있으면 문의주세요.</p>
        <nav className="flex gap-4 w-50 text-center my-4">
          <Link
            href="/"
            className="bg-[#252422] text-[#d6d2c8] grow-1 p-2 rounded-sm shadow-2xs
            shadow-[#1a1918]"
          >
            상품문의
          </Link>
          <Link
            href="/"
            className="bg-[#e9e6e0] text-[#252422] grow-1 p-2 rounded-sm shadow-xs shadow-[#d6cebf]"
          >
            1:1 문의
          </Link>
        </nav>
      </div>
      <div className="border-t-2 border-[#565451]">
        <ul className="li-header flex justify-around text-center border-b-1 py-3 border-[#b4b1af]">
          <li className="grow-1">상태</li>
          <li className="grow-3">제목</li>
          <li className="grow-1">작성자</li>
          <li className="grow-1">등록일</li>
        </ul>
        <ul className="li-body flex justify-around text-center border-b-1 py-3 border-[#b4b1af]">
          <li className="grow-1">
            <div>답변완료</div>
          </li>
          <li className="grow-3">비밀글입니다.</li>
          <li className="grow-1">작성자 성명</li>
          <li className="grow-1">2025-02-12</li>
        </ul>
      </div>
    </article>
  );
}
