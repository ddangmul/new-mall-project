"use client";
import { Item } from "@/assets/types";
import { useSearchParams } from "next/navigation";
import Explanation from "@/components/detail-item-content/explanation";
import QnA from "@/components/detail-item-content/qna";
import Review from "@/components/detail-item-content/review";
import Returns from "@/components/detail-item-content/returns";

export default function ContentContainer({ item }: { item: Item }) {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "Explanation";

  let RenderedComponent;
  switch (mode) {
    case "Explanation":
      RenderedComponent = <Explanation item={item} />;
      break;
    case "QnA":
      RenderedComponent = <QnA />;
      break;
    case "Review":
      RenderedComponent = <Review item={item} />;
      break;
    case "Returns":
      RenderedComponent = <Returns />;
      break;
  }

  return <>{RenderedComponent}</>;
}
