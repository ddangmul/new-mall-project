import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { AuthOptions } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as AuthOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { name, address, phone, paymentMethod, items } = await req.json();

  const order = await prisma.order.create({
    data: {
      name,
      address,
      phone,
      paymentMethod,
      status: "pending",
      userId: session.user.id,
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
    ), 
    name,
  });
}
