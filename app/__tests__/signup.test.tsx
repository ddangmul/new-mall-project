import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../(auth)/signup/page";
import { useRouter } from "next/navigation";
import { validateMobileNumber } from "@/utils/validation";

jest.mock("next/navigation", () => {
  useRouter: jest.fn();
});

jest.mock("@/utils/validation", () => {
  validateMobileNumber: jest.fn();
});

describe("Login Page", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  test("<Signup /> 페이지 렌더링", () => {
    render(<Signup />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.findAllByPlaceholderText("이름")).toBeInTheDocument();
    expect(screen.findAllByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.findAllByPlaceholderText("Password Check")
    ).toBeInTheDocument();
    
  });
});
