// context/AddressContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Address } from "next-auth";
import { AddressInput, AddressWithCheck } from "../../types/types";

interface AddressContextType {
  addresses: Address[];
  fetchAddresses: () => Promise<void>;
  addAddress: (addressData: AddressInput) => Promise<void>;
  deleteAddress: (addresses: Number[]) => Promise<void>;
  updateAddress: (id: number, updates: Partial<Address>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/address");
      const data = await res.json();
      if (data.success) {
        setAddresses(data.addresses);
        // router.push("myshop?address=&mode=member&mode2=address");
      } else {
        throw new Error(data.message || "배송지 조회 실패");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addAddress = async (addressData: AddressInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addressData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "배송지 추가 실패");

      await fetchAddresses();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (checkedIds: Number[]) => {
    try {
      if (checkedIds.length === 0) {
        throw new Error("삭제할 주소를 선택해주세요.");
      }

      const res = await fetch("/api/address/delete-multiple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: checkedIds }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "주소 삭제 실패");
      }

      // 주소 목록 다시 불러오기
      await fetchAddresses();
    } catch (error: any) {
      console.error("주소 삭제 중 오류:", error);
      setError(error.message);
    }
  };

  const updateAddress = async (id: number, updates: Partial<Address>) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/address/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "배송지 수정 실패");

      await fetchAddresses();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <AddressContext.Provider
      value={{
        addresses,
        fetchAddresses,
        addAddress,
        deleteAddress,
        updateAddress,
        loading,
        error,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddressContext must be used within AddressProvider");
  }
  return context;
};
