import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddressSelection from "./address-selection";
import { toast } from "react-toastify";

// toast.info 모킹
jest.mock("react-toastify", () => ({
  toast: {
    info: jest.fn(),
  },
}));

describe("AddressSelection", () => {
  const mockOnSelectAddress = jest.fn();
  const mockSetIsAddressOpen = jest.fn();

  const addresses = [
    {
      id: 1,
      addressname: "주소 1",
      address: "서울특별시",
      detailAddress: "서울시 강남구",
      addressmobile: "010-1234-5678",
      isDefault: false,
    },
    {
      id: 2,
      addressname: "주소 2",
      address: "경기도",
      detailAddress: "경기도 성남시",
      addressmobile: "010-2345-6789",
      isDefault: true,
    },
  ];

  const selectedAddress = addresses[1]; // 기본 주소

  test("기본 배송지가 있을 경우 정상 렌더링", async () => {
    render(
      <AddressSelection
        form={{ address: selectedAddress }}
        addresses={addresses}
        selectedAddress={selectedAddress}
        onSelectAddress={mockOnSelectAddress}
        setIsAddressOpen={mockSetIsAddressOpen}
        isAddressOpen={false}
      />
    );

    // 선택된 주소가 화면에 렌더링 되는지 확인
    expect(screen.getByText("주소 2")).toBeInTheDocument();
    expect(screen.getByText(/경기도/)).toBeInTheDocument();
    expect(screen.getByText("010-2345-6789")).toBeInTheDocument();

    // '기본' 텍스트가 보여지는지 확인
    expect(screen.getByText("기본")).toBeInTheDocument();
  });

  test("isAddressOpen이 false일 때 '전체 배송지 보기' 버튼 렌더링 & 버튼 클릭 시 setIsAddressOpen 호출", async () => {
    render(
      <AddressSelection
        form={{ address: selectedAddress }}
        addresses={addresses}
        selectedAddress={selectedAddress}
        onSelectAddress={mockOnSelectAddress}
        setIsAddressOpen={mockSetIsAddressOpen}
        isAddressOpen={false}
      />
    );

    const toggleButton = screen.getByRole("button", {
      name: /전체 배송지 보기/,
    });

    // '전체 배송지 보기' 버튼이 존재하는지 확인
    expect(toggleButton).toBeInTheDocument();

    // 버튼 클릭 후, isAddressOpen을 변경하도록 mock 함수가 호출되는지 확인
    fireEvent.click(toggleButton);
    await waitFor(() => {
      expect(mockSetIsAddressOpen).toHaveBeenCalled();
    });
  });

  test("isAddressOpen이 true일 때 배송지 목록 렌더링", async () => {
    render(
      <AddressSelection
        form={{ address: selectedAddress }}
        addresses={addresses}
        selectedAddress={selectedAddress}
        onSelectAddress={mockOnSelectAddress}
        setIsAddressOpen={mockSetIsAddressOpen}
        isAddressOpen={true}
      />
    );

    // 주소 목록이 보여지는지 확인
    const allAddresses = screen.getAllByText((text) => text.includes("주소"));
    expect(allAddresses.length).toBeGreaterThan(0);
  });

  it("배송지 선택 시 onSelectAddress 호출 & toast.info 호출", async () => {
    render(
      <AddressSelection
        form={{ address: selectedAddress }}
        addresses={addresses}
        selectedAddress={selectedAddress}
        onSelectAddress={mockOnSelectAddress}
        setIsAddressOpen={mockSetIsAddressOpen}
        isAddressOpen={true}
      />
    );

    // 첫 번째 주소 선택
    fireEvent.click(screen.getByText("주소 1"));

    // onSelectAddress 함수가 호출되는지 확인
    await waitFor(() => {
      expect(mockOnSelectAddress).toHaveBeenCalledWith(addresses[0]);
    });

    // toast가 호출되었는지 확인
    expect(toast.info).toHaveBeenCalledWith("주소 1 배송지를 선택했습니다.");
  });

  it("저장된 배송지가 없을 경우 '등록된 배송지가 없습니다.' 문구 렌더링", async () => {
    render(
      <AddressSelection
        form={{ address: null }}
        addresses={addresses}
        selectedAddress={null}
        onSelectAddress={mockOnSelectAddress}
        setIsAddressOpen={mockSetIsAddressOpen}
        isAddressOpen={false}
      />
    );

    // '등록된 배송지가 없습니다.' 문구가 화면에 표시되는지 확인
    expect(screen.getByText("등록된 배송지가 없습니다.")).toBeInTheDocument();
  });
});
