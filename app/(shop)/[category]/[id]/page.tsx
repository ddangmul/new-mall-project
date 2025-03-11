import { Item } from "@/assets/types";
import Image from "next/image";
import { getItemById } from "@/lib/items/queries";
import { formatterPrice } from "@/utils/formatter";
import ItemTabs from "@/components/items/item-tabs";
import ItemQuantity from "@/components/items/item-quantity";

export default async function ItemDetailPage({
  params,
}: {
  params: { category: string; id: string };
}) {
  const { id } = await params;

  const item: Item = await getItemById(parseInt(id));

  const formattedPrice = formatterPrice(item.price);

  return (
    <div className="item-detail-wrap py-10 px-5">
      <div className="item-datail-inner">
        <section className="item-heading-info grid xl:grid-cols-2 gap-10">
          <div className="item-img-slider">
            <Image
              src={item.image}
              width={600}
              height={600}
              style={{ width: "100%", height: "auto" }}
              alt={item.title}
            ></Image>
          </div>
          <div className="item-info-txt my-2 space-y-14">
            <div className="item-heading-txt space-y-5 font-serif">
              <h1 className="text-4xl">{item.title}</h1>
              <h2 className="text-3xl">{formattedPrice}</h2>
            </div>
            <ItemTabs />
            <ItemQuantity item={item} />
          </div>
        </section>
        <section className="item-detail-description">
          {/* 아이템별 상세정보 세로 이미지 배열 map() flex-col로 렌더링 */}
        </section>
        <section className="q&a">{/* q&a */}</section>
        <section className="review">{/* 리뷰 게시글 */}</section>
        <section className="shipping_return">{/* 배송 & 환불 정책 */}</section>
      </div>
    </div>
  );
}
