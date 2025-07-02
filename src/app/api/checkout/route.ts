import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { AuthOptions } from "next-auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions as AuthOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { name, address, phone, paymentMethod, items } = await req.json();

    const itemIds = items.map((item) => item.itemId);
    const existingItems = await prisma.item.findMany({
      where: { id: { in: itemIds } },
    });
    if (existingItems.length !== itemIds.length) {
      throw new Error("주문에 포함된 아이템 중 존재하지 않는 항목이 있습니다.");
    }

    const order = await prisma.order.create({
      data: {
        name,
        address: JSON.stringify(address),
        phone,
        paymentMethod,
        status: "pending",
        userId: session.user.id,
        orderItems: {
          create: items.map(({ itemId, quantity }) => ({
            itemId: Number(itemId),
            quantity: Number(quantity),
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

    const amount = order.orderItems.reduce((total, orderItem) => {
      return total + orderItem.quantity * orderItem.item.price;
    }, 0);

    return NextResponse.json({
      orderId: order.orderId,
      amount,
      name,
    });
  } catch (error) {
    console.error("[Checkout API Error]", error);
    return NextResponse.json({ error: "서버 오류 발생" }, { status: 500 });
  }
}
