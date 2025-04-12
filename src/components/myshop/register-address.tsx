"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAddress } from "@/store/address-context";

import "./modify.css";
import { AddressInput } from "../../../types/types";

export default function RegisterAddress() {
  const { addAddress } = useAddress();
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    userId: "",
    addressname: "",
    postcode: "",
    address: "",
    detailAddress: "",
    addressMobile1: "",
    addressMobile2: "",
    addressMobile3: "",
    isDefault: false,
  });

  // 세션 업데이트되면 userId 설정
  useEffect(() => {
    if (session?.user?.id) {
      setFormData((prev) => ({
        ...prev,
        userId: session.user.id,
      }));
    }
  }, [session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // // 체크박스인 경우에는 HTMLInputElement로 단언 후 checked 사용
    // const isCheckbox = type === "checkbox";
    // const checked = isCheckbox && (e.target as HTMLInputElement).checked;

    // 체크박스일 경우에만 checked값을 따로 추출
    // const newValue =
    //   type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const addressMobile = `${formData.addressMobile1}-${formData.addressMobile2}-${formData.addressMobile3}`;

    const formattedData: AddressInput = {
      ...formData,
      addressmobile: addressMobile,
    };
    console.log("등록 전 데이터 👉", formattedData); // 여기에 isDefault 확인
    await addAddress(formattedData);
    router.push("/myshop?address=&mode=member&mode2=address");
  };

  return (
    <section className="register-address my-8">
      <h1 className="text-xl">배송지 등록</h1>
      <div className="address_register my-5 rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              name="addressname"
              type="text"
              placeholder="이름"
              required
              value={formData.addressname}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-3">
            <span className="flex justify-between items-center gap-4 h-13">
              <input
                name="postcode"
                type="text"
                placeholder="우편번호"
                required
                value={formData.postcode}
                onChange={handleChange}
              />
              <button className="w-[6rem]">우편번호</button>
            </span>
            <input
              name="address"
              type="text"
              placeholder="기본주소"
              required
              value={formData.address}
              onChange={handleChange}
            />

            <input
              name="detailAddress"
              type="text"
              placeholder="나머지주소"
              value={formData.detailAddress}
              onChange={handleChange}
            />
          </div>
          <div className="mobile flex justify-between gap-2 items-center">
            <select
              name="addressMobile1"
              id="addressMobile1"
              className="basis-1/3"
              required
              value={formData.addressMobile1}
              onChange={(e) =>
                setFormData({ ...formData, addressMobile1: e.target.value })
              }
            >
              <option value="">선택</option>
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
              className="basis-1/3"
              required
              value={formData.addressMobile2}
              onChange={handleChange}
            />
            -
            <input
              type="text"
              id="addressMobile3"
              name="addressMobile3"
              className="basis-1/3"
              required
              value={formData.addressMobile3}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            <input
              name="isDefault"
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isDefault: e.target.checked,
                }))
              }
            />
            <label>기본 배송지로 저장</label>
          </div>
          <div className="adress_action_btn flex justify-between mt-8">
            <button
              onClick={() => {
                router.push("/myshop?mode=member&mode2=address");
              }}
              className="address_action px-6 py-2 rounded-sm bg-[#e6e2de] text-[#2d2c2a]"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-sm bg-[#2d2c2a] text-[#d6d2c8]"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
