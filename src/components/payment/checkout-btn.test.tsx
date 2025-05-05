import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CheckoutButton from "./checkout-btn";
import { toast } from "react-toastify";

// 모킹
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("@/utils/validation", () => ({
  validateNewAddress: jest.fn(),
}));

// require(): mock된 버전의 모듈 함수에 접근
const mockValidateNewAddress = require("@/utils/validation")
  .validateNewAddress as jest.Mock;

describe("<CheckoutButton />", () => {
  const defaultProps = {
    form: {
      name: "test user",
      address: "test address",
      phone: "01012341234",
      paymentMethod: "card",
    },
    cartItems: [
      { itemId: "item1", quantity: 2 },
      { itemId: "item2", quantity: 1 },
    ],
    useNewAddress: true,
    newAddress: {
      addressname: "집",
      postcode: "12345",
      address: "test address",
      detailAddress: "test 110",
      addressmobile: "01012341234",
      isDefault: false,
    },
  };

  beforeEach(() => {
    jest.resetAllMocks();
    global.fetch = jest.fn();
    (window as any).TossPayments = jest.fn().mockReturnValue({
      requestPayment: jest.fn(),
    });
  });

  test("주소 유효성검사 실패 시 toast.error 호출", async () => {
    mockValidateNewAddress.mockReturnValue(false);

    render(<CheckoutButton {...defaultProps} />);

    fireEvent.click(screen.getByText("결제하기"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "입력한 배송지 정보가 유효하지 않습니다."
      );
    });
  });

  test("주소 저장 실패 시 toast.error 호출", async () => {
    mockValidateNewAddress.mockReturnValue(true);

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: " DB 오류" }),
    });

    render(<CheckoutButton {...defaultProps} />);

    fireEvent.click(screen.getByText("결제하기"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "배송지 저장에 실패했습니다. DB 오류"
      );
    });
  });

  test("주문 생성 실패 시 toast.error 호출", async () => {
    mockValidateNewAddress.mockReturnValue(true);

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) }) // 주소 저장
      .mockResolvedValueOnce({ ok: false }); // 주문 실패

    render(<CheckoutButton {...defaultProps} />);

    fireEvent.click(screen.getByText("결제하기"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("주문 생성 실패");
    });
  });

  test("TossPayments SDK 로드 안됨", async () => {
    mockValidateNewAddress.mockReturnValue(true);

    delete (window as any).TossPayments;

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) }) // 주소 저장
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ orderId: "123", amount: 1000, name: "주문명" }),
      });

    render(<CheckoutButton {...defaultProps} />);

    fireEvent.click(screen.getByText("결제하기"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "TossPayments SDK가 아직 로드되지 않았습니다."
      );
    });
  });

  test("결제 요청 실패 시 에러 toast 발생", async () => {
    mockValidateNewAddress.mockReturnValue(true);

    const mockRequestPayment = jest.fn().mockRejectedValue("결제 오류");
    (window as any).TossPayments = jest.fn().mockReturnValue({
      requestPayment: mockRequestPayment,
    });

    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({ ok: true, json: async () => ({}) }) // 주소 저장
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ orderId: "123", amount: 1000, name: "주문명" }),
      });

    render(<CheckoutButton {...defaultProps} />);

    fireEvent.click(screen.getByText("결제하기"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("결제창 에러: 결제 오류");
    });
  });
});
