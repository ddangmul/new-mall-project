import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
};

export default function CheckoutButton({
  form,
  cartItems,
}: CheckoutButtonProps) {
  const handlePayment = async () => {
    if (!form.address || !form.phone) {
      toast.error("모든 정보를 입력해 주세요.");
      return;
    }

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

    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY!;
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
      toast.error("결제창 에러: " + error);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-[#524f4c] shadow-lg text-[#f8f7f5] basis-1/2 py-2 rounded-xs px-3"
    >
      결제하기
    </button>
  );
}
