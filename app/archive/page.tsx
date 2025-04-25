import Link from "next/link";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function Archive() {
  const archives = await prisma.archive.findMany();
  return (
    <main className="mt-10 mx-20">
      <h1 className="text-4xl font-serif">Archive</h1>
      <ul>
        {archives.map((archive) => (
          <div key={archive.id}>
            <Link href={`/archive/${archive.slug}`}>{archive.title}</Link>
          </div>
        ))}
      </ul>
    </main>
  );
}
