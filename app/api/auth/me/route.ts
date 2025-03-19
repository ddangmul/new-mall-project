import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth"; // 토큰 검증 함수
import prisma from "@/lib/prisma"; // Prisma 클라이언트

export async function GET(req: NextRequest) {
  try {
    // 1. 요청의 쿠키에서 토큰 가져오기
    const token = req.cookies.get("token")?.value;

    // 2. 토큰이 없으면 인증 실패 응답 반환
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 3. 토큰 검증
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // 4. 데이터베이스에서 사용자 정보 가져오기
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, username: true }, // 필요한 정보만 선택
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 5. 사용자 정보 반환
    return NextResponse.json(user);
  } catch (error) {
    console.error("사용자 정보 불러오기 오류:", error);
    return NextResponse.json({ message: "서버 오류 발생" }, { status: 500 });
  }
}
