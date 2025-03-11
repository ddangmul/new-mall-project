import prisma from "../prisma";

// 카테고리로 아이템 필터링
export async function getItemsByCategory(category: string) {
  return await prisma.item.findMany({
    where: {
      category: category,
    },
  });
}

// [ Best ] 판매량이 가장 많은 3개의 아이템 가져오기
export async function getBestItems(limit: number = 3) {
  return await prisma.item.findMany({
    orderBy: {
      sales: "desc", // 판매량 기준 내림차순 정렬
    },
    take: limit, // 상위 3개 아이템
  });
}

// [ New ] 가장 최근에 추가된 3개의 아이템 가져오기
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
