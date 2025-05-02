"use client";

import { ItemWithQuantity } from "../../../types/types";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart-context";
import { formatterPrice } from "@/utils/formatter";

interface CartItemProps {
  item: ItemWithQuantity;
  isChecked: boolean;
  onCheck: (id: string, checked: boolean) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onCheck, isChecked }) => {
  const { title, image, price, category, quantity, id } = item;

  const { updateItemQuantity } = useCart(); // 컨텍스트에서 수량 업데이트

  const increaseQuantity = () => {
    if (quantity) {
      updateItemQuantity(String(id), quantity + 1); // 수량 증가
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateItemQuantity(String(id), quantity - 1); // 수량 감소
    }
  };

  return (
    <div className="cart-item-wrap flex justify-between items-center xl:px-2 py-4 xl:py-6 gap-4 xl:gap-8 overflow-hidden border-b-1 border-b-[#c7cfcc] text-md xl:text-lg">
      <div className="item-info flex items-center gap-4 xl:gap-10">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onCheck(String(id), e.target.checked)}
          className="w-3 h-3"
        ></input>
        <div className="item-img relative flex-shrink-0 w-[70px] h-[70px] xl:w-[80px] xl:h-[80px]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>
        <div className="item-txt space-y-3 xl:space-y-6 flex flex-col justify-center">
          <div className="item-title font-serif xl:text-xl">
            <Link href={`/${category}/${id}/`}>{title}</Link>
          </div>
          <p className="item-price">{formatterPrice(price)}</p>
        </div>
      </div>
      <div className="item-quantity-action flex justify-between items-center xl:text-lg">
        <button
          onClick={decreaseQuantity}
          className="basis-1/3 bg-[#aca8a4] rounded-sm drop-shadow-sm"
        >
          -
        </button>
        <span className="w-14 text-center">{quantity}</span>
        <button
          onClick={increaseQuantity}
          className="basis-1/3 bg-[#aca8a4] rounded-sm drop-shadow-sm"
        >
          +
        </button>
        <div className="item-price ml-4 xl:ml-10">
          {formatterPrice(price * quantity)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
