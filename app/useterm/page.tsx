import { Link } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">이용약관</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">제1조 (목적)</h2>
        <p>
          본 이용약관은 포트폴리오 목적의 웹사이트(이하 "사이트")의 이용과
          관련하여 사용자와 개발자 간의 권리, 의무 및 책임사항을 규정함을
          목적으로 합니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">제2조 (이용 조건)</h2>
        <p>
          이 사이트는 비상업적인 개인 프로젝트로, 사용자는 모든 기능을 자유롭게
          체험할 수 있습니다. 단, 실제 거래는 이루어지지 않습니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">제3조 (콘텐츠 사용)</h2>
        <p>
          사이트에 포함된 모든 콘텐츠는 학습 및 시연 목적이며, 이미지 및 정보는
          해당 저작권자에게 귀속됩니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">제4조 (책임의 제한)</h2>
        <p>
          본 사이트는 테스트 용도로만 제공되며, 어떠한 법적 책임도 부담하지
          않습니다.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">제5조 (문의)</h2>
        <p>
          궁금하신 점은 이메일로 문의해주세요:{" "}
          <Link
            href="mailto:e.gyeong829@gmail.com"
            className="text-blue-600 underline"
          >
            hyangnang.com
          </Link>
        </p>
      </section>
    </main>
  );
}
