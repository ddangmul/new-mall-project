import { toast } from "react-toastify";
import { Address } from "@prisma/client";
import React from "react";

interface AddressSelectionProps {
  form: {
    address?: string;
  };
  addresses: Address[];
  selectedAddress: Address | null;
  onSelectAddress: (addr: Address) => void;
  setIsAddressOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAddressOpen: boolean;
}

const AddressSelection: React.FC<AddressSelectionProps> = React.memo(
  ({
    form,
    addresses,
    selectedAddress,
    onSelectAddress,
    setIsAddressOpen,
    isAddressOpen,
  }) => {
    const handleSelectAddress = (addr: Address) => {
      if (selectedAddress?.id !== addr.id) {
        onSelectAddress(addr);
        toast.info(`${addr.addressname} 배송지를 선택했습니다.`);
      }
    };

    return (
      <div>
        {selectedAddress?.isDefault && (
          <span className="bg-[#313030] text-[#f2f0eb] px-2 py-1 rounded-xs">
            기본
          </span>
        )}
        <div>{selectedAddress?.addressname}</div>
        <div className="text-sm text-gray-700">
          {selectedAddress?.address} {selectedAddress?.detailAddress}
        </div>
        <div className="text-xs text-gray-500">
          {selectedAddress?.addressmobile}
        </div>

        {isAddressOpen && addresses.length > 0 && (
          <ul>
            {addresses.map((addr) => (
              <li
                key={addr.id}
                className={`border-b-1 border-b-[#cfcdcd] space-y-1 py-3`}
                onClick={() => handleSelectAddress(addr)}
              >
                {addr.isDefault && (
                  <span className="bg-[#313030] text-[#f2f0eb] px-1.5 rounded-sm">
                    기본
                  </span>
                )}
                <div>{addr.addressname}</div>
                <div className="text-sm text-gray-700">
                  {addr.address} {addr.detailAddress}
                </div>
                <div className="text-xs text-gray-500">
                  {addr.addressmobile}
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col mt-4">
          {form.address ? (
            <button
              className="underline underline-offset-5 rounded-xs"
              type="button"
              onClick={() => setIsAddressOpen((prev) => !prev)}
            >
              {isAddressOpen ? "목록 접기" : "전체 배송지 보기"}
            </button>
          ) : (
            <p className="text-center">등록된 배송지가 없습니다.</p>
          )}
        </div>
      </div>
    );
  }
);

export default AddressSelection;
