import { Item } from "../../../types/types";

export default function Explanation({ item }: { item: Item }) {
  return (
    <article className="text-center py-10 space-y-6">
      <p className="text-xl py-6 font-serif">{item.title}</p>
      <p className="text-lg py-14">상세 설명글</p>
      <p className="text-lg py-14 h-200">상세 이미지들 세로 나열</p>
    </article>
  );
}
