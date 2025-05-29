import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../(auth)/signup/page";
import * as validation from "@/utils/validation";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    refresh: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock("@/utils/validation", () => ({
  validateMobileNumber: jest.fn(),
}));

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({ success: true }),
  });
  jest.spyOn(validation, "validateMobileNumber").mockReturnValue({
    result: true,
    mobileNumber: "010-1234-5678",
  });
});

afterEach(() => {
  jest.clearAllMocks(); // 모든 Mock 초기화
});

describe("Signup Page", () => {
  it("<Signup /> 렌더링", () => {
    render(<Signup />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("이름")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password Check")).toBeInTheDocument();
    expect(screen.getByText("회원가입")).toBeInTheDocument();
  });

  it("비밀번호 미일치 시 fetch 미호출", async () => {
    const mockFetch = jest.fn(); // 호출 안 되도록 빈 mock
    global.fetch = mockFetch;

    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password Check"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /회원가입/i }));

    await waitFor(() => {
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  it("전화번호 형식 불일치 시 에러메세지 표시", async () => {
    (validation.validateMobileNumber as jest.Mock).mockReturnValue({
      result: false,
    });

    render(<Signup />);
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("이름"), {
      target: { value: "홍길동" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password Check"), {
      target: { value: "password123" },
    });

    fireEvent.change(screen.getByTestId("mobile2"), {
      target: { value: "14" },
    });

    fireEvent.change(screen.getByTestId("mobile3"), {
      target: { value: "5678" },
    });

    fireEvent.change(screen.getByLabelText("생년월일"), {
      target: { value: "1990-01-01" },
    });

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "010" },
    });

    fireEvent.click(screen.getByRole("button", { name: "회원가입" }));

    await waitFor(() => {
      expect(
        screen.getByText("전화번호는 010-1234-5678 형식이어야 합니다.")
      ).toBeInTheDocument();
    });
  });

  test("폼 제출 시 API 호출", async () => {
    (validation.validateMobileNumber as jest.Mock).mockReturnValue({
      result: true,
      mobileNumber: "010-1234-5678",
    });
    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("이름"), {
      target: { value: "홍길동" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "010" },
    });
    fireEvent.change(screen.getByTestId("mobile2"), {
      target: { value: "1111" },
    });

    fireEvent.change(screen.getByTestId("mobile3"), {
      target: { value: "1111" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password Check"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("생년월일"), {
      target: { value: "1990-01-01" },
    });

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/signup",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: expect.any(String),
        })
      );
    });
  });
});
