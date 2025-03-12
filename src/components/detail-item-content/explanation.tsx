import { Item } from "@/assets/types";

export default function Explanation({ item }: { item: Item }) {
  return (
    <article>
      <p>{item.title}</p>
      <p>{item.description}</p>
    </article>
  );
}
