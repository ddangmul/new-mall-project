import Link from "next/link";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Archive() {
  const archives = await prisma.archive.findMany();
  return (
    <main className="mt-20 mx-14">
      <h1 className="text-4xl font-serif mb-10">Archive</h1>
      <ul className="w-full flex flex-col items-center space-y-8">
        {archives.map((archive) => (
          <li key={archive.id} className="w-full flex flex-col ">
            <Link href={`/archive/${archive.slug}`}>
              <div className="w-full h-[400px] relative">
                <Image
                  src={archive.image}
                  alt={archive.slug}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex justify-between px-4 py-8">
                <span className="text-xl font-serif">{archive.category}</span>
                <div className="flex flex-col text-right">
                  <span className="text-2xl font-serif">{archive.title}</span>
                  <span>{archive.description}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
