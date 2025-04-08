import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { ids } = await req.json();
    console.log(ids);

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: "삭제할 ID가 없습니다." },
        { status: 400 }
      );
    }

    await prisma.address.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("주소 삭제 오류:", error);
    return NextResponse.json(
      { success: false, message: "주소 삭제 중 오류 발생" },
      { status: 500 }
    );
  }
}
