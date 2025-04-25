import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  await prisma.archive.deleteMany();
  await prisma.item.deleteMany();

  await prisma.item.createMany({
    data: [
      {
        title: "Corn Incense",
        image: "/items/homecare.jpg",
        category: "HomeCare",
        description: "home-care corn-incense",
        price: 16000,
        sales: 37,
      },
      {
        title: "Stick Incense",
        image: "/items/homecare2.jpg",
        category: "HomeCare",
        description: "home-care stick-incense",
        price: 12000,
        sales: 30,
      },
      {
        title: "Fabric Spray - Cedarwood",
        image: "/items/fabriccare.jpg",
        category: "FabricCare",
        description: "fabric-care spary 1",
        price: 15000,
        sales: 20,
      },
      {
        title: "Fabric Spray - Smoky Wood",
        image: "/items/fabriccare.jpg",
        category: "FabricCare",
        description: "fabric-care spary - Smoky Wood",
        price: 15000,
        sales: 18,
      },
      {
        title: "Fabric Spray - Floral Musk",
        image: "/items/fabriccare.jpg",
        category: "FabricCare",
        description: "fabric-care spary - Floral Musk",
        price: 15000,
        sales: 23,
      },
      {
        title: "Perfume - Cedarwood",
        image: "/items/handbodycare.jpg",
        category: "HandBody",
        description: "perfume - Cedarwood",
        price: 15000,
        sales: 31,
      },
      {
        title: "Perfume - Smoky Wood",
        image: "/items/handbodycare.jpg",
        category: "HandBody",
        description: "perfume - Smoky Wood",
        price: 15000,
        sales: 35,
      },
      {
        title: "Perfume - Floral Musk",
        image: "/items/handbodycare.jpg",
        category: "HandBody",
        description: "perfume - Floral Musk",
        price: 15000,
        sales: 29,
      },
      {
        title: "HandCream - Cedarwood",
        image: "/items/handbodycare2.jpg",
        category: "HandBody",
        description: "handcream - Cedarwood",
        price: 11000,
        sales: 16,
      },
      {
        title: "HandCream - Smoky Wood",
        image: "/items/handbodycare2.jpg",
        category: "HandBody",
        description: "handcream - Smoky Wood",
        price: 11000,
        sales: 17,
      },
      {
        title: "HandCream - Floral Musk",
        image: "/items/handbodycare2.jpg",
        category: "HandBody",
        description: "handcream - Floral Musk",
        price: 11000,
        sales: 13,
      },
    ],
  });

  const archives = [
    {
      title: "2025 New Year Edition",
      category: "Edition",
      description: "모든 걸 비우고 새로 시작하는 정화의 향",
      image: "/archive/archive1.jpg",
    },
    {
      title: "Hinoki Hand Cream",
      category: "Collaboration",
      description: "LUMIERÉ PARCEL x YUME",
      image: "/archive/archive2.jpg",
    },
    {
      title: "Cedar Wood",
      category: "Edition",
      description: "정적인 평화로움",
      image: "/archive/archive3.jpg",
    },
  ];

  for (const archive of archives) {
    await prisma.archive.create({
      data: {
        title: archive.title,
        slug: slugify(archive.title, { lower: true }),
        category: archive.category,
        description: archive.description,
        image: archive.image,
      },
    });
  }

  console.log("초기 데이터 삽입 완료!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
