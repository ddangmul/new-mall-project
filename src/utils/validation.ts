export const validateMobileNumber = (
  mobile1: string,
  mobile2: string,
  mobile3: string
) => {
  const mobileRegex = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/;
  const mobileNumber = `${mobile1}-${mobile2}-${mobile3}`;

  return { result: mobileRegex.test(mobileNumber), mobileNumber };
};

export const validateNewAddress = (newAddress) => {
  const {
    addressname,
    postcode,
    address,
    addressMobile1,
    addressMobile2,
    addressMobile3,
  } = newAddress;

  if (!addressname.trim()) {
    console.log("이름을 입력해주세요.");
    return false;
  }

  if (!postcode.trim()) {
    console.log("우편번호를 입력해주세요.");
    return false;
  }

  if (!address.trim()) {
    console.log("기본주소를 입력해주세요.");
    return false;
  }

  const { result } = validateMobileNumber(
    addressMobile1,
    addressMobile2,
    addressMobile3
  );

  console.log(result);

  if (!result) {
    console.log("휴대폰 번호 형식이 올바르지 않습니다.");
    return false;
  }

  return true;
};
