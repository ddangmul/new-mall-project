import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // 보호된 경로 설정
  const protectedRoutes = [
    "/api/user/update",
    "/myshop",
    "/payment",
    "/checkout",
    "/checkout/",
    "/api/checkout",
    "/api/payment",
    "/api/order",
    "/api/address",
  ];

  // 로그인 안 한 경우 로그인 페이지로 리디렉트
  if (
    !token &&
    protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// 미들웨어를 특정 API 경로, 페이지 라우트에만 적용
export const config = {
  matcher: [
    "/api/user/*", // 사용자 관련 모든 API
    "/api/checkout/*", // 체크아웃 관련 API
    "/api/payment/*", // 결제 관련 API
    "/api/address/*", // 주소 관련 API
    "/api/order/*", // 주문 관련 API
    "/myshop", // 마이페이지
    "/payment", // 결제 페이지
    "/checkout",
    "/checkout/*", // 체크아웃 페이지
  ],
};
