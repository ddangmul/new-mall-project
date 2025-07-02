import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams.toString();
  return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/payment/fail?${searchParams}`);
}
