"use client";

import { signIn, useSession } from "next-auth/react";
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
    if (status === "loading") return;

    if (status === "unauthenticated") {
      signIn(undefined, { callbackUrl: "/cart" });
      return;
    }

    if (status === "authenticated") fetchAddresses();
  }, [status]);

  useEffect(() => {
    if (addresses.length > 0) {
      setAddressList(addresses);
    }
  }, []);

  useEffect(() => {
    if (!session || !addressList.length) return;

    const defaultAddress =
      addressList.find((addr) => addr.isDefault) || addressList[0];

    if (form?.address?.id === defaultAddress?.id && form?.name && form?.phone) {
      return;
    }

    setForm({
      name: session.user?.username || "",
      address: defaultAddress || "",
      phone: session.user?.mobile || "",
      coupon: [],
      mileage: 1000,
      paymentMethod: "card",
    });
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
        } catch (error: unknown) {
          if (error instanceof Error)
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
    []
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
    <div className="max-w-2xl mx-auto p-6 mt-20 space-y-6 md:space-y-10">
      <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-10">
        결제하기
      </h1>
      <section>
        <div className="mb-4 flex w-full justify-between">
          <h2 className="md:text-lg lg:text-xl font-semibold basis-1/2">
            배송지 정보
          </h2>
          <button
            className="underline underline-offset-5 w-full text-right text-sm md:text-md lg:text-lg cursor-pointer"
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
        <h2 className="md:text-lg lg:text-xl font-semibold mb-2">상품 정보</h2>
        <ul>
          {productsToBuy.map((item) => (
            <li
              key={item.id}
              className="text-sm flex justify-between items-center py-4 md:py-6 border-b-1 border-b-[#c7cfcc]"
            >
              <div className="relative w-[70px] h-[70px] xl:w-[80px] xl:h-[80px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
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
        <h2 className="md:text-lg lg:text-xl font-semibold mb-2">쿠폰 사용</h2>
        <input
          type="text"
          name="coupon"
          placeholder="쿠폰 코드 입력"
          value={form?.coupon ?? ""}
          onChange={handleInputChange}
          className="w-full border-1 px-2 py-1.5 text-sm md:text-md lg:text-lg"
        />
        <p className="text-sm grayscale-25"></p>
      </section>

      {/* 4. 마일리지 */}
      <section>
        <h2 className="md:text-lg lg:text-xl font-semibold mb-2">
          마일리지 사용
        </h2>
        <input
          type="number"
          name="mileage"
          min={0}
          value={form?.mileage ?? ""}
          onChange={handleInputChange}
          className="w-full border px-2 py-1.5 text-sm md:text-md lg:text-lg"
        />
        <p className="text-xs py-2 grayscale-50">
          보유 마일리지: {form?.mileage}
        </p>
      </section>

      {/* 5. 결제 방법 */}
      <section>
        <h2 className="tmd:text-lg lg:text-xl font-semibold mb-2">결제 방법</h2>
        <select
          name="paymentMethod"
          value={form?.paymentMethod}
          onChange={handleInputChange}
          className="w-full border p-2 text-sm md:text-md lg:text-lg"
        >
          <option value="card">신용카드</option>
          <option value="bank">계좌이체</option>
          <option value="cash">무통장입금</option>
        </select>
      </section>

      <section className="flex flex-col gap-2 items-end">
        <span className="md:text-lg lg:text-xl font-bold">
          총 결제 금액: {totalPrice.toLocaleString()}원
        </span>

        <span className="flex justify-between w-full mt-2 text-sm md:text-md lg:text-lg">
          <button
            onClick={() => router.back()}
            className="bg-background shadow-sm text-foreground px-2 py-1 rounded-xs cursor-pointer"
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
