"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateMobileNumber } from "@/utils/validation";

import "./signup.css";
import PageTitle from "@/components/page-title";

const TEXT_CSS = "text-xs md:text-md lg:text-lg";

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
    <div
      className={`absolute w-[100%] xl:left-[40%] xl:w-[60%] px-5 ${TEXT_CSS}`}
    >
      <PageTitle children="SignUp" />
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
              <label htmlFor="birthdate" className="whitespace-nowrap px-1">
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
            <div className="w-full flex justify-between">
              <span className="flex items-center lg:gap-2 basis-1/2">
                <input
                  type="checkbox"
                  name="isSolar"
                  id="solar"
                  checked={formData.isSolar}
                  onChange={handleChange}
                  className="w-3 h-3 md:w-4 md:h-4"
                />
                <label
                  className="text-xs md:text-md lg:text-lg whitespace-nowrap"
                  htmlFor="solar"
                >
                  양력
                </label>
              </span>
              <span className="flex items-center lg:gap-2 basis-1/2">
                <input
                  type="checkbox"
                  name="isLunar"
                  id="lunar"
                  checked={formData.isLunar}
                  onChange={handleChange}
                  className="w-3 h-3 md:w-4 md:h-4"
                />
                <label
                  className="text-xs md:text-md lg:text-lg whitespace-nowrap"
                  htmlFor="lunar"
                >
                  음력
                </label>
              </span>
            </div>
          </div>
          <button
            type="submit"
            className={`${TEXT_CSS} w-full py-2 md:py-3 bg-foreground text-background mt-4 md:mt-8 cursor-pointer`}
          >
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </form>
      </div>
    </div>
  );
}
