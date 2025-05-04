import { screen, render } from "@testing-library/react";
import { Item } from "../../../types/types";
import Image from "next/image";
import ItemCard from "./item-card";
import { formatterPrice } from "@/utils/formatter";

jest.mock("@/utils/formatter", () => ({
  formatterPrice: jest.fn((price) => `₩${price.toLocaleString("ko-KR")}`),
}));

const mockItem: Item = {
  title: "test item",
  image: "/test.jpg",
  price: 2000,
  description: "test",
};

describe("<ItemCard />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (formatterPrice as jest.Mock).mockReturnValue("₩2,000");
  });

  test("item 데이터 렌더링", () => {
    render(<ItemCard item={mockItem} />);

    expect(screen.getByAltText("test")).toBeInTheDocument();
    expect(screen.getByText("test item")).toBeInTheDocument();
    expect(screen.getByText("₩2,000")).toBeInTheDocument();
  });

  test("formatterPrice() 작동", () => {
    render(<ItemCard item={mockItem} />);

    expect(formatterPrice).toHaveBeenCalledWith(mockItem.price);
    expect(formatterPrice).toHaveBeenCalledTimes(1);
  });
});
