import {
  getAllItems,
  getItemsByCategory,
  getBestItems,
  getNewItems,
} from "@/lib/items/queries";
import ItemsGrid from "@/components/items/items-grid";
import { Item } from "@/assets/types/types";
import { notFound } from "next/navigation";

type Props = Promise<{
  category: string;
}>;

export default async function CategoryPage({ params }: { params: Props }) {
  const category = (await params).category;

  let items: Item[];

  if (category === "All") {
    items = await getAllItems();
  } else if (category === "Best") {
    items = await getBestItems();
  } else if (category === "New") {
    items = await getNewItems();
  } else {
    items = await getItemsByCategory(category);
  }

  if (!items) {
    notFound();
  }

  return (
    <section className="items-container px-4 py-5">
      <ItemsGrid items={items} />
    </section>
  );
}
