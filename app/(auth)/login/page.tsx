"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Link from "next/link";
import "./login.css";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setLoading(false);
    if (error) {
      setError(null);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (res?.error) {
      setError("이메일 또는 비밀번호가 잘못되었습니다.");
    } else {
      sessionStorage.setItem("isLoggedIn", "true");
      router.push("/myshop");
      setLoading(false);
    }
  };

  return (
    <section className="login w-full min-h-screen mt-10 relative">
      <div className="absolute w-[100%] xl:left-[40%] xl:w-[60%] px-5">
        <div className="login-heading py-8 border-b-1 border-b-[#9e9e9e] mb-8">
          <p className="text-3xl font-serif">Log In</p>
        </div>
        <div className="login-form-wrap">
          <form onSubmit={handleLogin} className="space-y-4 w-full">
            {error && (
              <p className="text-[#7c1414] text-sm my-2 lx-2">{error}</p>
            )}
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
                autoComplete="off"
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
              className="login_btn text-2xl w-full py-3 my-2 font-serif bg-[#313030] text-[#f2f0eb]"
            >
              {loading ? "loading..." : "LogIn"}
            </button>
          </form>
          <button
            onClick={() => signIn("google")}
            className="login_btn text-2xl w-full py-3 my-2 font-serif bg-[#313030] text-[#f2f0eb]"
          >
            {loading ? "loading..." : "Google LogIn"}
          </button>
          <button
            onClick={() => signIn("kakao")}
            className="login_btn text-2xl w-full py-3 my-2 font-serif bg-[#313030] text-[#f2f0eb]"
          >
            {loading ? "loading..." : "Kakao LogIn"}
          </button>
          <div className="mt-20 py-4 border-t-1 border-t-[#9e9e9e]">
            <p className="text-3xl font-serif my-2">Sign Up</p>
            <span className="signup-link">
              <Link
                href="/signup"
                type="submit"
                className="signup_btn text-2xl py-4 my-4 font-serif bg-[#313030] text-[#f2f0eb] block w-full text-center"
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
