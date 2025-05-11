import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { email, password, username, birthdate, mobile } = data;

    // 필수 입력값 확인
    if (!email || !password || !username) {
      return NextResponse.json(
        { message: "이메일, 비밀번호, 이름은 필수 입력 사항입니다." },
        { status: 400 }
      );
    }

    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "이미 존재하는 이메일입니다." },
        { status: 400 }
      );
    }

    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 사용자 생성
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        birthdate,
        mobile,
      },
    });

    // 성공적인 응답
    return NextResponse.json(
      { message: "회원가입 성공", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("회원가입 에러:", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
