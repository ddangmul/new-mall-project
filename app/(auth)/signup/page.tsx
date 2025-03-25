"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import "./signup.css";
import { signIn } from "next-auth/react";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordCk: "",
    username: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    isSolar: false,
    isLunar: false,
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.passwordCk) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const response = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      username: formData.username,
      birthYear: formData.birthYear,
      birthMonth: formData.birthMonth,
      birthDay: formData.birthDay,
      redirect: false,
    });

    if (response?.error) {
      console.error("로그인 실패:", response.error);
    } else {
      router.push("/myshop"); // 로그인 성공 후 이동할 페이지
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
            <div className="flex">
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
              className="signup_btn text-4xl font-serif w-full py-3 my-6 bg-[#313030] text-[#f2f0eb]"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
