import { render, screen, fireEvent } from "@testing-library/react";
import SearchArea from "./search-area";

// useRouter 모킹
const pushMock = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("<SearchArea />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("<SearchArea /> 렌더링", () => {
    render(<SearchArea />);

    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  test("input에 값 입력 시 searchTerm 상태 업데이트", () => {
    render(<SearchArea />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(input).toHaveValue("test");
  });

  test("Enter 키로 검색 호출", () => {
    render(<SearchArea />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test search" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(pushMock).toHaveBeenCalledWith("/search?q=test%20search"); // test search URI 인코딩 값
  });

  test("검색어가 없을 경우 router.push 미호출", () => {
    render(<SearchArea />);

    const input = screen.getByRole("textbox");
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
