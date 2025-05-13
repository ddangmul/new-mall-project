"use client";

import { useEffect, useState, useMemo } from "react";
import OrderCard from "./order-card";
import Link from "next/link";
import "./order.css";

interface OrderItem {
  id: number;
  itemId: number;
  quantity: number;
}

interface Order {
  id: number;
  name: string;
  address: string;
  phone: string;
  paymentMethod: string;
  status: string;
  createdAt: string;
  paidAt?: string;
  orderItems: OrderItem[];
}

export default function Order() {
  const BTN_CSS = "text-xs text-center truncate max-w-fit";
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;

    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/order");
        if (!res.ok) {
          throw new Error("주문정보를 가져오는 데 실패했습니다.");
        }
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error(error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [loading]);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => order.status === "paid");
  }, [orders]);

  if (loading) {
    return <p className="text-center mt-10">주문 내역을 불러오는 중...</p>;
  }

  return (
    <article className="myshop-order max-w-full">
      <h1 className="text-lg md:text-xl lg:text-2xl py-6 md:pb-10">
        주문 내역
      </h1>
      <form id="order_form" className="grid grid-cols-1 grid-rows-2 space-y-3">
        <div className="flex justify-between gap-2 flex-col md:flex-row">
          <div className="formState text-xs md:text-md">
            <select name="order_status" id="order_status">
              <option value="all">전체 주문처리상태</option>
              <option value="shipped_before">입금전</option>
              <option value="shipped_standby">배송준비중</option>
              <option value="shipped_begin">배송중</option>
              <option value="shopped_complete">배송완료</option>
            </select>
          </div>
          <div className="period text-xs md:text-sm flex flex-wrap w-full md:w-auto justify-start gap-2">
            {["1개월", "3개월", "6개월"].map((text) => (
              <Link key={text} href="" className={BTN_CSS}>
                {text}
              </Link>
            ))}
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
          {orders.length === 0 ? (
            <p className="py-30 text-sm md:text-md lg:text-lg">
              최근 주문 내역이 없습니다.
            </p>
          ) : (
            <ul className="space-y-4 w-full mt-5">
              {filteredOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </ul>
          )}
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
