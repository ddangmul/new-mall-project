import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pathname = url.pathname; // "/api/items/123"

  // pathname을 "/" 기준으로 분리해서 마지막 부분이 id
  const segments = pathname.split("/");
  const id = segments[segments.length - 1];

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
