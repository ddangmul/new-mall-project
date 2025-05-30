"use client";

import { createPortal } from "react-dom";
import { useCart } from "@/store/cart-context";
import "./cart-modal.css";

export default function CartModal() {
  const { isModalOpen, closeModal, confirmOpenCart } = useCart();

  if (!isModalOpen || typeof window === "undefined") return null;

  return createPortal(
    <div className="overlay text-xs md:text-md">
      <div className="cart-modal">
        <h2>선택상품이 장바구니에 추가되었습니다.</h2>
        <p>장바구니로 이동하시겠습니까?</p>

        <div className="modal-btn">
          <button onClick={confirmOpenCart} color="primary" className="cursor-pointer">
            장바구니로 이동하기
          </button>
          <button onClick={closeModal} color="secondary" className="cursor-pointer">
            쇼핑 계속하기
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
}
