import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { AuthOptions } from "next-auth";

export async function POST(req: Request) {
  try {
    // 요청 본문에서 업데이트할 데이터 가져오기
    const { useremail, new_pw, old_pw, mobile } = await req.json();
    console.log("Received data:", { useremail, new_pw });

    // 현재 로그인한 사용자 정보 가져오기
    const session = await getServerSession(authOptions as AuthOptions); // 세션에서 사용자 정보 가져오기 (필요 시)
    if (!session?.user) return new Response("Unauthorized", { status: 401 });

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    // 기존 비밀번호 확인
    const isMatch = await bcrypt.compare(old_pw, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "기존 비밀번호가 일치하지 않습니다." },
        { status: 400 }
      );
    }

    // 새 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(new_pw, 10);

    // 비밀번호 업데이트
    await prisma.user.update({
      where: { id: user.id },
      data: { email: useremail, password: hashedPassword, mobile },
    });

    return Response.json({
      message: "사용자 정보가 업데이트되었습니다.",
    });
  } catch (error) {
    if (error instanceof Error) {
      // 'error'는 이제 'Error' 타입으로 간주
      return { message: "서버 오류", error: error.message };
    } else {
      // 'error'가 'Error' 타입이 아닐 경우 기본 처리
      return { message: "서버 오류", error: "알 수 없는 오류" };
    }
  }
}
