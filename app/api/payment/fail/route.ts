import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.redirect("/checkout?error=payment_failed");
}
