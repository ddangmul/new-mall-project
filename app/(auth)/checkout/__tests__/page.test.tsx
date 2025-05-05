import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CheckoutPage from "../page";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useCart } from "@/store/cart-context";
import { useAddress } from "@/store/address-context";

// mock 모듈들
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: () => ({
    get: (key: string) => {
      if (key === "ids") return "all";
      if (key === "buyNow") return null;
      if (key === "qty") return null;
      return null;
    },
  }),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@/store/cart-context", () => ({
  useCart: jest.fn(),
}));

jest.mock("@/store/address-context", () => ({
  useAddress: jest.fn(),
}));

// 필요한 컴포넌트들 모킹
jest.mock("@/components/loading-indicator", () => () => (
  <div data-testid="loading-indicator">Loading...</div>
));

jest.mock("@/components/payment/checkout-btn", () => () => (
  <button>결제하기</button>
));
jest.mock("@/components/checkout/newaddress", () => () => (
  <div>New Address Form</div>
));
jest.mock("@/components/checkout/address-selection", () => () => (
  <div>Address Selection</div>
));

describe("CheckoutPage", () => {
  const mockRouterPush = jest.fn();
  const mockReplace = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
      replace: mockReplace,
      back: jest.fn(),
    });

    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          username: "test user",
          mobile: "01012345678",
        },
      },
      status: "authenticated",
    });

    (useCart as jest.Mock).mockReturnValue({
      cartItems: [
        {
          id: 1,
          title: "test",
          image: "/test.jpg",
          price: 10000,
          quantity: 2,
        },
      ],
    });

    (useAddress as jest.Mock).mockReturnValue({
      addresses: [
        {
          id: 1,
          addressname: "test addressName",
          isDefault: true,
          address: "test address",
        },
      ],
      fetchAddresses: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // test("session 상태 loading일 때 로딩인디케이터 렌더링", async () => {
  //   (useSession as jest.Mock).mockReturnValueOnce({
  //     data: null,
  //     status: "loading",
  //   });

  //   render(<CheckoutPage />);
  //   await waitFor(() => {
  //     expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();
  //   });
  // });

  test("checkout 페이지 렌더링", async () => {
    render(<CheckoutPage />);

    await waitFor(() => {
      expect(screen.getByText("결제 페이지")).toBeInTheDocument();
    });

    expect(screen.getByText("배송지 정보")).toBeInTheDocument();
    expect(screen.getByText("상품 정보")).toBeInTheDocument();
    expect(screen.getByText("test x 2")).toBeInTheDocument();
    expect(screen.getByText("쿠폰 사용")).toBeInTheDocument();
    expect(screen.getByText("마일리지 사용")).toBeInTheDocument();
    expect(screen.getByText("결제 방법")).toBeInTheDocument();
    expect(screen.getByText("결제하기")).toBeInTheDocument();
  });

  it("'신규 배송지 입력' 버튼 클릭 시 NewAddressForm 렌더링", async () => {
    render(<CheckoutPage />);

    await waitFor(() => {
      expect(screen.getByText("신규 배송지 입력")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("신규 배송지 입력"));

    await waitFor(() => {
      expect(screen.getByText("New Address Form")).toBeInTheDocument();
    });
  });
});
