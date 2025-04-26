import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, address, phone, paymentMethod, items } = await req.json();

  const order = await prisma.order.create({
    data: {
      name,
      address,
      phone,
      paymentMethod,
      status: "pending",
      orderItems: {
        create: items.map(({ itemId, quantity }) => ({
          item: { connect: { id: itemId } },
          quantity,
        })),
      },
    },
    include: {
      orderItems: {
        include: {
          item: true, // item 정보를 함께 포함시켜서 item.price 접근 가능하게 함
        },
      },
    },
  });

  return NextResponse.json({
    orderId: order.orderId,
    amount: order.orderItems.reduce(
      (total, item) => total + item.quantity * item.item.price,
      0
    ), // 주문 금액 계산
    name,
  });
}
