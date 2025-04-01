"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import "./modify.css";

export default function RegisterAddress() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    addressName: "",
  });

  return (
    <section className="register-address my-8">
      <h1 className="text-xl">배송지 등록</h1>
      <div className="address_register my-5 rounded-xl">
        <form className="space-y-3">
          <div>
            <input name="addressName" type="text" placeholder="이름" required />
          </div>
          <div className="space-y-3">
            <span className="flex justify-between items-center gap-4 h-13">
              <input
                name="postcode"
                type="text"
                placeholder="우편번호"
                required
              />
              <button className="w-[6rem]">우편번호</button>
            </span>
            <input
              name="address1"
              type="text"
              placeholder="기본주소"
              required
            />
            <input name="address2" type="text" placeholder="나머지주소" />
          </div>
          <div className="mobile flex justify-between gap-2 items-center">
            <select
              name="addressMobile1"
              id="addressMobile1"
              className="basis-1/3"
              required
            >
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
            />
            -
            <input
              type="text"
              id="addressMobile3"
              name="addressMobile3"
              className="basis-1/3"
              required
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            <input name="isDefault" type="checkbox" id="defaultAddress" />
            <label>기본 배송지로 저장</label>
          </div>
        </form>
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
        <button className="px-6 py-2 rounded-sm bg-[#2d2c2a] text-[#d6d2c8]">
          등록
        </button>
      </div>
    </section>
  );
}
