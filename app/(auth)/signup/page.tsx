"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateMobileNumber } from "@/utils/validation";

import "./signup.css";

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    passwordCk: "",
    birthdate: "",
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
    const { name, value, type } = e.target;

    // // 체크박스인 경우에는 HTMLInputElement로 단언 후 checked 사용
    const isCheckbox = type === "checkbox";
    const checked = isCheckbox && (e.target as HTMLInputElement).checked;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) {
      setError("");
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.passwordCk) {
      setError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    const { mobile1, mobile2, mobile3 } = formData;

    if (!validateMobileNumber(mobile1, mobile2, mobile3)?.result) {
      setError("전화번호는 010-1234-5678 형식이어야 합니다.");
      setLoading(false);
      return;
    }

    const formattedData = {
      ...formData,
      mobile: `${mobile1}-${mobile2}-${mobile3}`,
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || "회원가입 실패");
      }
      router.push("/login"); // 로그인 페이지로 이동
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // 에러 메시지 설정
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
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
            role="form"
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
                autoComplete="off"
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
                autoComplete="off"
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
                autoComplete="off"
                data-testid="mobile2"
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
                autoComplete="off"
                data-testid="mobile3"
              />
            </div>
            <div className="flex justify-between gap-4">
              <span className="basis-3/5 flex items-center gap-3">
                <label
                  htmlFor="birthdate"
                  className="text-gray-700 min-w-20 text-md"
                >
                  생년월일
                </label>
                <input
                  id="birthdate"
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                />
              </span>
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
            </div>
            <button
              type="submit"
              className="signup_btn text-2xl w-full py-3 my-6 bg-[#313030] text-[#f2f0eb]"
            >
              {loading ? "가입 중..." : "회원가입"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
