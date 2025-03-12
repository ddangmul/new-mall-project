import Link from "next/link";
import "./returns.css";

export default function Returns() {
  return (
    <article>
      <table className="border-1 border-[#f2f0eb] ">
        <tbody>
          <tr>
            <td>반품/교환 택배사</td>
            <td>CJ대한통운</td>
          </tr>
          <tr>
            <td>반품/교환 택배사</td>
            <td>CJ대한통운</td>
          </tr>
          <tr>
            <td>교환 배송비(왕복)</td>
            <td>8,000원</td>
          </tr>
          <tr>
            <td>반품/교환 주소지</td>
            <td>서울특별시 땅물동</td>
          </tr>
          <tr>
            <td>반품/교환 신청 기준일</td>
            <td>
              상품 수령 후 7일 이내
              <span>
                (단, 제품이 표시광고 내용과 다르거나 불량 등 계약과 다르게
                이행된 경우는 제품 수령일로부터 3개월이내나 그 사실을 안 날 또는
                알 수 있었던 날부터 30일 이내 교환/반품이 가능)
              </span>
            </td>
          </tr>
          <tr>
            <td>반품/교환 불가능 사유</td>
            <td className="space-y-2">
              <p>
                1. 소비자의 잘못으로 물건이 멸실되거나 훼손된 경우(단, 내용물을
                확인하기 위해 포장을 훼손한 경우는 제외)
              </p>
              <p>2. 소비자가 사용해서 물건의 가치가 뚜렷하게 떨어진 경우</p>
              <p>
                3. 시간이 지나 다시 판매하기 곤란할 정도로 물건의 가치가
                뚜렷하게 떨어진 경우
              </p>
              <p>
                4. 복제가 가능한 물건의 포장을 훼손한 경우 (CD, DVD, GAME, 도서
                등)
              </p>
              <p>
                5. 용역 또는 문화산업진흥 기본법 제2조제5호의 디지털콘텐츠의
                제공이 게시된 경우 (단, 가분적 용역 또는 가분적 디지털콘텐츠로
                구성된 계약의 경우 제공이 개시되지 않은 부분은 제외)
              </p>
              <p>
                6. 소비자의 주문에 따라 개별적으로 생산되는 상품이 제작에 들어간
                경우
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  );
}
