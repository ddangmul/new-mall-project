"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import PageTitle from "@/components/page-title";

import Link from "next/link";
import "./login.css";

export default function Login() {
  const BTN_CSS =
    "flex items-center justify-center gap-2 login_btn text-md md:text-lg lg:text-xl w-full py-2 lg:py-3 my-2  bg-[#313030] text-[#f2f0eb]";
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
    <div className="absolute w-[100%] xl:left-[40%] xl:w-[60%] px-5">
      <PageTitle children="LogIn" />
      <div className="login-form-wrap">
        <form onSubmit={handleLogin} className="space-y-4 w-full">
          {error && <p className="text-[#7c1414] text-sm my-2 lx-2">{error}</p>}
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
              className="text-sm md:text-lg lg:text-xl"
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
              className="text-sm md:text-lg lg:text-xl"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className={BTN_CSS}>
            {loading ? "loading..." : "이메일계정 로그인"}
          </button>
        </form>
        <button onClick={() => signIn("google")} className={BTN_CSS}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="w-6 h-6"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
            ></path>
            <path
              fill="#4CAF50"
              d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
            ></path>
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
            ></path>
          </svg>
          {loading ? "loading..." : "구글계정 로그인"}
        </button>
        <button onClick={() => signIn("kakao")} className={BTN_CSS}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.036 2C6.49 2 2 5.583 2 9.944c0 2.64 1.889 4.975 4.737 6.337l-.5 3.14a.4.4 0 0 0 .593.414l3.643-2.01c.834.122 1.69.185 2.563.185 5.547 0 10.037-3.583 10.037-7.944S17.583 2 12.036 2Z"
            />
          </svg>
          {loading ? "loading..." : "카카오계정 로그인하기"}
        </button>
        <div className="mt-20 py-4 border-t-1 border-t-[#9e9e9e]">
          <p className=" text-xl md:text-2xl lg:text-3xl font-serif lg:my-2">
            Sign Up
          </p>
          <span className="signup-link">
            <Link
              href="/signup"
              type="submit"
              className="signup_btn text-md md:text-lg lg:text-xl py-3 lg:py-4 my-4 bg-[#313030] text-[#f2f0eb] block w-full text-center"
            >
              회원가입
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
