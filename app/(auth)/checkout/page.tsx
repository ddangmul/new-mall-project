"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/store/cart-context";
import CheckoutButton from "@/components/payment/checkout-btn"; // 너가 만든 버튼 import
import { toast } from "react-toastify";
import LoadingIndicator from "@/components/loading-indicator";
import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return; // 세션 로딩 중일 때는 아무 것도 하지 않음
    if (!session?.user) {
      router.push("/login");
    }
  }, [status, session?.user, router]);

  const { cartItems } = useCart();
  const searchParams = useSearchParams();

  const idsParam = searchParams.get("ids");
  const selectedIds = idsParam ? idsParam.split(",") : [];

  const productsToBuy = idsParam
    ? cartItems.filter((item) => selectedIds.includes(String(item.id)))
    : cartItems;

  const calculatedTotalPrice = productsToBuy.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "card",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (status === "loading") {
    return <LoadingIndicator />;
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">구매 정보 입력</h1>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="address"
          placeholder="주소"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="연락처"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="card">신용카드</option>
          <option value="bank">계좌이체</option>
          <option value="cash">무통장입금</option>
        </select>

        <div className="text-right text-lg font-bold mb-4">
          총 결제 금액: {calculatedTotalPrice.toLocaleString()}원
        </div>

        <CheckoutButton
          form={form}
          cartItems={productsToBuy.map((item) => ({
            itemId: item.id,
            quantity: item.quantity,
          }))}
        />
      </div>
    </div>
  );
}
