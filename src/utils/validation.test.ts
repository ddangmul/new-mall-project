import { validateMobileNumber, validateNewAddress } from "./validation";

describe("validateMobildNumber", () => {
  test("정상적인 전화번호 형식일 경우 true 반환", () => {
    const { result, mobileNumber } = validateMobileNumber(
      "010",
      "1234",
      "5678"
    );
    expect(result).toBe(true);
    expect(mobileNumber).toBe("010-1234-5678");
  });

  test("형식이 잘못된 전화번호일 경우 false 반환", () => {
    const { result } = validateMobileNumber("010", "12a4", "5678");
    expect(result).toBe(false);
  });

  test("올바른 자릿수가 아닌 경우 false 반환", () => {
    const { result } = validateMobileNumber("010", "123", "567");
    expect(result).toBe(false);
  });
});

describe("validateNewAddress", () => {
  const baseAddress = {
    addressname: "테스트유저",
    postcode: "12345",
    address: "서울시 강남구",
    addressMobile1: "010",
    addressMobile2: "1234",
    addressMobile3: "5678",
  };

  it("모든 항목이 유효한 경우 true 반환", () => {
    const result = validateNewAddress(baseAddress);
    expect(result).toBe(true);
  });

  it("이름이 비어 있으면 false 반환", () => {
    const invalid = { ...baseAddress, addressname: "   " };
    const result = validateNewAddress(invalid);
    expect(result).toBe(false);
  });

  it("우편번호가 비어 있으면 false 반환", () => {
    const invalid = { ...baseAddress, postcode: "" };
    const result = validateNewAddress(invalid);
    expect(result).toBe(false);
  });

  it("기본주소가 비어 있으면 false 반환", () => {
    const invalid = { ...baseAddress, address: " " };
    const result = validateNewAddress(invalid);
    expect(result).toBe(false);
  });

  it("전화번호가 유효하지 않으면 false 반환", () => {
    const invalid = { ...baseAddress, addressMobile2: "12a4" };
    const result = validateNewAddress(invalid);
    expect(result).toBe(false);
  });
});
