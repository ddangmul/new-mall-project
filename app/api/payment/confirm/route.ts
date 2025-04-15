import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { orderId, amount, productName, customerName } = body;

  // DB에 주문 정보 저장
  console.log("[주문 등록]", orderId, amount, productName, customerName);

  return NextResponse.json({ ok: true });
}
