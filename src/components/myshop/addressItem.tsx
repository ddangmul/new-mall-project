import { Address } from "next-auth";

interface AddressItemProps {
  address: Address;
  checked: boolean;
  onToggle: () => void;
}

export default function AddressItem({
  address,
  checked,
  onToggle,
}: AddressItemProps) {
  return (
    <li className="border-b-1 border-b-[#cfcdcd] space-y-1 py-3">
      <div className="address-checkbox flex justify-start gap-2 text-md text-center">
        <input type="checkbox" checked={checked} onChange={onToggle} />
        {address.isDefault && (
          <span className="bg-[#313030] text-[#f2f0eb] px-1.5 rounded-sm">
            기본
          </span>
        )}
        <span>{address.addressname}</span>
      </div>
      <div className="flex justify-between px-5">
        <div>
          <p>
            {address.address} {address.detailAddress}
          </p>
          <p className="text-[#9d9d9d] text-sm">{address.addressmobile}</p>
        </div>
        <div className="text-[#7d7c7c] font-bold underline underline-offset-4">
          수정
        </div>
      </div>
    </li>
  );
}
