"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/store/cart-context";
import CartItem from "@/components/cart/cart-item";
import { formatterPrice } from "@/utils/formatter";
import { useRouter } from "next/navigation";

export default function Cart() {
  const BTN_CSS = "bg-[#494643] text-[#f3f3f2] py-2 rounded-sm px-3";
  const router = useRouter();

  const { cartItems, deleteCartHandler, totalPrice } = useCart();

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    console.log("현재 체크된 항목들:", checkedItems);
  }, [checkedItems]);

  // 체크 상태 변경 핸들러
  const handleCheck = (id: string, checked: boolean) => {
    setCheckedItems((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };

  // 선택 구매
  const handleBuySelected = () => {
    const selectedItems = cartItems.filter((item) =>
      checkedItems.includes(String(item.id))
    );

    if (selectedItems.length === 0) {
      alert("선택된 상품이 없습니다.");
      return;
    }

    console.log("선택 구매할 항목들:", selectedItems);
    const selectedIds = checkedItems.join(",");
    router.push(`/checkout?ids=${selectedIds}`);
  };

  // 전체 구매
  const handleBuyAll = () => {
    if (cartItems.length === 0) {
      alert("장바구니가 비어있습니다.");
      return;
    }

    console.log("전체 구매할 항목들:", cartItems);
    router.push(`/checkout?ids=all`);
  };

  // 선택된 아이템만 삭제
  const handleRemoveSelected = () => {
    console.log("선택된 항목:", checkedItems);
    const itemsToDelete = cartItems.filter((item) =>
      checkedItems.includes(String(item.id))
    );
    deleteCartHandler(itemsToDelete);
    setCheckedItems([]);

    console.log("삭제 후 선택된 항목:", checkedItems);
  };

  // console.log(cartItems);
  return (
    <section className="cart-page py-10 px-20">
      <div className="cart-heading flex gap-3 items-center">
        <span className="text-3xl font-serif">Cart</span>
        <span className="text-xl bg-[#494643] text-[#f2f0eb] px-2.5 rounded-full">
          {cartItems.length}
        </span>
      </div>
      <div className="cart_action_btn flex gap-4 mt-10 justify-end text-xs xl:text-md">
        <button
          onClick={() =>
            setCheckedItems(
              cartItems.length === checkedItems.length
                ? []
                : cartItems.map((item) => String(item.id))
            )
          }
          className="bg-[#494643] text-[#d6d2c8] p-2 rounded-sm shadow-2xs"
        >
          전체 선택
        </button>
        <button
          onClick={handleRemoveSelected}
          className="bg-[#494643] text-[#d6d2c8] p-2 rounded-sm shadow-2xs"
        >
          선택 삭제
        </button>
        <button
          onClick={() => cartItems.forEach((item) => deleteCartHandler(item))}
          className="bg-[#494643] text-[#d6d2c8] p-2 rounded-sm shadow-2xs
            "
        >
          비우기
        </button>
      </div>
      <div className="cart-items-wrapper mt-6">
        <ul className="cart_items px-2 border-t-1 border-t-[#a0a09f]">
          {cartItems.map((item, index) => (
            <li key={`${item.id} ${index}`}>
              <CartItem
                item={item}
                isChecked={checkedItems.includes(String(item.id))}
                onCheck={handleCheck}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="total-cart-items border-t-1 border-b-1 border-[#2e2d2c] mt-20 text-lg xl:text-xl">
        <div className="border-b-1 border-[#afaeac] py-2 font-serif">Total</div>
        <div className="py-10 flex justify-center gap-10 text-center text-sm xl:text-xl">
          <div className="flex flex-col">
            <span>{formatterPrice(totalPrice)}</span>
            <span className="text-[#787675]">상품금액</span>
          </div>
          +
          <div className="flex flex-col">
            <span>{formatterPrice(2500)}</span>
            <span className="text-[#787675]">배송비</span>
          </div>
          =
          <div className="flex flex-col">
            <span>{formatterPrice(totalPrice + 2500)}</span>
            <span className="text-[#787675]">총 주문금액</span>
          </div>
        </div>
      </div>

      <div className="w-full mt-10 checkout_btn flex justify-end space-x-5">
        <button onClick={handleBuySelected} className={BTN_CSS}>
          선택한 상품 구매
        </button>
        <button onClick={handleBuyAll} className={BTN_CSS}>
          전체 상품 구매
        </button>
      </div>
    </section>
  );
}
