type Props = {
  params: { slug: string };
};

// 데이터 직접 불러올지 prop으로 받을지
export default async function ArchiveDetailPage({ params }: Props) {
  const { slug } = await params;
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{slug}</h1>
    </main>
  );
}
