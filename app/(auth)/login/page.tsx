"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/Auth-content";

import Link from "next/link";
import "./login.css";

export default function login() {
  const { setUser } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      // const errorText = await response.text();
      // console.log("로그인 실패", errorText);
    } else {
      setUser(data);
      console.log("로그인 성공:", data.user);
      // 로그인 성공 시, 사용자의 정보를 저장하거나 리디렉션 처리
      router.push("/myshop");
    }
  };

  return (
    <section className="login w-full min-h-screen mt-10 relative">
      <div className="absolute w-[100%] xl:left-[40%] xl:w-[60%] px-5">
        <div className="login-heading py-8 border-b-1 border-b-[#9e9e9e] mb-8">
          <p className="text-4xl font-serif">Log In</p>
        </div>
        <div className="login-form-wrap">
          <form onSubmit={handleLogin} className="space-y-4 w-full">
            <div>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Email"
                className="text-xl bg-[#ffffff]"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
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
            <button
              type="submit"
              className="login_btn text-3xl w-full py-3 my-2 font-serif bg-[#313030] text-[#f2f0eb]"
            >
              Log In
            </button>
          </form>
          <div className="mt-20 py-4 border-t-1 border-t-[#9e9e9e]">
            <p className="text-4xl font-serif my-2">Sign Up</p>
            <span className="signup-link">
              <Link
                href="/signup"
                type="submit"
                className="signup_btn text-3xl py-4 my-4 font-serif bg-[#313030] text-[#f2f0eb] block w-full text-center"
              >
                Create Account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
