import Link from "next/link";
import "./login.css";

export default function login() {
  return (
    <section className="login w-full min-h-screen mt-36 relative">
      <div className="absolute w-[100%] xl:left-[40%] xl:w-[60%] px-5">
        <div className="login-heading py-8 border-b-1 border-b-[#9e9e9e] mb-8">
          <p className="text-4xl font-serif">Log In</p>
        </div>
        <div className="login-form-wrap">
          <form method="post" className="space-y-4 w-full">
            <div>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Email"
                className="text-xl bg-[#ffffff]"
                autoComplete="email"
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
