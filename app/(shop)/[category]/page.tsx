import {
  getAllItems,
  getItemsByCategory,
  getBestItems,
  getNewItems,
} from "@/lib/items/queries";
import ItemsGrid from "@/components/items/items-grid";
import { Item } from "@/assets/types";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;

  let items: Item[];

  // 분기처리 필요
  if (category === "All") {
    items = await getAllItems();
  } else if (category === "Best") {
    items = await getBestItems();
  } else if (category === "New") {
    items = await getNewItems();
  } else {
    items = await getItemsByCategory(category);
  }

  return (
    <section className="items-container px-4 py-5">
      <ItemsGrid items={items} />
    </section>
  );
}
