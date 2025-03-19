import "./point.css";

export default function OneQnA() {
  return (
    <article className="relative">
      <div className="heading">
        <h1 className="text-2xl pt-5 pb-10">1:1 문의 내역</h1>
      </div>
      <div className="border-t-2 border-[#565451]">
        <ul className="li-header flex justify-around text-center border-b-1 py-3 border-[#b4b1af]">
          <li className="grow-1">상태</li>
          <li className="grow-3">제목</li>
          <li className="grow-1">등록일</li>
        </ul>
        <ul className="li-body flex justify-around text-center border-b-1 py-3 border-[#b4b1af]">
          <li className="grow-1">
            <div>답변완료</div>
          </li>
          <li className="grow-3">비밀글입니다.</li>
          <li className="grow-1">2025-02-12</li>
        </ul>
      </div>
      <button
        className="bg-[#e9e6e0] text-[#252422] grow-1 p-2 rounded-sm
        shadow-xs shadow-[#d6cebf] mt-6 absolute right-0"
      >
        1:1 문의 작성
      </button>
    </article>
  );
}
