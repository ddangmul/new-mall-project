import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  try {
    const {
      addressname,
      postcode,
      address,
      detailAddress,
      addressmobile,
      isDefault,
    } = await req.json();

    const userId = session?.user?.id;
    
    if (!userId) {
      return new Response(JSON.stringify({ message: "userId가 필요합니다." }), {
        status: 400,
      });
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });

    if (!userExists) {
      return NextResponse.json(
        { success: false, message: "존재하지 않는 사용자입니다." },
        { status: 404 }
      );
    }

    // 필수 값 검증
    if (!addressname || !postcode || !addressmobile || !address) {
      return NextResponse.json(
        { success: false, message: "필수 정보를 입력하세요." },
        { status: 400 }
      );
    }

    // 기존 기본 배송지가 있다면 isDefault = false로 변경
    if (isDefault) {
      await prisma.address.updateMany({
        where: { userId: userId, isDefault: true },
        data: { isDefault: false },
      });
    }

    // 배송지 추가
    const newAddress = await prisma.address.create({
      data: {
        userId,
        addressname,
        postcode,
        address,
        detailAddress,
        addressmobile,
        isDefault,
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
      where: { userId: session.user.id }, // userId는 숫자!
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
