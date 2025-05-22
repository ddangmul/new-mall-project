import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams.toString(); // errorCode=xxx&errorMessage=yyy 등
  return NextResponse.redirect(`/checkout?${searchParams}`);
}
