import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Props = {
  params: { slug: string };
};

export default async function ArchiveDetailPage({ params }: Props) {
  const { slug } = await params;

  const archive = await prisma.archive.findUnique({
    where: { slug },
  });

  if (!archive) notFound();

  return (
    <main className="p-10 px-10 mt-10">
      <h1 className="text-3xl font-bold mb-6">{archive.title}</h1>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-10">{archive.description}</h2>
        <p className="h-[100rem] bg-amber-50 p-10">
          해당 아카이브에 관한 상세 내용 이미지 요소.
        </p>
      </section>
    </main>
  );
}
