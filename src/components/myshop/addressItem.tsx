import { Address } from "@/assets/types/types";

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
          <span className="bg-foreground text-background px-1.5 rounded-sm">
            기본
          </span>
        )}
        <span>{address.addressname}</span>
      </div>
      <div className="px-5">
        <div>
          <p>
            {address.address} {address.detailAddress}
          </p>
          <p className="text-graytext text-sm">{address.addressmobile}</p>
        </div>
      </div>
    </li>
  );
}
