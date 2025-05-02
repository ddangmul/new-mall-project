import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // DB 클라이언트 경로에 맞게 수정하세요

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: "제품 id가 없습니다." }, { status: 400 });
  }

  try {
    const product = await prisma.item.findUnique({
      where: { id: parseInt(id, 10) },
      select: {
        id: true,
        title: true,
        price: true,
        image: true,
        // 필요한 필드 추가
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "제품을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("제품 정보 불러오기 실패", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
