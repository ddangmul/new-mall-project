import ItemsGrid from "@/components/items/items-grid";
import { getNewItems } from "@/lib/items/queries";

export default async function New() {
  const newItems = await getNewItems();

  return (
    <section>
      <ItemsGrid items={newItems} />
    </section>
  );
}
