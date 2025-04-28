import ItemsGrid from "@/components/items/items-grid";
import MainImage from "@/components/main-img/main-image";
import ItemsCategory from "@/components/nav-bar/items_category_nav";
import "react-toastify/dist/ReactToastify.css";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const items = await prisma.item.findMany();

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
