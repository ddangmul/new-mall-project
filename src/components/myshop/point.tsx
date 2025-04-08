import "./point.css";

export default function Point() {
  return (
    <article className="myshop-point">
      <div className="heading">
        <h1 className="text-2xl pt-5 pb-10">포인트 내역</h1>
      </div>
      <table className="w-full text-left border-1 border-[#f2f0eb]">
        <thead>
          <tr>
            <th>날짜</th>
            <th>사유/내용</th>
            <th>내역</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="bg-none">2025-04-02</td>
            <td>신규회원 쇼핑지원금</td>
            <td>3,000</td>
          </tr>
          <tr>
            <td className="bg-none">2025-04-02</td>
            <td>신규회원 무료배송 쿠폰</td>
            <td>1장</td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}
