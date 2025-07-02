import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  if (!paymentKey || !orderId || !amount) {
    return NextResponse.json(
      { error: "필수 파라미터가 없습니다." },
      { status: 400 }
    );
  }

  const secretKey = process.env.TOSS_SECRET_KEY!;
  const basicAuthToken = Buffer.from(`${secretKey}:`).toString("base64");

  const response = await fetch(
    "https://api.tosspayments.com/v1/payments/confirm",
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuthToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount: Number(amount),
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("[결제 승인 실패]", {
      paymentKey,
      orderId,
      amount,
      tossError: data,
    });
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/payment/fail?message=${data.message}`
    );
  }

  try {
    await prisma.order.update({
      where: { orderId: orderId },
      data: {
        status: "paid",
        paidAt: new Date(),
      },
    });
  } catch (err) {
    console.error("주문 업데이트 실패", err);
  }

  console.log("amount from DB", amount);
  console.log("amount from query", searchParams.get("amount"));

  return NextResponse.redirect(
    `${process.env.NEXTAUTH_URL}/payment/success?paymentKey=${paymentKey}&orderId=${orderId}&amount=${amount}`
  );
}
