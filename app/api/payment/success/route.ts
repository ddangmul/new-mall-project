import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  if (!paymentKey || !orderId || !amount) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
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
    console.error("[결제 승인 실패]", data);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment/fail`);
  }

  console.log("[결제 성공]", data);

  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment/success`);
}
