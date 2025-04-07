"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import RegisterAddress from "./register-address";
import { useSession } from "next-auth/react";

export default function AddressItem({ address }) {
  return (
    <li
      
      className="border-b-1 border-b-[#cfcdcd] space-y-1 py-3"
    >
      <div className="address-checkbox flex justify-start gap-2 text-md text-center">
        <input
          type="checkbox"
          // checked={isChecked}
          // onChange={(e) => onCheck(id, e.target.checked)}
        ></input>
        {address.isDefault && (
          <span className="bg-[#313030] text-[#f2f0eb] px-1.5 rounded-sm">
            기본
          </span>
        )}
        <span>{address.addressname}</span>
      </div>
      <div className="flex">
        <div>
          <p>
            {address.address} {address.detailAddress}
          </p>
          <p className="text-[#9d9d9d] text-sm">{address.addressmobile}</p>
        </div>
        <div></div>
      </div>
    </li>
  );
}
