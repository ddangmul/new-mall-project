import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  // URL에서 'id' 파라미터를 추출
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

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
