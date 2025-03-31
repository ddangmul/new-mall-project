import { useRouter } from "next/navigation";

import "./modify.css";

export default function RegisterAddress() {
  const router = useRouter();
  return (
    <section className="register-address my-8">
      <h1 className="text-xl">배송지 등록</h1>
      <div className="address_register my-5 rounded-xl">
        <form action="/" className="space-y-3">
          <div>
            <input type="text" placeholder="이름" required />
          </div>
          <div className="space-y-3">
            <span className="flex gap-2">
              <input type="number" placeholder="우편번호" required />
              <button className="p-8">우편번호</button>
            </span>
            <input type="text" placeholder="기본주소" required />
            <input type="text" placeholder="나머지주소" />
          </div>
          <div className="mobile flex justify-between gap-2 items-center">
            <select name="mobile[]" id="mobile1" className="basis-1/3" required>
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
              id="mobile2"
              name="mobile[]"
              className="basis-1/3"
              required
            />
            -
            <input
              type="text"
              id="mobile3"
              name="mobile[]"
              className="basis-1/3"
              required
            />
          </div>
          <div className="flex items-center gap-2 w-full">
            <input type="checkbox" id="defaultAddress" />
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
