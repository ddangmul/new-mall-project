import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { orderId, paymentKey, amount } = await req.json();

    if (!orderId || !paymentKey || !amount) {
      return NextResponse.json(
        { error: "Invalid payment confirmation" },
        { status: 400 }
      );
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "paid",
        paidAt: new Date(),
      },
    });

    return NextResponse.json({ message: "Payment confirmed", order });
  } catch (error) {
    console.error("Payment Confirm Error:", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
