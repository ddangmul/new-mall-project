import ItemsGrid from "@/components/items/items-grid";
import { getBestItems } from "@/lib/items/queries";
import { Item } from "@/assets/types";

export default async function Best() {
  const bestItems: Item[] = await getBestItems();

  return (
    <section>
      <ItemsGrid items={bestItems} />
    </section>
  );
}
