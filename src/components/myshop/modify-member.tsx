import "./modify.css";
export default function ModifyMember() {
  return (
    <section className="modify-member border-b-1 pb-12 border-b-[#a9a9a9] mt-10">
      <form className="space-y-3">
        <div>
          <input type="text" placeholder="이름" required />
        </div>
        <div className="space-y-3">
          <span className="flex gap-2">
            <input type="number" placeholder="우편번호" required />
            <button className="w-30">우편번호</button>
          </span>
          <input type="text" placeholder="기본주소" required />
          <input type="text" placeholder="나머지주소" />
        </div>
        <div className="phone flex justify-between gap-2 items-center">
          <select name="phone[]" id="phone1" className="basis-1/3">
            <option value="02">02</option>
            <option value="031">031</option>
            <option value="032">032</option>
            <option value="033">033</option>
            <option value="041">041</option>
            <option value="042">042</option>
            <option value="043">043</option>
            <option value="044">044</option>
            <option value="051">051</option>
            <option value="052">052</option>
            <option value="053">053</option>
          </select>
          -
          <input type="text" id="phone2" name="phone[]" className="basis-1/3" />
          -
          <input type="text" id="phone3" name="phone[]" className="basis-1/3" />
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
        <div>
          <input type="email" placeholder="email" required />
        </div>
        <div className="flex justify-between gap-3">
          <span className="basis-1/3 flex items-center gap-3">
            <input type="text" placeholder="출생년도" />년
          </span>
          <span className="basis-1/3 flex items-center gap-3">
            <input type="text" placeholder="출생월" />월
          </span>
          <span className="basis-1/3 flex items-center gap-3">
            <input type="text" placeholder="출생일" />일
          </span>
        </div>
        <div className="flex">
          <span className="flex items-center gap-2">
            <input type="checkbox" id="solar" />
            <label className="w-20">양력</label>
          </span>
          <span className="flex items-center gap-2">
            <input type="checkbox" id="lunar" />
            <label className="w-20">음력</label>
          </span>
        </div>
      </form>
    </section>
  );
}
