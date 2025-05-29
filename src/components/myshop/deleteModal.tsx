"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { X } from "lucide-react";

interface DeleteModalProps {
  onClose: () => void;
}

export default function DeleteModal({ onClose }: DeleteModalProps) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pw: "",
  });

  const { data: session } = useSession();
  const isOAuth = session?.user?.provider !== "credentials";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (error) {
      setError(null);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "회원탈퇴 실패");

      await signOut({ callbackUrl: "/" });
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-foreground z-50 flex justify-center items-center">
      <div className="bg-[#ffffff] p-6 rounded-md text-center max-w-sm w-[90%] shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-5 text-gray-500 hover:text-black cursor-pointer"
        >
          <X size={30} />
        </button>
        <h2 className="text-md md:text-lg font-bold mb-4">회원정보 탈퇴</h2>
        <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
          {!isOAuth && (
            <>
              <p className="text-xs md:text-md mb-6 text-gray-600">
                본인확인을 위해 비밀번호를 입력해주세요.
              </p>
              <input
                type="password"
                id="Pw"
                name="pw"
                placeholder="기존 비밀번호"
                onChange={handleChange}
              />
            </>
          )}
          <button
            type="submit"
            className="bg-foreground text-[#ffffff] px-4 py-2 rounded hover:bg-gray-800 transition text-xs md:text-md cursor-pointer"
          >
            {loading ? "탈퇴 진행 중..." : "회원 탈퇴하기"}
          </button>
        </form>
        {error && (
          <p className="pt-4 text-red-600 text-xs md:text-md">{error}</p>
        )}
      </div>
    </div>
  );
}
