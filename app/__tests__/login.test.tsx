import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../(auth)/login/page";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Login Page", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  test("email, password input요소 렌더링", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("폼 제출 시 signIn 호출", async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: null });

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "LogIn" }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: "test@example.com",
        password: "password123",
        redirect: false,
      });
    });

    expect(mockPush).toHaveBeenCalledWith("/myshop");
  });

  test("로그인 실패 시 에러메세지 렌더링", async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: "Invalid credentials" });

    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "LogIn" }));

    await waitFor(() => {
      expect(
        screen.getByText("이메일 또는 비밀번호가 잘못되었습니다.")
      ).toBeInTheDocument();
    });
  });

  test("구글로그인 시 google provider로 signIn 호출", () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: "Google LogIn" }));
    expect(signIn).toHaveBeenCalledWith("google");
  });

  test("카카오로그인 시 kakao provider로 signIn 호출", () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: "Kakao LogIn" }));
    expect(signIn).toHaveBeenCalledWith("kakao");
  });
});
