"use client";

import { useState, useEffect } from "react";
import { Item } from "@/assets/types";
import { formatterPrice } from "@/utils/formatter";

const ItemQuantity = ({ item }: { item: Item }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(false); // div 표시 여부
  const [numericPrice, setNumericPrice] = useState(0); // 초기값 0으로 설정

  const addToCartHandler = () => {
    const item = { ...item, quantity: quantity };

    const itemsToAdd = Array.from({ length: quantity }, () => item);
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  // X 버튼 클릭 시 div 숨기기
  const handleRemove = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div className="item-quantity-area py-6 px-4 bg-[#eae7e4] shadow-sm">
        <div
          className="item-quantity-heading text-xl space-y-6 pb-6 mb-8 border-b-1 
        border-b-[#c3bebc] "
        >
          <p>수량</p>
        </div>
        <div className="flex justify-between text-xl">
          <div className="quantity-select flex justify-between items-center min-w-24 bg-[#f6f6f6]">
            <button
              onClick={decreaseQuantity}
              className="basis-1/3 border-1 border-[#a0a09f] rounded-xs"
            >
              -
            </button>
            <span className="basis-1/3 text-center ">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="basis-1/3 border-1 border-[#a0a09f] rounded-xs"
            >
              +
            </button>
          </div>
          <div>
            <button onClick={handleRemove}>X</button>
          </div>
        </div>
      </div>
      <div
        id="totalPrice"
        className="text-3xl font-serif border-t-1 border-t-[#a0a09f] "
      >
        <div className="mt-6 flex justify-between">
          <span>Total</span>
          <span>{formatterPrice(item.price * quantity)}</span>
        </div>
      </div>
      <div className="prod_action_btn text-3xl mt-8 flex justify-around gap-4 font-serif">
        <button
          onClick={addToCartHandler}
          type="button"
          className="bg-[#f8f7f5] text-[#524f4c] px-20 py-3 rounded-xs shadow-lg grow-1"
        >
          Cart
        </button>
        <button
          type="button"
          className="bg-[#524f4c] shadow-lg text-[#f8f7f5] px-20 py-3 rounded-xs grow-1"
        >
          Buy
        </button>
      </div>
    </>
  );
};

export default ItemQuantity;
