import Link from "next/link";
import "./order.css";

export default function ReturnsOrder() {
  return (
    <article className="myshop-returns">
      <div className="heading">
        <h1 className="text-2xl pt-5 pb-10">취소/교환/반품 내역</h1>
      </div>
      <form
        action="#"
        id="returns_form"
        name="returns_form"
        className="grid grid-cols-1 grid-rows-2 space-y-3 "
      >
        <div className="flex justify-between">
          <div className="formState text-md">
            <select name="order_status" id="order_status">
              <option value="all">전체 주문처리상태</option>
              <option value="shipped_before">취소</option>
              <option value="shipped_standby">교환</option>
              <option value="shipped_begin">반품</option>
            </select>
          </div>
          <div className="period text-md flex gap-2">
            <Link href="">오늘</Link>
            <Link href="">1개월</Link>
            <Link href="">3개월</Link>
            <Link href="">6개월</Link>
          </div>
        </div>
        <div className="date w-full flex justify-between items-center col-span-2 text-md">
          <span className="datepicker flex gap-3 items-center">
            <span className="start_date">
              <input type="date" />
            </span>
            <span className="date_txt">~</span>
            <span className="end_date">
              <input type="date" />
            </span>
          </span>
          <button className="order_search_btn text-md">조회</button>
        </div>
        <div className="order_list flex flex-col gap-3 justify-center items-center">
          <p className="py-30 text-lg ">최근 취소/교환/반품 내역이 없습니다.</p>
          <div className="order_history_page py-10">
            <ol>
              <li>
                <Link href="">1</Link>
              </li>
            </ol>
          </div>
        </div>
      </form>
    </article>
  );
}
