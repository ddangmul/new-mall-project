import ItemsGrid from "@/components/items/items-grid";
import MainImage from "@/components/main-img/main-image";
import ItemsCategory from "@/components/nav-bar/items_category_nav";
import { getAllItems } from "@/lib/items/queries";

export default async function Home() {
  const items = await getAllItems();

  return (
    <>
      <MainImage />
      <ItemsCategory />
      <section className="home-container px-4 py-5">
        <ItemsGrid items={items} />
      </section>
    </>
  );
}
