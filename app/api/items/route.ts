import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET 요청 처리: 모든 아이템을 가져옵니다.
export async function GET() {
  try {
    const items = await prisma.item.findMany(); // 모든 아이템을 가져옴
    return NextResponse.json(items); // JSON 형식으로 응답
  } catch (error) {
    console.error(error);
    return NextResponse.error(); // 오류 발생 시 500 에러
  }
}
