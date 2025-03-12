import { PrismaClient as PrismaClient1 } from "@prisma/client"; // 첫 번째 클라이언트
import { PrismaClient as PrismaClient2 } from "@prisma/client";

const prisma1 = new PrismaClient1({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const prisma2 = new PrismaClient2({
  datasources: {
    db: {
      url: process.env.DATABASE_URL_2,
    },
  },
});

export { prisma1, prisma2 };
