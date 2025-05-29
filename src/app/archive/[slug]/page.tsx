import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = Promise<{ slug: string }>;

export default async function ArchiveDetailPage({ params }: { params: Props }) {
  const slug = (await params).slug;

  const archive = await prisma.archive.findUnique({
    where: { slug },
  });

  if (!archive) notFound();

  return (
    <main className="mt-16 lg:mt-20 px-4 lg:px-10">
      <h1 className="font-serif text-xl md:text-2xl lg:text-3xl font-seri pt-8 lg:pt-10 mb-2 lg:mb-6">
        {archive.title}
      </h1>
      <section className="mb-6">
        <h2 className="text-sm md:text-md lg:text-lg font-semibold mb-10">
          {archive.description}
        </h2>
        <p className="h-[100rem] bg-amber-50 text-center pt-10 text-sm">
          해당 아카이브에 관한 상세 내용 이미지
        </p>
      </section>
    </main>
  );
}
