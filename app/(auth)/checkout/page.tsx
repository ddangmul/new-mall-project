"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart-context";
import LoadingIndicator from "@/components/loading-indicator";
import { notFound, useSearchParams } from "next/navigation";
import CheckoutButton from "@/components/payment/checkout-btn";

export default function CheckoutPage() {
  const { data: session } = useSession();
  const { cartItems } = useCart();
  const searchParams = useSearchParams();

  const [addressList, setAddressList] = useState([]);
  const [form, setForm] = useState(null);

  useEffect(() => {
    fetch("api/address")
      .then((res) => res.json())
      .then((data) => setAddressList(data.addresses))
      .catch((error) => notFound());
  }, []);

  useEffect(() => {
    if (session && addressList) {
      setForm({
        name: session.user?.username || "",
        address: addressList[0],
        phone: session.user?.mobile || "",
        paymentMethod: "신용카드",
      });
    }
  }, [session, addressList]);

  const idsParam = searchParams.get("ids");
  const productsToBuy =
    idsParam === "all"
      ? cartItems
      : idsParam
      ? cartItems.filter((item) =>
          idsParam.split(",").includes(String(item.id))
        )
      : [];

  const deliveryFee = 2500;
  const calculatedTotalPrice = productsToBuy.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalPrice = calculatedTotalPrice + deliveryFee;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  if (!session || !form || !cartItems.length) {
    return <LoadingIndicator />;
  }

  return (
    <div className="max-w-xl mx-auto p-4 mt-20">
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
        <select
          name="address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        >
          {addressList.map((addr, index) => (
            <option key={index} value={addr}>
              {addr.address}
            </option>
          ))}
        </select>
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
          총 결제 금액: {totalPrice.toLocaleString()}원
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
