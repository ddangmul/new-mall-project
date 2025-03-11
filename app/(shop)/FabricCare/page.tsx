import ItemsGrid from "@/components/items/items-grid";
import { getItemsByCategory } from "@/lib/items/queries";

export default async function FabricCare() {
  const fabricCareItems = await getItemsByCategory("FabricCare");
  return (
    <section>
      <ItemsGrid items={fabricCareItems} />
    </section>
  );
}
