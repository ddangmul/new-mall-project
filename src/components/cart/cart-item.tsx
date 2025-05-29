"use client";

import { ItemWithQuantity } from "../../assets/types/types";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart-context";
import { formatterPrice } from "@/utils/formatter";
import React from "react";
import { useCallback } from "react";

interface CartItemProps {
  item: ItemWithQuantity;
  isChecked: boolean;
  onCheck: (id: string, checked: boolean) => void;
}

const CartItem: React.FC<CartItemProps> = React.memo(
  ({ item, onCheck, isChecked }) => {
    const QUANTITY_BTN =
      "basis-1/3 bg-[#aca8a4] rounded-sm drop-shadow-sm md:text-md mx-2";
    const { title, image, price, category, quantity, id } = item;

    const handleChange = useCallback(
      (e) => {
        onCheck(String(id), e.target.checked);
      },
      [id, onCheck]
    );

    const { updateItemQuantity } = useCart(); // 컨텍스트에서 수량 업데이트

    const increaseQuantity = () => {
      if (quantity !== undefined) {
        updateItemQuantity(String(id), quantity + 1); // 수량 증가
      }
    };

    const decreaseQuantity = () => {
      if (quantity > 1) {
        updateItemQuantity(String(id), quantity - 1); // 수량 감소
      }
    };

    return (
      <div className="cart-item-wrap flex justify-between items-center py-2 lg:py-4 gap-4 lg:gap-6 overflow-hidden border-b-1 border-b-[#c7cfcc] text-sm md:text-md lg:text-lg">
        <div className="item-info flex items-center gap-2 md:gap-4 lg:gap-10">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className="w-2.5 h-2.5 md:w-3 md:h-3"
          ></input>
          <div className="item-img relative flex-shrink-0 w-[55px] h-[55px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain"
              loading="lazy"
            />
          </div>
          <div className="item-txt space-y-2 md:space-y-4 lg:space-y-6 flex flex-col justify-center">
            <div className="item-title font-serif text-sm md:text-md lg:text-xl">
              <Link href={`/${category}/${id}/`}>{title}</Link>
            </div>
            <p className="item-price text-xs md:text-md lg:text-lg">
              {formatterPrice(price)}
            </p>
          </div>
        </div>
        <div className="item-quantity-action flex justify-between items-center">
          <button onClick={decreaseQuantity} className={QUANTITY_BTN}>
            -
          </button>
          <span className="w-14 text-center text-xs md:text-md lg:text-lg">
            {quantity}
          </span>
          <button onClick={increaseQuantity} className={QUANTITY_BTN}>
            +
          </button>
          <div className="item-price ml-8 md:ml-10 lg:ml-20 text-xs md:text-md lg:text-lg">
            {formatterPrice(price * quantity)}
          </div>
        </div>
      </div>
    );
  }
);

export default CartItem;
