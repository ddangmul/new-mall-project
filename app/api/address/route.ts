import { prisma } from "@/lib/prisma"; // Prisma 클라이언트 임포트
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      userId,
      addressname,
      postcode,
      address,
      detailAddress,
      addressmobile,
      defaultAddress,
    } = await req.json();

    // 필수 값 검증
    if (!addressname || !postcode || !addressmobile || !address || !address) {
      return NextResponse.json(
        { success: false, message: "필수 정보를 입력하세요." },
        { status: 400 }
      );
    }

    // 기존 기본 배송지가 있다면 isDefault = false로 변경
    if (defaultAddress) {
      await prisma.address.updateMany({
        where: { userId: Number(userId), isDefault: true },
        data: { isDefault: false },
      });
    }

    // 배송지 추가
    const newAddress = await prisma.address.create({
      data: {
        userId: Number(userId),
        addressname,
        postcode,
        address,
        detailAddress,
        addressmobile,
        isDefault: defaultAddress,
      },
    });

    return NextResponse.json({ success: true, address: newAddress });
  } catch (error) {
    console.error("배송지 추가 오류:", error);
    return NextResponse.json(
      { success: false, message: "배송지 추가 중 오류 발생" },
      { status: 500 }
    );
  }
}
