// app/api/signup/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { hashPassword, generateToken } from "@/lib/auth"; // JWT 토큰 생성 함수

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
  const hashedPassword = await hashPassword(password);

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

    const token = generateToken(newUser.id);

    return NextResponse.json({ message: "회원가입 성공", token }); // 성공적으로 생성된 사용자 반환
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
