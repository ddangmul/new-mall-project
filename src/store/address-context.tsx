// context/AddressContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Address } from "next-auth";
import { AddressInput } from "../../types/types";
import { useSession } from "next-auth/react";

interface AddressContextType {
  addresses: Address[];
  fetchAddresses: () => Promise<void>;
  addAddress: (addressData: AddressInput) => Promise<void>;
  deleteAddress: (addresses: Number[]) => Promise<void>;
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
  const { data: session } = useSession();

  // console.log(session?.user);

  const fetchAddresses = async () => {
    setLoading(true);

    try {
      if (!session.user) {
        return;
      }

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
      if (!session.user) {
        return;
      }

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
      if (!session.user) {
        return;
      }

      if (checkedIds.length === 0) {
        throw new Error("삭제할 주소를 선택해주세요.");
      }

      const res = await fetch("/api/delete-multiple", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: checkedIds }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "주소 삭제 실패");
      }
    } catch (error: any) {
      console.error("주소 삭제 중 오류:", error);
      setError(error.message);
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
    throw new Error("useAddressContext가 AddressProvider 안에 없습니다.");
  }
  return context;
};
