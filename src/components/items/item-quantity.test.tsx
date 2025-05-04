import { screen, render, fireEvent } from "@testing-library/react";
import { formatterPrice } from "@/utils/formatter";
import { Item } from "../../../types/types";
import { useCart } from "@/store/cart-context";
import Link from "next/link";
import ItemQuantity from "./item-quantity";

jest.mock("@/store/cart-context", () => ({
  useCart: jest.fn(),
}));

jest.mock("@/utils/formatter", () => ({
  formatterPrice: jest.fn((price) => `₩${price.toLocaleString("ko-KR")}`),
}));

const mockItem: Item = {
  title: "test item",
  image: "/test.jpg",
  price: 2000,
  description: "test",
};

const mockAddCartHandler = jest.fn();
const mockOpenModal = jest.fn();

beforeEach(() => {
  (useCart as jest.Mock).mockReturnValue({
    addCartHandler: mockAddCartHandler,
    openModal: mockOpenModal,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("<ItemQuantity />", () => {
  test("초기 수량 1로 표시", () => {
    render(<ItemQuantity item={mockItem} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("+ 버튼 클릭 시 수량 증가", () => {
    render(<ItemQuantity item={mockItem} />);

    const plusBtn = screen.getByText("+");
    fireEvent.click(plusBtn);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("- 버튼 클릭 시 수량 감소", () => {
    render(<ItemQuantity item={mockItem} />);

    const plusBtn = screen.getByText("+");
    const minusBtn = screen.getByText("-");

    fireEvent.click(plusBtn);
    fireEvent.click(minusBtn);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("- 버튼 클릭 시 수량 1 이하로는 감소하지 않음", () => {
    render(<ItemQuantity item={mockItem} />);

    const minusBtn = screen.getByText("-");
    fireEvent.click(minusBtn);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("수량에 따라 총 가격 계산", () => {
    render(<ItemQuantity item={mockItem} />);

    const plusBtn = screen.getByText("+");
    fireEvent.click(plusBtn); // 2개

    const total = screen.getByText(formatterPrice(mockItem.price * 2));
    expect(total).toBeInTheDocument();
  });

  test("Cart 버튼 클릭 시 addCartHandler, openModal 호출", () => {
    render(<ItemQuantity item={mockItem} />);

    const cartBtn = screen.getByText("Cart");
    fireEvent.click(cartBtn);

    expect(mockAddCartHandler).toHaveBeenCalledWith(mockItem, 1);
    expect(mockOpenModal).toHaveBeenCalled();
  });

  test("Buy Link href에 item.id와 quantity 적용", () => {
    render(<ItemQuantity item={mockItem} />);

    const buyBtn = screen.getByText("Buy");
    
    expect(buyBtn).toHaveAttribute(
      "href",
      `/checkout?buyNow=${mockItem.id}&qty=1`
    );
  });
});
