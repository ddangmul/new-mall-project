import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "./cart-item";
import { useCart } from "@/store/cart-context";
import { ItemWithQuantity } from "../../../types/types";

// useCart mocking
jest.mock("@/store/cart-context", () => ({
  useCart: jest.fn(),
}));

const mockUpdateItemQuantity = jest.fn();

beforeEach(() => {
  (useCart as jest.Mock).mockReturnValue({
    updateItemQuantity: mockUpdateItemQuantity,
  });
});

const mockItem: ItemWithQuantity = {
  id: 123,
  title: "테스트 상품",
  image: "/test.jpg",
  price: 2000,
  quantity: 2,
  category: "category",
  description: "test",
  sales: 1,
};

describe("<CartItem />", () => {
  it("renders item information correctly", () => {
    render(<CartItem item={mockItem} isChecked={true} onCheck={() => {}} />);

    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(screen.getByText("테스트 상품")).toBeInTheDocument();
    expect(screen.getAllByText("₩2,000")).toHaveLength(1);
    expect(screen.getByText("₩4,000")).toBeInTheDocument(); // 2개니까
    expect(screen.getByText("2")).toBeInTheDocument(); // 수량
  });

  it("calls onCheck when checkbox is clicked", () => {
    const onCheck = jest.fn();
    render(<CartItem item={mockItem} isChecked={false} onCheck={onCheck} />);

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(onCheck).toHaveBeenCalledWith("123", true);
  });

  it('calls updateItemQuantity when "+" button is clicked', () => {
    render(<CartItem item={mockItem} isChecked={false} onCheck={() => {}} />);

    const plusButton = screen.getByText("+");
    fireEvent.click(plusButton);
    expect(mockUpdateItemQuantity).toHaveBeenCalledWith("123", 3);
  });

  it('calls updateItemQuantity when "-" button is clicked', () => {
    render(<CartItem item={mockItem} isChecked={false} onCheck={() => {}} />);

    const minusButton = screen.getByText("-");
    fireEvent.click(minusButton);
    expect(mockUpdateItemQuantity).toHaveBeenCalledWith("123", 1);
  });

  it('does not call updateItemQuantity when quantity is 1 and "-" is clicked', () => {
    const oneQuantityItem = { ...mockItem, quantity: 1 };
    render(
      <CartItem item={oneQuantityItem} isChecked={false} onCheck={() => {}} />
    );

    const minusButton = screen.getByText("-");
    fireEvent.click(minusButton);
    expect(mockUpdateItemQuantity).not.toHaveBeenCalled();
  });
});
