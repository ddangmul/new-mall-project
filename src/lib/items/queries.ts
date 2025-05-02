import { prisma } from "../prisma";

export async function getAllItems() {
  return await prisma.item.findMany();
}

// 카테고리로 아이템 필터링
export async function getItemsByCategory(category: string) {
  return await prisma.item.findMany({
    where: {
      category: category,
    },
  });
}

// [ Best ] 판매량이 가장 많은 3개의 아이템 필터링
export async function getBestItems(limit: number = 3) {
  return await prisma.item.findMany({
    orderBy: {
      sales: "desc", // 판매량 기준 내림차순 정렬
    },
    take: limit, // 상위 3개 아이템
  });
}

// [ New ] 가장 최근에 추가된 3개의 아이템 필터링
export async function getNewItems(limit: number = 3) {
  return await prisma.item.findMany({
    orderBy: {
      createdAt: "desc", // 생성 날짜 기준 내림차순 정렬
    },
    take: limit, // 상위 3개 아이템
  });
}

// 가격 범위로 아이템 필터링
export async function getItemsByPrice(minPrice: number, maxPrice: number) {
  return await prisma.item.findMany({
    where: {
      price: {
        gte: minPrice, // 최소 가격
        lte: maxPrice, // 최대 가격
      },
    },
  });
}

// id로 아이템 가져오기
export async function getItemById(id: string) {
  if (!id) {
    throw new Error("id는 필수입니다.");
  }

  const numericId = Number(id);
  if (isNaN(numericId)) {
    throw new Error("올바른 id 값이 아닙니다.");
  }

  return prisma.item.findUnique({
    where: { id: numericId },
  });
}

// 검색어로 아이템 찾기
export async function getItemsBySearchTerm(searchTerm: string) {
  try {
    if (!searchTerm) return []; // 검색어 없으면 빈 배열 반환

    // 소문자로 변환하여 검색
    const items = await prisma.item.findMany({
      where: {
        title: {
          // title을 소문자로 변환하여 비교
          // raw query로 대소문자 구분 없이 검색
          contains: searchTerm.toLowerCase(),
        },
      },
    });

    return items;
  } catch (error) {
    console.error("데이터베이스 검색 오류:", error);
    throw new Error("검색 중 오류 발생");
  }
}
