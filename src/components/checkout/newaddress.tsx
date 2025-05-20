import React from "react";

interface NewAddressFormProps {
  newAddress: {
    addressname: string;
    postcode: string;
    address: string;
    detailAddress: string;
    addressMobile1: string;
    addressMobile2: string;
    addressMobile3: string;
  };
  handleNewAddressChange: (e) => void;
  handleNewAddressMobileChange: (e) => void;
}

const NewAddressForm = React.memo(function NewAddressForm({
  newAddress,
  handleNewAddressChange,
  handleNewAddressMobileChange,
}: NewAddressFormProps) {
  const INPUT_CSS = "w-full bg-[#fff] p-2 rounded-xs";
  return (
    <div className="space-y-2 text-sm md:text-md lg:text-lg">
      <input
        name="addressname"
        type="text"
        placeholder="이름"
        required
        value={newAddress.addressname}
        onChange={handleNewAddressChange}
        autoComplete="off"
        className={INPUT_CSS}
      />
      <span className="flex justify-between items-center gap-2">
        <input
          name="postcode"
          type="text"
          placeholder="우편번호"
          required
          value={newAddress.postcode}
          onChange={handleNewAddressChange}
          autoComplete="off"
          className={INPUT_CSS}
        />
        <button className="w-[6rem]">우편번호</button>
      </span>
      <input
        name="address"
        type="text"
        placeholder="기본주소"
        required
        value={newAddress.address}
        onChange={handleNewAddressChange}
        autoComplete="off"
        className={INPUT_CSS}
      />

      <input
        name="detailAddress"
        type="text"
        placeholder="나머지주소 (선택)"
        value={newAddress.detailAddress}
        onChange={handleNewAddressChange}
        autoComplete="off"
        className={INPUT_CSS}
      />
      <div className="mobile flex justify-between gap-2 items-center">
        <select
          name="addressMobile1"
          id="addressMobile1"
          className="basis-1/3"
          required
          value={newAddress.addressMobile1}
          onChange={handleNewAddressMobileChange}
        >
          <option value="">(선택)</option>
          <option value="010">010</option>
          <option value="011">011</option>
          <option value="016">016</option>
          <option value="017">017</option>
          <option value="018">018</option>
          <option value="019">019</option>
        </select>
        -
        <input
          type="text"
          id="addressMobile2"
          name="addressMobile2"
          className={`basis-1/3 ${INPUT_CSS}`}
          required
          value={newAddress.addressMobile2}
          onChange={handleNewAddressMobileChange}
          autoComplete="off"
        />
        -
        <input
          type="text"
          id="addressMobile3"
          name="addressMobile3"
          className={`basis-1/3 ${INPUT_CSS}`}
          required
          value={newAddress.addressMobile3}
          onChange={handleNewAddressMobileChange}
          autoComplete="off"
        />
      </div>
    </div>
  );
});

export default NewAddressForm;
