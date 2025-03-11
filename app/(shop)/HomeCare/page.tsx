import ItemsGrid from "@/components/items/items-grid";
import { getItemsByCategory } from "@/lib/items/queries";

export default async function HomeCare() {
  const homeCareItems = await getItemsByCategory("HomeCare");
  return (
    <section>
      <ItemsGrid items={homeCareItems} />
    </section>
  );
}
