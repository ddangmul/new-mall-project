import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // nextAuth 설정 파일
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function PATCH(req) {
  try {
    // 🔹 요청 본문에서 업데이트할 데이터 가져오기
    const { newPassword, birthYear, birthMonth, birthDay } = await req.json();

    // 🔹 현재 로그인한 사용자 정보 가져오기
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return Response.json({ error: "로그인이 필요합니다." }, { status: 401 });
    }

    const userEmail = session.user.email;

    // 🔹 업데이트할 필드 설정
    let updateData = {};
    if (newPassword) {
      const saltRounds = 10;
      updateData.password = await bcrypt.hash(newPassword, saltRounds);
    }
    if (birthYear && birthMonth && birthDay)
      updateData.birthdate = `${birthYear}-${birthMonth}-${birthDay}`;

    // 🔹 사용자 정보 업데이트
    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: updateData,
    });

    return Response.json({
      message: "사용자 정보가 업데이트되었습니다.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "사용자 정보를 업데이트하는 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
