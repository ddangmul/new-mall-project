"use client";

import { useState, useMemo } from "react";
import { Item } from "../../assets/types/types";
import { formatterPrice } from "@/utils/formatter";
import { useCart } from "@/store/cart-context";
import Link from "next/link";

const ItemQuantity = ({ item }: { item: Item }) => {
  const { addCartHandler, openModal } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const totalPrice = useMemo(
    () => formatterPrice(item.price * quantity),
    [item.price, quantity]
  );

  return (
    <>
      <div className="item-quantity-area md:py-4 py-6 px-4 lg:px-6 bg-[#eae7e4]">
        <div
          className="item-quantity-heading text-md md:text-lg lg:text-xl space-y-6 pb-6 mb-8 border-b-1 
        border-b-[#c3bebc] "
        >
          <p>수량</p>
        </div>
        <div className="flex justify-between text-lg lg:text-xl">
          <div className="quantity-select flex justify-between items-center min-w-24 bg-[#f6f6f6]">
            <button
              aria-label="Decrease quantity"
              onClick={decreaseQuantity}
              className="basis-1/3 border-1 border-[#a0a09f] rounded-xs cursor-pointer"
            >
              -
            </button>
            <span className="basis-1/3 text-center ">{quantity}</span>
            <button
              aria-label="Increase quantity"
              onClick={increaseQuantity}
              className="basis-1/3 border-1 border-[#a0a09f] rounded-xs cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div
        id="totalPrice"
        className="text-lg md:text-xl lg:text-2xl font-serif border-t-1 border-t-[#a0a09f] "
      >
        <div className="mt-6 flex justify-between">
          <span>Total</span>
          <span>{totalPrice}</span>
        </div>
      </div>
      <div className="prod_action_btn text-lg md:text-xl lg:text-2xl mt-8 flex justify-between gap-4 font-serif">
        <button
          onClick={() => {
            addCartHandler(item, quantity);
            openModal();
          }}
          type="button"
          className="bg-[#f8f7f5] basis-1/2 py-2 rounded-xs shadow-lg cursor-pointer"
        >
          Cart
        </button>
        <Link
          href={`/checkout?buyNow=${item.id}&qty=${quantity}`}
          className="bg-foreground shadow-lg text-background basis-1/2 py-2 rounded-xs text-center"
        >
          Buy
        </Link>
      </div>
    </>
  );
};

export default ItemQuantity;
