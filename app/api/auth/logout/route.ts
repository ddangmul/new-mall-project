import { NextResponse } from "next/server";

export async function POST() {
  try {
    // 1. 토큰 삭제 (쿠키를 빈 값으로 설정하고 즉시 만료)
    const response = NextResponse.json({ message: "로그아웃 성공" });

    console.log(response.cookies);
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0), // 즉시 만료
      path: "/", // 모든 경로에서 쿠키 삭제 적용
    });

    return response;
  } catch (error) {
    console.error("로그아웃 오류:", error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
