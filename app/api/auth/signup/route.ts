// app/api/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { email, password, username, birthYear, birthMonth, birthDay } =
    await request.json();

  // 필수 입력값 검증
  if (
    !email ||
    !password ||
    !username ||
    !birthYear ||
    !birthMonth ||
    !birthDay
  ) {
    return NextResponse.json(
      { message: "필수 항목을 모두 입력해주세요." },
      { status: 400 }
    );
  }

  // 비밀번호 해시화
  const hashedPassword = await bcrypt.hash(password, 10); // 10은 salt rounds 값

  try {
    // 사용자 데이터 저장
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        birthdate: `${parseInt(birthYear)}-${parseInt(birthMonth)}-${parseInt(
          birthDay
        )}`,
      },
    });

    return NextResponse.json(newUser, { status: 201 }); // 성공적으로 생성된 사용자 반환
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
