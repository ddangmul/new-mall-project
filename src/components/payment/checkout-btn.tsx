import { toast } from "react-toastify";
import { validateNewAddress } from "@/utils/validation";

type CheckoutButtonProps = {
  form: {
    name: string;
    address: string;
    phone: string;
    paymentMethod: string;
  };
  cartItems: {
    itemId: string;
    quantity: number;
  }[];
  useNewAddress: boolean;
  newAddress: {
    addressname: string;
    postcode: string;
    address: string;
    detailAddress?: string;
    addressmobile: string;
    isDefault?: boolean;
  };
};

export default function CheckoutButton({
  form,
  cartItems,
  useNewAddress,
  newAddress,
}: CheckoutButtonProps) {
  console.log(form, cartItems);

  const handlePayment = async () => {
    if (useNewAddress) {
      if (!validateNewAddress(newAddress)) {
        toast.error("입력한 배송지 정보가 유효하지 않습니다.");
        return;
      }

      const saveAddressRes = await fetch("/api/address", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...newAddress,
          isDefault: false,
        }),
      });

      const result = await saveAddressRes.json();

      if (!saveAddressRes.ok) {
        toast.error("배송지 저장에 실패했습니다." + result.message);
        return;
      }
    }
    console.log(cartItems);

    // 주문 생성
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        items: cartItems,
      }),
    });

    if (!response.ok) {
      toast.error("주문 생성 실패");
      return;
    }

    const { orderId, amount, name } = await response.json();

    if (!orderId || !amount) {
      throw new Error("주문 생성 실패: 필수 정보 없음");
    }

    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
    if (!clientKey) {
      toast.error("결제 키가 설정되지 않았습니다.");
      return;
    }
    const tossPayments = (window as any).TossPayments?.(clientKey);

    if (!tossPayments) {
      toast.error("TossPayments SDK가 아직 로드되지 않았습니다.");
      return;
    }

    try {
      await tossPayments.requestPayment("카드", {
        amount,
        orderId,
        orderName: name,
        customerName: form.name,
        successUrl: `${window.location.origin}/api/payment/success`,
        failUrl: `${window.location.origin}/api/payment/fail`,
      });
    } catch (error) {
      toast.error(
        "결제창 에러: " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-foreground shadow-lg text-background py-1 rounded-xs px-2 cursor-pointer"
    >
      결제하기
    </button>
  );
}
