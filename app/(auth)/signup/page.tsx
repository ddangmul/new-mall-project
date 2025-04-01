"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import "./signup.css";
import { signIn } from "next-auth/react";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    passwordCk: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    isSolar: false,
    isLunar: false,
    mobile1: "",
    mobile2: "",
    mobile3: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.passwordCk) {
      console.error("비밀번호가 일치하지 않습니다.");
      return;
    }

    const mobileNumber = `${formData.mobile1}-${formData.mobile2}-${formData.mobile3}`;

    const formattedData = {
      ...formData,
      mobile: mobileNumber,
    };

    try {
      console.log("보내는 데이터:", formattedData);

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "회원가입 실패");

      alert("회원가입 성공!");
      router.push("/login"); // 로그인 페이지로 이동
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login w-full min-h-screen mt-10 relative">
      <div className="absolute w-[100%] xl:left-[40%] xl:w-[60%] px-5">
        <div className="signup-heading py-8 border-b-1 border-b-[#9e9e9e] mb-8">
          <p className="text-4xl font-serif">Sign Up</p>
        </div>

        <div className="signup-form-wrap">
          <form
            method="post"
            onSubmit={handleSignup}
            className="space-y-4 w-full"
          >
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div>
              <label
                htmlFor="email"
                className="hidden text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Email"
                className="text-xl bg-[#ffffff]"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="hidden text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="이름"
                required
                value={formData.username}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="hidden text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                placeholder="Password"
                className="text-xl"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                id="passwordCk"
                type="password"
                name="passwordCk"
                required
                placeholder="Password Check"
                className="text-xl"
                value={formData.passwordCk}
                onChange={handleChange}
              />
            </div>
            <div className="mobile flex justify-between gap-2 items-center">
              <select
                name="mobile1"
                id="mobile1"
                className="basis-1/3"
                required
                value={formData.mobile1}
                onChange={(e) =>
                  setFormData({ ...formData, mobile1: e.target.value })
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
                id="mobile2"
                name="mobile2"
                className="basis-1/3"
                required
                value={formData.mobile2}
                onChange={handleChange}
              />
              -
              <input
                type="text"
                id="mobile3"
                name="mobile3"
                className="basis-1/3"
                required
                value={formData.mobile3}
                onChange={handleChange}
              />
            </div>
            {/* <div className="address space-y-4">
              <span className="flex justify-between items-center gap-4 h-13">
                <input type="number" placeholder="우편번호" required />
                <button className="w-[6rem]">우편번호</button>
              </span>
              <input type="text" placeholder="기본주소" required />
              <input type="text" placeholder="나머지주소" />
            </div> */}
            <div className="flex justify-between gap-6 pr-4">
              <span className="basis-1/3 flex items-center gap-3">
                <label
                  htmlFor="birthYear"
                  className="hidden text-sm font-medium text-gray-700"
                >
                  BirthYear
                </label>
                <input
                  id="birthYear"
                  type="text"
                  name="birthYear"
                  placeholder="출생년도"
                  value={formData.birthYear}
                  onChange={handleChange}
                />
                년
              </span>
              <span className="basis-1/3 flex items-center gap-3">
                <label
                  htmlFor="birthMonth"
                  className="hidden text-sm font-medium text-gray-700"
                >
                  BirthMonth
                </label>
                <input
                  id="birthMonth"
                  type="text"
                  name="birthMonth"
                  placeholder="출생월"
                  value={formData.birthMonth}
                  onChange={handleChange}
                />
                월
              </span>
              <span className="basis-1/3 flex items-center gap-3">
                <label
                  htmlFor="birthDay"
                  className="hidden text-sm font-medium text-gray-700"
                >
                  BirthDay
                </label>
                <input
                  id="birthDay"
                  type="text"
                  name="birthDay"
                  placeholder="출생일"
                  value={formData.birthDay}
                  onChange={handleChange}
                />
                일
              </span>
            </div>
            <div className="isSoL flex">
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isSolar"
                  id="solar"
                  checked={formData.isSolar}
                  onChange={handleChange}
                />
                <label className="w-20" htmlFor="solar">
                  양력
                </label>
              </span>
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isLunar"
                  id="lunar"
                  checked={formData.isLunar}
                  onChange={handleChange}
                />
                <label className="w-20" htmlFor="lunar">
                  음력
                </label>
              </span>
            </div>
            <button
              type="submit"
              className="signup_btn text-2xl w-full py-3 my-6 bg-[#313030] text-[#f2f0eb]"
              disabled={loading}
            >
              {loading ? "가입 중..." : "회원가입"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
