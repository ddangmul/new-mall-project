import Link from "next/link";
import { Item } from "../../../types/types";

export default function Review({ item }: { item: Item }) {
  return (
    <article>
      <div className="post-add-btn my-6">
        <Link
          href="/"
          className="bg-[#252422] text-[#d6d2c8] grow-1 p-3 rounded-sm shadow-2xs
            shadow-[#151312]"
        >
          구매평 작성
        </Link>
      </div>
      <div className="review-posts-wrap">
        <ul className="review-posts text-center border-t-2 border-[#5e5d5d]">
          <li className="flex justify-between px-4 border-b-1 py-4 border-[#b4b1af]">
            <div className="flex flex-col items-start review-title-left">
              <span>[ {item.title} ]</span>
              <span className="text-[#262626]">review 게시글 제목</span>
            </div>
            <div className="flex flex-col items-start review-title-left">
              <span>작성자명</span>
              <span>작성일자</span>
            </div>
          </li>
        </ul>
      </div>
    </article>
  );
}
