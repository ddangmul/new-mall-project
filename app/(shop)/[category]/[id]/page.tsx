import { Item } from "@/assets/types";
import Image from "next/image";
import { getItemById } from "@/lib/items/queries";
import { formatterPrice } from "@/utils/formatter";
import ItemTabs from "@/components/items/item-tabs";
import ItemQuantity from "@/components/items/item-quantity";
import DetailContentsNavBar from "@/components/nav-bar/items-detail-nav";
import ContentContainer from "@/components/detail-item-content/content-container";

export default async function ItemDetailPage({
  params,
}: {
  params: { category: string; id: string };
}) {
  const { id } = await params;

  const item: Item = await getItemById(parseInt(id));

  const formattedPrice = formatterPrice(item.price);

  return (
    <div className="item-detail-wrap px-40 py-20">
      <div className="item-datail-inner">
        <section className="item-heading-info grid xl:grid-cols-2 gap-12">
          <div className="item-img-slider">
            <Image
              src={item.image}
              width={400}
              height={500}
              style={{ width: "100%", height: "auto" }}
              alt={item.title}
            ></Image>
          </div>
          <div className="item-info-txt my-2 space-y-12">
            <div className="item-heading-txt space-y-5 font-serif">
              <h1 className="text-4xl">{item.title}</h1>
              <h2 className="text-3xl">{formattedPrice}</h2>
            </div>
            <ItemTabs />
            <ItemQuantity item={item} />
          </div>
        </section>
        <section className="item-main-info text-[#505050]">
          <div className="detail-contents-nav mt-24 p-20 mb-8 border-b-1 border-[#a0a09f]">
            <DetailContentsNavBar />
          </div>
          <div className="detail-contents-wrap">
            <ContentContainer item={item} />
          </div>
        </section>
      </div>
    </div>
  );
}
