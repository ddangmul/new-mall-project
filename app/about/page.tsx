import { Link } from "lucide-react";

export default function About() {
  return (
    <main className="p-10 mt-4 lg:mt-10 mx-2 md:mx-6 lg:mx-20 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">About This Project</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">👋 개발자 소개</h2>
        <p>
          안녕하세요! 저는 프론트엔드 개발자 <strong>정은경</strong>입니다.
          React와 TypeScript를 기반으로 한 웹 애플리케이션 개발을 공부하고
          있습니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🛍️ 프로젝트 소개</h2>
        <p>
          이 쇼핑몰 웹사이트는 <strong>포트폴리오 및 기술 시연</strong>을
          목적으로 제작되었으며, 실제 상품 판매는 이루어지지 않습니다. Next.js
          App Router, Tailwind CSS, TypeScript를 활용하여 모던한 웹 개발 방식을
          구현했습니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🛠️ 사용 기술</h2>
        <ul className="list-disc list-inside">
          <li>Next.js 13 (App Router)</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Responsive Web Design</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📫 연락처</h2>
        <p>
          e-mail:{" "}
          <Link
            href="mailto:e.gyeong@gmail.com"
            className="text-blue-600 underline"
          >
            e.gyeong829@gmail.com
          </Link>
        </p>
      </section>
    </main>
  );
}
