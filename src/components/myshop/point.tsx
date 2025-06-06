import "./point.css";

export default function Point() {
  return (
    <article className="myshop-point max-w-full">
      <h1 className="text-lg md:text-xl lg:text-2xl py-4 md:pb-6">
        포인트 내역
      </h1>
      <table className="w-full text-left border-1 border-[#f2f0eb]">
        <thead>
          <tr className="text-xs md:text-md lg:text-lg">
            <th>날짜</th>
            <th>사유/내용</th>
            <th>내역</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-xs md:text-md lg:text-lg">
            <td className="bg-none">2025-04-02</td>
            <td>신규회원 쇼핑지원금</td>
            <td>3,000</td>
          </tr>
          <tr className="text-xs md:text-md lg:text-lg">
            <td className="bg-none">2025-04-02</td>
            <td>신규회원 무료배송 쿠폰</td>
            <td>1장</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}
