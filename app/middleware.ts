import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth"; // JWT 검증 함수

// export async function middleware(req: Request) {
// Authorization 헤더에서 토큰 추출
// const token = req.headers.get("Authorization")?.replace("Bearer ", "");

// if (!token) {
//   return NextResponse.json(
//     { message: "인증이 필요합니다." },
//     { status: 401 }
//   );
// }

// // JWT 토큰 검증
// const decoded = verifyToken(token);

// if (!decoded) {
//   return NextResponse.json(
//     { message: "유효하지 않은 토큰입니다." },
//     { status: 401 }
//   );
// }

export async function middleware(req: NextRequest) {
  // 🍪 쿠키에서 토큰 추출
  const token = req.cookies.get("token")?.value;

  // 로그인하지 않은 사용자가 보호된 페이지 접근 시 로그인 페이지로 리디렉션
  // if (!token && req.nextUrl.pathname.startsWith("/myshop")) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // return NextResponse.next();
}

// 미들웨어 적용할 경로 지정
// export const config = {
//   matcher:
// };
