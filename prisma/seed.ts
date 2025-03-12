import { PrismaClient } from "./generated/items-client";

const itemsPrisma = new PrismaClient();

async function main() {
  await itemsPrisma.item.deleteMany();

  await itemsPrisma.item.createMany({
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

  console.log("초기 데이터 삽입 완료!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await itemsPrisma.$disconnect();
  });
