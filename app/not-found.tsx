import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold">
        404 error: 페이지를 찾을 수 없습니다.
      </h1>
      <p className="mt-4 text-gray-600">
        요청하신 페이지가 존재하지 않거나 삭제되었습니다.
      </p>
      <Link href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
