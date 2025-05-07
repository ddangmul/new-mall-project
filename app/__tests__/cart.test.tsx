import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "../cart/page";
import { useCart } from "@/store/cart-context";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/store/cart-context", () => ({
  useCart: jest.fn(),
}));

const mockPush = jest.fn();
const deleteCartHandlerMock = jest.fn();

describe("Cart Page", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    (useCart as jest.Mock).mockReturnValue({
      cartItems: [
        { id: 1, title: "Item A", price: 10000, quantity: 1 },
        { id: 2, title: "Item B", price: 20000, quantity: 2 },
      ],
      deleteCartHandler: deleteCartHandlerMock,
      totalPrice: 50000,
    });
  });

  test("cartItems 렌더링", () => {
    render(<Cart />);
    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("Item B")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  test("'전체 선택' 버튼 클릭 시 전체상품 선택", () => {
    render(<Cart />);
    const selectAllBtn = screen.getByText("전체 선택");
    fireEvent.click(selectAllBtn);
    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  });

  test("'선택 삭제' 버튼 클릭 시 선택된 상품 삭제", () => {
    render(<Cart />);
    const selectAllBtn = screen.getByText("전체 선택");
    fireEvent.click(selectAllBtn);

    const removeBtn = screen.getByText("선택 삭제");
    fireEvent.click(removeBtn);
    expect(deleteCartHandlerMock).toHaveBeenCalledTimes(1);
  });

  test("상품 구매 버튼 클릭 시 올바른 파라미터로 checkout 페이지 이동", () => {
    render(<Cart />);
    const selectAllBtn = screen.getByText("전체 선택");
    fireEvent.click(selectAllBtn);

    const buySelectedBtn = screen.getByText("선택 상품 구매");
    fireEvent.click(buySelectedBtn);

    expect(mockPush).toHaveBeenCalledWith("/checkout?ids=1,2");
  });
});
