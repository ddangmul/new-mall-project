import Image from "next/image";
import Link from "next/link";

export default function OrderCard({ order }) {
  const firstItem = order.orderItems[0];

  if (!order || !firstItem) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 bg-[#f4f4f4] p-4 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="w-30 h-30 relative flex-shrink-0">
        <Image
          src={firstItem.item.image}
          alt={firstItem.item.title || "상품 이미지"}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex flex-col justify-between">
        <p className="text-sm text-gray-500">주문번호: {order.id}</p>
        <p className="text-sm text-gray-500">주문명: {order.name}</p>
        <p className="text-sm text-gray-500">
          주문일자: {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500">
          주문상태: {order.status === "paid" && "결제완료"}
        </p>
      </div>

      <div className="ml-auto text-sm">
        <Link href={`/order/${order.id}`}></Link>
      </div>
    </div>
  );
}
