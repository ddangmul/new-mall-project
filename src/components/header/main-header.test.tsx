import { render, screen } from "@testing-library/react";
import MainHeader from "./main-header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// useSession 가져오는 모듈 전체 모킹
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

// <SearchArea /> 내부의 useRouter 모킹
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe("<MainHeader />", () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
  });

  test("비로그인 시 버튼명 Login 표시", () => {
    render(<MainHeader />);
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("로그인시 MyPage 버튼 표시", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "Tester" } },
      status: "authenticated",
    });

    render(<MainHeader />);
    expect(screen.getByText("MyPage")).toBeInTheDocument();
  });

  test("메인헤더 네비메뉴 Link 렌더링", () => {
    render(<MainHeader />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Archive")).toBeInTheDocument();
    expect(screen.getByText("Cart")).toBeInTheDocument();
  });
});
