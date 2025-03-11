import ItemsGrid from "@/components/items/items-grid";
import { getItemsByCategory } from "@/lib/items/queries";

export default async function HandBody() {
  const handbodyItems = await getItemsByCategory("HandBody");
  return (
    <section>
      <ItemsGrid items={handbodyItems} />
    </section>
  );
}
