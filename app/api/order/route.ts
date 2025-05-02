import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { AuthOptions } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions as AuthOptions);
  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      orderItems: {
        include: {
          item: true, // 아이템 정보도 같이 가져오기
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json({ orders });
}
