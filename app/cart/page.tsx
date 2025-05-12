"use client";

import { useCallback, useMemo, useState } from "react";
import { useCart } from "@/store/cart-context";
import CartItem from "@/components/cart/cart-item";
import { formatterPrice } from "@/utils/formatter";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Cart() {
  const router = useRouter();
  const TOP_BTN_CSS = "bg-[#ffffff] text-[#494643] p-2 rounded-sm shadow-2xs";
  const BOTTOM_BTN_CSS = "bg-[#494643] text-[#f3f3f2] py-2 rounded-sm px-3";

  const { cartItems, deleteCartHandler, totalPrice } = useCart();

  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  // 체크 상태 변경 핸들러
  const handleCheck = useCallback((id: string, checked: boolean) => {
    setCheckedItems((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  }, []);

  let totalOrderPrice = totalPrice;

  const selectedTotalPrice = useMemo(() => {
    return cartItems
      .filter((item) => checkedItems.includes(String(item.id)))
      .reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems, checkedItems]);

  if (checkedItems.length > 0) {
    totalOrderPrice = selectedTotalPrice;
  }

  // 선택 구매
  const handleBuySelected = useCallback(() => {
    const selectedItems = cartItems.filter((item) =>
      checkedItems.includes(String(item.id))
    );

    if (selectedItems.length === 0) {
      toast.error("구매할 상품을 선택해주세요.");
      return;
    }

    const selectedIds = checkedItems.join(",");
    router.push(`/checkout?ids=${selectedIds}`);
  }, [cartItems, checkedItems, router]);

  // 전체 구매
  const handleBuyAll = useCallback(() => {
    if (cartItems.length === 0) {
      alert("장바구니가 비어있습니다.");
      return;
    }

    const allItemIds = cartItems.map((item) => item.id).join(",");
    router.push(`/checkout?ids=${allItemIds}`);
  }, [cartItems, router]);

  // 선택된 아이템만 삭제
  const handleRemoveSelected = useCallback(() => {
    const itemsToDelete = cartItems.filter((item) =>
      checkedItems.includes(String(item.id))
    );
    deleteCartHandler(itemsToDelete);
    setCheckedItems([]);
  }, [cartItems, checkedItems, deleteCartHandler]);

  return (
    <section className="cart-page py-6 px-4 md:py-8 md:px-8 lg:py-10 lg:px-20">
      <div className="cart-heading flex gap-1 md:gap-2 lg:gap-3 items-center">
        <span className="text-xl md:text-2xl lg:text-3xl font-serif">Cart</span>
        <span className="text-sm md:text-lg lg:text-xl bg-[#494643] text-[#f2f0eb] px-1.5 md:px-2 lg:px-2.5 rounded-full">
          {cartItems.length}
        </span>
      </div>
      <div className="cart_action_btn flex gap-4 mt-4 md:mt-6 lg:mt-10 justify-end text-xs md:text-md lg:text-lg">
        <button
          onClick={() =>
            setCheckedItems(
              cartItems.length === checkedItems.length
                ? []
                : cartItems.map((item) => String(item.id))
            )
          }
          className={TOP_BTN_CSS}
        >
          전체 선택
        </button>
        <button onClick={handleRemoveSelected} className={TOP_BTN_CSS}>
          선택 삭제
        </button>
        <button
          onClick={() => cartItems.forEach((item) => deleteCartHandler(item))}
          className={TOP_BTN_CSS}
        >
          비우기
        </button>
      </div>
      <div className="cart-items-wrapper mt-4 lg:mt-6">
        <ul className="cart_items px-1 lg:px-2 border-t-1 border-t-[#a0a09f]">
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
      <div className="total-cart-items border-t-1 border-b-1 border-[#2e2d2c] px-1 lg:px-2  mt-10 md:mt-14 lg:mt-20 text-md md:text-lg lg:text-xl">
        <div className="border-b-1 border-[#afaeac] py-2 font-serif">Total</div>
        <div className="py-6 lg:py-10 px-2 flex justify-center gap-10 text-center text-sm md:text-md lg:text-lg">
          <div className="flex flex-col">
            <span>{formatterPrice(totalOrderPrice)}</span>
            <span className="text-[#787675] text-xs">상품금액</span>
          </div>
          +
          <div className="flex flex-col">
            <span>{formatterPrice(2500)}</span>
            <span className="text-[#787675] text-xs">배송비</span>
          </div>
          =
          <div className="flex flex-col">
            <span>{formatterPrice(totalOrderPrice + 2500)}</span>
            <span className="text-[#787675] text-xs">총 주문금액</span>
          </div>
        </div>
      </div>

      <div className="w-full mt-6 lg:mt-10 flex justify-between md:justify-end md:space-x-5 text-sm md:text-md lg:text-lg">
        <button onClick={handleBuySelected} className={BOTTOM_BTN_CSS}>
          선택 상품 구매
        </button>
        <button onClick={handleBuyAll} className={BOTTOM_BTN_CSS}>
          전체 상품 구매
        </button>
      </div>
    </section>
  );
}
