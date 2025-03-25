import { NextResponse } from "next/server";
import { getItemsBySearchTerm } from "@/lib/items/queries"; // 방금 만든 검색 함수 불러오기

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const searchTerm = searchParams.get("q") || "";

  if (!searchTerm) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const items = await getItemsBySearchTerm(searchTerm);
    return NextResponse.json(items ?? []); // 응답이 없을 경우 빈 배열 반환
  } catch (error) {
    console.error("검색 API 오류:", error);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
