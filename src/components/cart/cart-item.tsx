"use client";

import { Item } from "@/assets/types";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart-context";
import { formatterPrice } from "@/utils/formatter";

interface CartItemProps {
  item: Item;
  isChecked: boolean;
  onCheck: (id: string, checked: boolean) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onCheck, isChecked }) => {
  const { title, image, price, category, quantity, id } = item;

  const { updateItemQuantity } = useCart(); // 컨텍스트에서 수량 업데이트

  const increaseQuantity = () => {
    updateItemQuantity(id, quantity + 1); // 수량 증가
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateItemQuantity(id, quantity - 1); // 수량 감소
    }
  };

  return (
    <>
      <div className="cart-item-wrap flex justify-between items-center px-4 py-6 gap-8 overflow-hidden border-b-1 border-b-[#c7cfcc] text-xl sm:min-w-[500px]">
        <div className="item-checkbox mr-[-140px]">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onCheck(id, e.target.checked)}
          ></input>
        </div>
        <div className="item-info flex gap-10 max-h-30">
          <div className="item-img max-w-25">
            <Image
              src={image}
              alt={title}
              width={50}
              height={50}
              layout="responsive"
            />
          </div>
          <div className="item-txt space-y-3 min-w-[400px] max-w-[700px]">
            <div className="item-title font-serif text-xl">
              <Link href={`/product/${category}/${id}/`}>{title}</Link>
            </div>
            {/* <p className="item-option pt-5">옵션명</p> */}
          </div>
        </div>
        <div className="item-quantity-action flex justify-between items-center w-36  text-lg">
          <button
            onClick={decreaseQuantity}
            className="basis-1/3 bg-[#aca8a4] rounded-sm py-1 drop-shadow-sm"
          >
            -
          </button>
          <span className="w-14 text-center">{quantity}</span>
          <button
            onClick={increaseQuantity}
            className="basis-1/3 bg-[#aca8a4] rounded-sm py-1 drop-shadow-sm"
          >
            +
          </button>
        </div>
        <div className="item-price">{formatterPrice(price * quantity)}</div>
      </div>
    </>
  );
};

export default CartItem;
