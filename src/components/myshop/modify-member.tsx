"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import "./modify.css";
export default function ModifyMember() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user; // session에서 user 정보 가져오기

  useEffect(() => {
    // 세션이 없으면 로그인 페이지로 리디렉션
    if (!session) {
      router.push("/login"); // 로그인 페이지로 리디렉션
    }
  }, [session, router]);

  const [formData, setFormData] = useState({
    // useremail: "",
    // mobile1: "",
    // mobile2: "",
    // mobile3: "",
    // birthdate: "",
    old_pw: "",
    new_pw: "",
    new_pw_ck: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("보내는 데이터:", formData);

    if (formData.new_pw !== formData.new_pw_ck) {
      setError("비밀번호 미일치");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "회원정보 수정 실패");

      alert("회원정보 수정 성공!");
      await signOut({ callbackUrl: "/login" });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="modify-member pb-12 mt-10">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="username"
            value={user.username}
            placeholder="이름"
            disabled
          />
        </div>
        <div>
          <input
            type="email"
            name="useremail"
            placeholder="email"
            value={user.email}
            disabled
          />
        </div>
        <div className="phone flex justify-between gap-2 items-center">
          <input
            type="text"
            name="mobile1"
            id="mobile1"
            className="basis-1/3"
            value={user.mobile.split("-")[0]}
            disabled
          ></input>
          -
          <input
            type="text"
            id="mobile2"
            name="mobile2"
            className="basis-1/3"
            value={user.mobile.split("-")[1]}
            disabled
          />
          -
          <input
            type="text"
            id="mobile3"
            name="mobile3"
            className="basis-1/3"
            value={user.mobile.split("-")[2]}
            disabled
          />
        </div>
        <div className="birthdate flex justify-between gap-3">
          <span className="basis-1/3 flex items-center gap-3">
            <input
              name="birthYear"
              type="text"
              placeholder="출생년도"
              value={user.birthdate.split("-")[0]}
              disabled
            />
            년
          </span>
          <span className="basis-1/3 flex items-center gap-3">
            <input
              name="birthMonth"
              type="text"
              placeholder="출생월"
              value={user.birthdate.split("-")[1]}
              disabled
            />
            월
          </span>
          <span className="basis-1/3 flex items-center gap-3">
            <input
              name="birthDay"
              type="text"
              placeholder="출생일"
              value={user.birthdate.split("-")[2]}
              disabled
            />
            일
          </span>
        </div>
        <div className="mt-8 space-y-3">
          <h2 className="text-xl mb-6">비밀번호 변경</h2>
          <input
            type="text"
            id="oldPw"
            name="old_pw"
            placeholder="기존 비밀번호"
            onChange={handleChange}
          />
          <div>
            <input
              type="text"
              id="newPw"
              name="new_pw"
              placeholder="변경할 비밀번호"
              onChange={handleChange}
            />
            <p className="text-sm mt-2">
              영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자
            </p>
          </div>
          <div>
            <input
              type="text"
              id="new_pw_ck"
              name="new_pw_ck"
              placeholder="변경할 비밀번호 확인"
              onChange={handleChange}
            />
            <p className="text-sm mt-2">
              영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자
            </p>
          </div>
        </div>
        <button
          type="submit"
          className="mt-12 bg-[#2d2c2a] text-[#d6d2c8] rounded-sm text-xl w-full h-16"
        >
          수정하기
        </button>
      </form>
    </section>
  );
}
