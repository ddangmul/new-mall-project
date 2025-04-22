import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { AuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function DELETE(req: Request): Promise<Response> {
  const session = await getServerSession(authOptions as AuthOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { pw } = body;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json(
      { message: "사용자를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  const isOAuth = user.provider !== "credentials";

  if (!isOAuth) {
    if (!pw || pw === "") {
      return NextResponse.json(
        { message: "비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const isPasswordCorrect = await bcrypt.compare(pw, user.password || "");

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }
  }

  try {
    await prisma.user.delete({
      where: { email: session.user.email },
    });

    return NextResponse.json(
      { message: "회원정보가 성공적으로 삭제되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    throw new Error("회원정보 삭제 과정에서 에러가 발생했습니다.");
  }
}
