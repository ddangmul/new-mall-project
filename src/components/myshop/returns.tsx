import Link from "next/link";
import "./order.css";

export default function ReturnsOrder() {
  const BTN_CSS = "text-xs text-center truncate max-w-fit";

  return (
    <article className="myshop-order max-w-full">
      <h1 className="text-lg md:text-xl lg:text-2xl py-6 md:pb-10">
        취소 / 교환 / 반품
      </h1>
      <form id="order_form" className="grid grid-cols-1 grid-rows-2 space-y-3">
        <div className="flex justify-between gap-2 flex-col md:flex-row">
          <div className="formState text-xs md:text-md">
            <select name="order_status" id="order_status">
              <option value="all">전체 주문처리상태</option>
              <option value="shipped_before">취소</option>
              <option value="shipped_standby">교환</option>
              <option value="shipped_begin">반품</option>
            </select>
          </div>
          <div className="period text-xs md:text-md flex justify-between gap-1 md:gap-2 max-w-fit">
            <Link href="" className={BTN_CSS}>
              오늘
            </Link>
            <Link href="" className={BTN_CSS}>
              1개월
            </Link>
            <Link href="" className={BTN_CSS}>
              3개월
            </Link>
            <Link href="" className={BTN_CSS}>
              6개월
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center grid-cols-2 gap-2 text-xs md:text-md">
          <span className="datepicker flex gap-2 items-center">
            <span className="start_date">
              <input type="date" />
            </span>
            <span className="date_txt">~</span>
            <span className="end_date">
              <input type="date" />
            </span>
          </span>
          <button className="order_search_btn text-xs md:text-md w-full md:w-auto">
            조회
          </button>
        </div>
        <div className="order_list flex flex-col gap-3 justify-center items-center">
          <p className="py-30 text-sm md:text-md lg:text-lg">
            최근 취소/교환/반품 내역이 없습니다.
          </p>
          {/* <div className="order_history_page py-10">
            <ol>
              <li>
                <Link href="">1</Link>
              </li>
            </ol>
          </div> */}
        </div>
      </form>
    </article>
  );
}
