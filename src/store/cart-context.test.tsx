import React from "react";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "./cart-context";
import { Item } from "../../types/types";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// 테스트용 래퍼
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe("CartContext", () => {
  beforeEach(() => {
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);

    const modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    document.body.appendChild(modal);
  });

  afterEach(() => {
    const modalRoot = document.getElementById("modal-root");
    if (modalRoot) {
      document.body.removeChild(modalRoot);
    }

    const modal = document.getElementById("modal");
    if (modal) {
      document.body.removeChild(modal);
    }
  });

  const mockItem: Item = {
    id: 1,
    title: "테스트 상품",
    price: 10000,
    image: "/test.jpg",
    description: "테스트 상품",
  };

  test("상품 추가 시 cartItems에 포함", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addCartHandler(mockItem, 2);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it("상품 수량 업데이트 시 반영", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addCartHandler(mockItem, 1);
      result.current.updateItemQuantity("1", 5);
    });

    expect(result.current.cartItems[0].quantity).toBe(5);
  });

  it("상품 삭제 시 cartItems에서 제거", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addCartHandler(mockItem, 1);
      result.current.deleteCartHandler(mockItem);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });

  it("총 가격(totalPrice) 계산", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addCartHandler(mockItem, 3); // 10000 * 3
    });

    expect(result.current.totalPrice).toBe(30000);
  });

  it("모달 열기/닫기 함수 작동", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isModalOpen).toBe(false);
  });
});
