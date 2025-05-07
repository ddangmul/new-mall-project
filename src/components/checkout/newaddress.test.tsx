import { render, screen, fireEvent } from "@testing-library/react";
import NewAddressForm from "./newaddress"; // 경로에 맞게 수정
import "@testing-library/jest-dom";

describe("NewAddressForm", () => {
  const mockAddress = {
    addressname: "집",
    postcode: "12345",
    address: "서울시 종로구",
    detailAddress: "101호",
    addressMobile1: "010",
    addressMobile2: "1234",
    addressMobile3: "5678",
  };

  const handleNewAddressChange = jest.fn();
  const handleNewAddressMobileChange = jest.fn();

  beforeEach(() => {
    render(
      <NewAddressForm
        newAddress={mockAddress}
        handleNewAddressChange={handleNewAddressChange}
        handleNewAddressMobileChange={handleNewAddressMobileChange}
      />
    );
  });

  test("모든 입력 필드 렌더링", () => {
    expect(screen.getByPlaceholderText("이름")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("우편번호")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("기본주소")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("나머지주소 (선택)")
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("010")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1234")).toBeInTheDocument();
    expect(screen.getByDisplayValue("5678")).toBeInTheDocument();
  });

  test("입력값 변경 시 핸들러 호출", () => {
    const nameInput = screen.getByPlaceholderText("이름");
    fireEvent.change(nameInput, { target: { value: "회사" } });
    expect(handleNewAddressChange).toHaveBeenCalled();

    const mobileSelect = screen.getByDisplayValue("010");
    fireEvent.change(mobileSelect, { target: { value: "011" } });
    expect(handleNewAddressMobileChange).toHaveBeenCalled();
  });
});
