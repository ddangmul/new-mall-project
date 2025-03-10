import Link from "next/link";

const ItemsCategory: React.FC = () => {
  return (
    <section className="items_category">
      <nav className="items_category_inner py-10">
        <ul className="flex justify-center gap-14 text-xl font-serif">
          <li>
            <Link href="/Best">Best</Link>
          </li>
          <li>
            <Link href="/New">New</Link>
          </li>
          <li>
            <Link href="/HomeCare">Home Care</Link>
          </li>
          <li>
            <Link href="/FabricCare">Fabric Care</Link>
          </li>
          <li>
            <Link href="/HandBody">Hand & Body</Link>
          </li>
        </ul>
      </nav>
    </section>
  );
};
export default ItemsCategory;
