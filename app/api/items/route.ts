// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/lib/prisma";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     const items = await prisma.item.findMany();
//     res.status(200).json(items);
//   } else if (req.method === "POST") {
//     const { name, price, description } = req.body;
//     const newItem = await prisma.item.create({
//       data: { name, price: Number(price), description },
//     });
//     res.status(201).json(newItem);
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }
