"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { useCart } from "@/store/cart-context";
import LoadingIndicator from "@/components/loading-indicator";
import { useSearchParams, useRouter } from "next/navigation";
import CheckoutButton from "@/components/payment/checkout-btn";
import { useAddress } from "@/store/address-context";
import Image from "next/image";
import { formatterPrice } from "@/utils/formatter";
import { toast } from "react-toastify";
import NewAddressForm from "@/components/checkout/newaddress";
import AddressSelection from "@/components/checkout/address-selection";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { cartItems } = useCart();
  const searchParams = useSearchParams();
  const { addresses, fetchAddresses } = useAddress();
  const [addressList, setAddressList] = useState([]);
  const [form, setForm] = useState(null);
  const [newAddress, setNewAddress] = useState({
    addressname: "",
    postcode: "",
    address: "",
    detailAddress: "",
    addressMobile1: "",
    addressMobile2: "",
    addressMobile3: "",
  });
  const [useNewAddress, setUseNewAddress] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [buyNowItem, setBuyNowItem] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      fetchAddresses();
    } else if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (addresses.length > 0) {
      setAddressList(addresses);
    }
  }, [addresses]);

  useEffect(() => {
    if (session) {
      const defaultAddress =
        addressList.find((addr) => addr.isDefault) || addressList[0];
      setForm({
        name: session.user?.username || "",
        address: defaultAddress || "",
        phone: session.user?.mobile || "",
        coupon: [],
        mileage: 1000,
        paymentMethod: "card",
      });
    }
  }, [session, addressList]);

  const idsParam = searchParams.get("ids");
  const buyNowProduct = searchParams.get("buyNow");
  const buyNowQty = parseInt(searchParams.get("qty") || "1", 10);

  useEffect(() => {
    const fetchBuyNowItem = async () => {
      if (buyNowProduct) {
        try {
          const res = await fetch(`/api/items/${buyNowProduct}`);
          if (!res.ok) throw new Error("상품 정보를 불러오지 못했습니다.");
          const data = await res.json();
          setBuyNowItem({ ...data, quantity: buyNowQty });
        } catch (error) {
          toast.error("상품 정보를 가져오는 데 실패했습니다.");
        }
      }
    };
    fetchBuyNowItem();
  }, [buyNowProduct]);

  const productsToBuy =
    idsParam === "all"
      ? cartItems
      : idsParam
      ? cartItems.filter((item) =>
          idsParam.split(",").includes(String(item.id))
        )
      : buyNowProduct && buyNowItem
      ? [buyNowItem]
      : [];

  const deliveryFee = 2500;
  const productTotal = productsToBuy.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalPrice = productTotal + deliveryFee - (form?.mileage || 0);
  const newAddressWithmobile = {
    ...newAddress,
    addressmobile: `${newAddress.addressMobile1}-${newAddress.addressMobile2}-${newAddress.addressMobile3}`,
    isDefault: false,
  };

  const handleSelectAddress = (addr: { addressname: string }) => {
    setForm((prev) => ({
      ...prev,
      address: addr,
    }));
  };

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNewAddressChange = useCallback(
    (e: { target: { name: string; value: string } }) => {
      setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    },
    [newAddress]
  );

  const handleNewAddressMobileChange = useCallback(
    (e: { target: { name: string; value: string } }) => {
      const { name, value } = e.target;
      setNewAddress((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [newAddress]
  );

  const handleAddressToggle = () => {
    setUseNewAddress(!useNewAddress);
    if (!useNewAddress) {
      setForm({ ...form, address: newAddress });
    } else {
      const defaultAddress =
        addressList.find((addr) => addr.isDefault) || addressList[0];
      setForm({ ...form, address: defaultAddress });
    }
  };

  if (status === "loading") return <LoadingIndicator />;

  return (
    <div className="max-w-2xl mx-auto p-6 mt-20 space-y-6">
      <h1 className="text-2xl font-bold mb-10">결제 페이지</h1>

      {/* 1. 배송지 정보 */}
      <section>
        <div className="mb-4 flex w-full justify-between">
          <h2 className="text-lg font-semibold basis-1/2">배송지 정보</h2>
          <button
            className="underline underline-offset-5 w-full text-right"
            type="button"
            onClick={handleAddressToggle}
          >
            {useNewAddress || !form ? "기본 배송지 사용" : "신규 배송지 입력"}
          </button>
        </div>
        <div>
          {useNewAddress || !form ? (
            <NewAddressForm
              newAddress={newAddress}
              handleNewAddressChange={handleNewAddressChange}
              handleNewAddressMobileChange={handleNewAddressMobileChange}
            />
          ) : (
            <AddressSelection
              form={form}
              addresses={addressList}
              selectedAddress={form.address}
              onSelectAddress={handleSelectAddress}
              isAddressOpen={isAddressOpen}
              setIsAddressOpen={setIsAddressOpen}
            />
          )}
        </div>
      </section>

      {/* 2. 상품 정보 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">상품 정보</h2>
        <ul>
          {productsToBuy.map((item) => (
            <li
              key={item.id}
              className="text-sm flex justify-between items-center p-4 border-b-1 border-b-[#c7cfcc]"
            >
              <div className="relative w-[70px] h-[70px] xl:w-[80px] xl:h-[80px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <span>
                {item.title} x {item.quantity}
              </span>
              <p className="item-price">{formatterPrice(item.price)}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. 쿠폰 사용 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">쿠폰 사용</h2>
        <input
          type="text"
          name="coupon"
          placeholder="쿠폰 코드 입력"
          value={form?.coupon ?? ""}
          onChange={handleInputChange}
          className="w-full border p-2 rounded-xs"
        />
        <p className="text-sm grayscale-25"></p>
      </section>

      {/* 4. 마일리지 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">마일리지 사용</h2>
        <input
          type="number"
          name="mileage"
          min={0}
          value={form?.mileage ?? ""}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        />
        <p className="text-sm grayscale-25">보유 마일리지: {form?.mileage}</p>
      </section>

      {/* 5. 결제 방법 */}
      <section>
        <h2 className="text-lg font-semibold mb-2">결제 방법</h2>
        <select
          name="paymentMethod"
          value={form?.paymentMethod}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        >
          <option value="card">신용카드</option>
          <option value="bank">계좌이체</option>
          <option value="cash">무통장입금</option>
        </select>
      </section>

      <section className="flex flex-col gap-2 items-end">
        <span className="text-lg font-bold">
          총 결제 금액: {totalPrice.toLocaleString()}원
        </span>

        <span className="flex justify-between w-full mt-2">
          <button
            onClick={() => router.back()}
            className="bg-[#f8f7f5] shadow-sm text-[#524f4c] px-2 py-1 rounded-xs"
          >
            ← 뒤로가기
          </button>
          <CheckoutButton
            form={form}
            cartItems={productsToBuy.map((item) => ({
              itemId: item.id,
              quantity: item.quantity,
            }))}
            useNewAddress={useNewAddress}
            newAddress={newAddressWithmobile}
          />
        </span>
      </section>
    </div>
  );
}
