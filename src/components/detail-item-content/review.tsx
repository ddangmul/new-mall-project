import Link from "next/link";
import { Item } from "../../assets/types/types";

export default function Review({ item }: { item: Item }) {
  return (
    <article>
      <div className="post-add-btn my-6 text-md">
        <Link
          href="/"
          className="bg-foreground text-background px-4 py-2 rounded-sm"
        >
          구매평 작성
        </Link>
      </div>
      <div className="review-posts-wrap">
        <ul className="review-posts text-center border-t-2 border-[#5e5d5d]">
          <li className="flex justify-between px-4 border-b-1 py-4 border-[#b4b1af]">
            <div className="flex flex-col items-start review-title-left">
              <span>[ {item.title} ]</span>
              <span>review 게시글 제목</span>
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
