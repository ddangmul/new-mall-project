import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // 이메일이 입력 검증
  if (!email || !password) {
    return NextResponse.json(
      { message: "이메일과 비밀번호를 입력해주세요." },
      { status: 400 }
    );
  }

  try {
    // 사용자가 입력한 이메일로 사용자 찾기
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // 이메일이 존재하지 않거나 비밀번호가 일치하지 않으면 로그인 실패
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { message: "이메일 또는 비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    // 로그인 성공
    return NextResponse.json(
      {
        message: "로그인 성공",
        user: { email: user.email, username: user.username },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("로그인 에러:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
