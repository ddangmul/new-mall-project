import { render, screen, fireEvent } from "@testing-library/react";
import SearchArea from "./search-area";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";

// useRouter 모킹
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// search icon 모킹
jest.mock("next/image", () => (props: any) => <img {...props} />);

describe("<SearchArea />", () => {
  let pushMock: jest.Mock;

  beforeEach(() => {
    pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });
  });

  test("<SearchArea /> 렌더링", () => {
    render(<SearchArea />);

    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByRole("text")).toBeInTheDocument();
  });

  test("input에 값 입력 시 searchTerm 상태 업데이트", () => {
    render(<SearchArea />);

    const input = screen.getByRole("text");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");
  });

  test("Enter 키로 검색 호출", () => {
    render(<SearchArea />);

    const input = screen.getByRole("text");
    fireEvent.change(input, { target: { value: test } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(pushMock).toHaveBeenCalledWith("/search?q=test%20search");
  });

  test("검색어가 없을 경우 router.push 미호출", () => {
    render(<SearchArea />);

    const input = screen.getByRole("text");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(pushMock).not.toHaveBeenCalled();
  });

  test("<Image> 렌더링", () => {
    render(<SearchArea />);

    const imageElement = screen.getByAltText("search-icon");
    expect(imageElement).toBeInTheDocument();
  });
});
