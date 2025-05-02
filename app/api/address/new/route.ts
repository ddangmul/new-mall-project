import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; 
import { prisma } from "@/lib/prisma"; 

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  const {
    addressname,
    postcode,
    address,
    detailAddress,
    addressMobile1,
    addressMobile2,
    addressMobile3,
  } = data;

  try {
    const newAddress = await prisma.address.create({
      data: {
        userId: session.user.id,
        addressname,
        postcode,
        address,
        detailAddress,
        addressmobile: `${addressMobile1}-${addressMobile2}-${addressMobile3}`,
        isDefault: false, 
      },
    });

    return NextResponse.json({ success: true, address: newAddress });
  } catch (error) {
    console.error("신규 배송지 생성 실패", error);
    return NextResponse.json(
      { error: "신규 배송지 생성 실패" },
      { status: 500 }
    );
  }
}
