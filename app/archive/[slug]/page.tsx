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
    <main className="p-8">
      <h1 className="text-2xl font-bold">{archive.title}</h1>
      <p>아래는 해당 archive 게시글 이미지 공간입니다.</p>
    </main>
  );
}
