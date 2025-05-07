import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "./cart-item";
import { useCart } from "@/store/cart-context";

// useCart 모킹
jest.mock("@/store/cart-context", () => ({
  useCart: jest.fn(),
}));

const mockUpdateItemQuantity = jest.fn();
beforeEach(() => {
  (useCart as jest.Mock).mockReturnValue({
    updateItemQuantity: mockUpdateItemQuantity,
  });
});

// // <Image> 모킹
// jest.mock("next/image", () => (props: any) => {
//   return <img {...props} />;
// });

// 테스트용 item
const mockItem = {
  id: 123,
  title: "테스트 상품",
  image: "/test.jpg",
  price: 2000,
  quantity: 2,
  category: "test",
  description: "test",
  sales: 1,
};

describe("<Cartitem />", () => {
  // item 정보 렌더링
  test("item 정보 렌더링", () => {
    render(<CartItem item={mockItem} isChecked={true} onCheck={() => {}} />);

    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.getByText("테스트 상품")).toBeInTheDocument();
    expect(screen.getByText("₩2,000")).toBeInTheDocument();
    expect(screen.getAllByText("₩2,000")).toHaveLength(1);
    expect(screen.getByText("₩4,000")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});

// <Link>
test("상품명 Link 연결", () => {
  render(<CartItem item={mockItem} isChecked={false} onCheck={() => {}} />);

  const link = screen.getByRole("link", { name: "테스트 상품" });
  expect(link).toHaveAttribute("href", "/test/123");
});

// <Image>
test("상품 이미지 렌더링", () => {
  render(<CartItem item={mockItem} isChecked={false} onCheck={() => {}} />);

  const image = screen.getByRole("img");
  expect(image).toHaveAttribute("src", "/test.jpg");
  expect(image).toHaveAttribute("alt", "테스트 상품");
});

// isChecked
test("checkbox 클릭 시 onCheck 호출", () => {
  const onCheck = jest.fn();
  render(<CartItem item={mockItem} isChecked={false} onCheck={onCheck} />);

  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  expect(onCheck).toHaveBeenCalledWith("123", true);
});

describe("수량 변경", () => {
  // increaseQuantity()
  test("+ 버튼 클릭 시 updateItemQuantity 호출", () => {
    render(<CartItem item={mockItem} isChecked={false} onCheck={() => {}} />);

    const plusBtn = screen.getByText("+");
    fireEvent.click(plusBtn);
    expect(mockUpdateItemQuantity).toHaveBeenCalledWith("123", 3);
  });

  // decreaseQuantity()
  test("- 버튼 클릭 시 updateItemQuantity 호출", () => {
    render(<CartItem item={mockItem} isChecked={false} onCheck={() => {}} />);

    const minusBtn = screen.getByText("-");
    fireEvent.click(minusBtn);
    expect(mockUpdateItemQuantity).toHaveBeenCalledWith("123", 1);
  });

  // quantity가 1일 때 decreaseQuantity() 미호출
  test("수량 1일 때 -버튼 클릭 시 updateItemQuantity 미호출", () => {
    const mockItemWithQuantityOne = { ...mockItem, quantity: 1 };

    // mock 재정의: 테스트 간 독립성 보장
    const mockUpdateItemQuantity = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      updateItemQuantity: mockUpdateItemQuantity,
    });

    render(
      <CartItem
        item={mockItemWithQuantityOne}
        isChecked={false}
        onCheck={() => {}}
      />
    );

    const minusBtn = screen.getByText("-");
    fireEvent.click(minusBtn);
    expect(mockUpdateItemQuantity).not.toHaveBeenCalled();
  });
});
