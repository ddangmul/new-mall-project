"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { validateMobileNumber } from "@/utils/validation";

import "./modify.css";
import SuccessModal from "./successModal";
import DeleteModal from "./deleteModal";

export default function ModifyMember() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const user = useMemo(() => session?.user, [session]); // session에서 user 정보 가져오기
  const isOAuth = user?.provider !== "credentials";

  useEffect(() => {
    // 세션이 없으면 로그인 페이지로 리디렉션
    if (!session) {
      router.push("/login"); // 로그인 페이지로 리디렉션
    }
  }, [session, router]);

  const [formData, setFormData] = useState({
    mobile1: user.mobile?.split("-")[0] || "",
    mobile2: user.mobile?.split("-")[1] || "",
    mobile3: user.mobile?.split("-")[2] || "",
    old_pw: "",
    new_pw: "",
    new_pw_ck: "",
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      if (error) {
        setError(null);
        setLoading(false);
      }
    },
    [error]
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.new_pw !== formData.new_pw_ck) {
      setError("비밀번호가 일치하지 않습니다.");
      setLoading(false);
      return;
    }

    const { mobile1, mobile2, mobile3 } = formData;
    const { result, mobileNumber } = validateMobileNumber(
      mobile1,
      mobile2,
      mobile3
    );

    if (!result) {
      setError("전화번호는 010-1234-5678 형식이어야 합니다.");
      setLoading(false);
      return;
    }

    const formattedData = {
      ...formData,
      mobile: mobileNumber,
    };

    if (isOAuth) {
      delete formattedData.old_pw;
      delete formattedData.new_pw;
      delete formattedData.new_pw_ck;
    }

    try {
      const res = await fetch("/api/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "회원정보 수정 실패");

      setSuccessModal(true);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="modify-member pb-12 mt-10">
      <form
        className="space-y-3 w-full text-sm md:text-lg lg:text-xl"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            name="username"
            value={user.name || user.username}
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
            id="mobile1"
            name="mobile1"
            className="basis-1/3"
            value={formData.mobile1}
            onChange={handleChange}
            autoComplete="off"
          />
          -
          <input
            type="text"
            id="mobile2"
            name="mobile2"
            className="basis-1/3"
            value={formData.mobile2}
            onChange={handleChange}
            autoComplete="off"
          />
          -
          <input
            type="text"
            id="mobile3"
            name="mobile3"
            className="basis-1/3"
            value={formData.mobile3}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className="birthdate flex justify-between gap-3">
          <span className="basis-1/3 flex items-center gap-3">
            <input
              name="birthYear"
              type="text"
              placeholder="출생년도"
              value={
                user.birthdate === null ? "" : user.birthdate.split("-")[0]
              }
              onChange={handleChange}
              autoComplete="off"
            />
            년
          </span>
          <span className="basis-1/3 flex items-center gap-3">
            <input
              name="birthMonth"
              type="text"
              placeholder="출생월"
              value={
                user.birthdate === null ? "" : user.birthdate.split("-")[1]
              }
              onChange={handleChange}
              autoComplete="off"
            />
            월
          </span>
          <span className="basis-1/3 flex items-center gap-3">
            <input
              name="birthDay"
              type="text"
              placeholder="출생일"
              value={
                user.birthdate === null ? "" : user.birthdate.split("-")[2]
              }
              onChange={handleChange}
              autoComplete="off"
            />
            일
          </span>
        </div>
        {!isOAuth && (
          <div className="mt-8 space-y-3">
            <h2 className="text-lg md:text-xl lg:text-2xl mb-6">
              비밀번호 변경
            </h2>
            <input
              type="password"
              id="oldPw"
              name="old_pw"
              placeholder="기존 비밀번호"
              onChange={handleChange}
            />
            <div>
              <input
                type="password"
                id="newPw"
                name="new_pw"
                placeholder="변경할 비밀번호"
                onChange={handleChange}
              />
              <p className="text-xs md:text-sm mt-2">
                영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자
              </p>
            </div>
            <div>
              <input
                type="password"
                id="new_pw_ck"
                name="new_pw_ck"
                placeholder="변경할 비밀번호 확인"
                onChange={handleChange}
              />
              <p className="text-xs md:text-sm mt-2">
                영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자
              </p>
            </div>
            {error && <div className="text-red-500">{error}</div>}
          </div>
        )}
        <button
          type="submit"
          className="mt-6 md:mt-10 bg-foreground text-background rounded-xs text-sm md:text-md lg:text-lg w-full py-2"
        >
          {loading ? "수정 중..." : "회원정보 수정"}
        </button>
      </form>
      <div className="mt-4 md:mt-6 bg-[#d6d2c8] rounded-xs text-sm md:text-md lg:text-lg w-full py-2 text-center">
        <button onClick={() => setDeleteModal(true)}>회원 탈퇴하기</button>
      </div>
      {successModal && (
        <SuccessModal onConfirm={() => signOut({ callbackUrl: "/login" })} />
      )}
      {deleteModal && (
        <DeleteModal onClose={() => setDeleteModal(false)}></DeleteModal>
      )}
    </section>
  );
}
