import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

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
    if (
      !addressname ||
      !postcode ||
      !addressmobile ||
      !address ||
      !detailAddress
    ) {
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

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json(
        { success: false, message: "인증되지 않은 요청입니다." },
        { status: 401 }
      );
    }

    const addresses = await prisma.address.findMany({
      where: { userId: Number(session.user.id) }, // userId는 숫자!
      orderBy: { isDefault: "desc" },
    });

    return NextResponse.json({ success: true, addresses });
  } catch (error) {
    console.error("주소 불러오기 오류:", error);
    return NextResponse.json(
      { success: false, message: "주소를 불러오는 중 오류 발생" },
      { status: 500 }
    );
  }
}
