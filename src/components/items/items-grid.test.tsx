import { render, screen, fireEvent } from "@testing-library/react";
import { Item } from "../../../types/types";
import ItemsGrid from "./items-grid";

// Mock ItemCard 컴포넌트
jest.mock("./item-card", () => ({ item }: { item: Item }) => (
  <div data-testid="item-card">{item.title}</div>
));

const addCartHandler = jest.fn();
const openModal = jest.fn();

jest.mock("@/store/cart-context", () => ({
  useCart: () => ({
    addCartHandler,
    openModal,
  }),
}));

const mockItems: Item[] = [
  {
    id: 1,
    title: "Item One",
    image: "/item1.jpg",
    price: 10000,
    description: "First item",
    category: "category",
  },
];

describe("<ItemsGrid />", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("item 수량만큼 Link컴포넌트, ItemCart 컴포넌트 렌더링", () => {
    render(<ItemsGrid items={mockItems} />);

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "category/1");

    const li = link.querySelector("li");
    expect(li).toBeInTheDocument();

    const cards = screen.getAllByTestId("item-card");
    expect(cards).toHaveLength(mockItems.length);
    expect(screen.getByText("Item One")).toBeInTheDocument();
  });

  test("Cart 버튼 클릭 시 addCartHandler, openModal 호출", () => {
    render(<ItemsGrid items={mockItems} />);
    const buttons = screen.getByText("Cart");

    fireEvent.click(buttons);

    expect(addCartHandler).toHaveBeenCalledWith(mockItems[0], 1);
    expect(openModal).toHaveBeenCalled();
  });
});
