"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useAuth } from "@/store/Auth-context";

import Link from "next/link";
import "./login.css";

export default function login() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (res?.error) {
      console.error("로그인 실패:", res.error);
    } else {
      router.push("/myshop"); // 로그인 성공 후 이동할 페이지
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/myshop");
    }
  }, [user]);

  return (
    <section className="login w-full min-h-screen mt-10 relative">
      <div className="absolute w-[100%] xl:left-[40%] xl:w-[60%] px-5">
        <div className="login-heading py-8 border-b-1 border-b-[#9e9e9e] mb-8">
          <p className="text-4xl font-serif">Log In</p>
        </div>
        <div className="login-form-wrap">
          <form onSubmit={handleLogin} className="space-y-4 w-full">
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
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
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
