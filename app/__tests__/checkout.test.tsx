import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import CheckoutPage from "../(auth)/checkout/page";
import * as nextNavigation from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/src/store/cart-context";
import { useAddress } from "@/store/address-context";

const mockReplace = jest.fn();
const mockBack = jest.fn();

jest.mock("next-auth/react");
jest.mock("@/store/cart-context");
jest.mock("@/store/address-context");
jest.mock("react-toastify", () => ({
  toast: { info: jest.fn(), error: jest.fn() },
}));

// UI 관련 컴포넌트는 간단히 mock
jest.mock("@/components/payment/checkout-btn", () => () => (
  <button>결제하기</button>
));
jest.mock("@/components/checkout/newaddress", () => () => (
  <div>New Address Form</div>
));
jest.mock("@/components/checkout/address-selection", () => () => (
  <div>Address Selection</div>
));

jest.mock("next/navigation", () => {
  const actual = jest.requireActual("next/navigation");
  return {
    ...actual,
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
  };
});

const mockSearchParams = {
  get: (key: string) => {
    if (key === "ids") return "all";
    return null;
  },
};

const mockSession = {
  data: {
    user: {
      username: "테스트 유저",
      mobile: "010-1234-5678",
    },
  },
  status: "authenticated",
};

const mockAddresses = [
  {
    id: 1,
    addressname: "기본 배송지",
    address: "서울시 강남구",
    detailAddress: "101호",
    addressmobile: "010-1111-2222",
    isDefault: true,
  },
];

const mockCartItems = [
  {
    id: 100,
    title: "테스트 상품",
    image: "/test.jpg",
    price: 10000,
    quantity: 2,
  },
];

describe("CheckoutPage", () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue(mockSession);
    (useCart as jest.Mock).mockReturnValue({ cartItems: mockCartItems });
    (useAddress as jest.Mock).mockReturnValue({
      addresses: mockAddresses,
      fetchAddresses: jest.fn(),
    });

    (nextNavigation.useSearchParams as jest.Mock).mockReturnValue(
      mockSearchParams
    );
    (nextNavigation.useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
      back: mockBack,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("checkout 페이지 기본 렌더링", async () => {
    render(<CheckoutPage />);

    await waitFor(() => {
      expect(screen.getByText("결제 페이지")).toBeInTheDocument();
    });

    expect(screen.getByText("배송지 정보")).toBeInTheDocument();
    expect(screen.getByText("상품 정보")).toBeInTheDocument();
    expect(screen.getByText("테스트 상품 x 2")).toBeInTheDocument();
    expect(screen.getByText("결제하기")).toBeInTheDocument();
  });

  test("비로그인 상태일 경우 로그인 페이지로 리디렉션", async () => {
    (useSession as jest.Mock).mockReturnValue({ status: "unauthenticated" });

    render(<CheckoutPage />);
    expect(mockReplace).toHaveBeenCalledWith("/login");
  });

  test("신규 배송지 입력 클릭 시 NewAddressForm 렌더링", async () => {
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
