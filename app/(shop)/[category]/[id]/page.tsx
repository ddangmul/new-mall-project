import { Item } from "../../../../types/types";
import Image from "next/image";
import { getItemById } from "@/lib/items/queries";
import { formatterPrice } from "@/utils/formatter";
import { notFound } from "next/navigation";
import ItemTabs from "@/components/items/item-tabs";
import ItemQuantity from "@/components/items/item-quantity";
import DetailContentsNavBar from "@/components/nav-bar/items-detail-nav";
import ContentContainer from "@/components/detail-item-content/content-container";
import { Metadata } from "next";

interface PageProps {
  params: {
    category: string;
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item: Item = await getItemById(id);

  if (!item) {
    return {
      title: "상품을 찾을 수 없습니다",
      description: "요청하신 상품이 존재하지 않습니다.",
    };
  }

  return {
    title: item.title,
    description: item.description,
    openGraph: {
      images: [item.image],
    },
    keywords: [
      "쇼핑몰",
      "인센스",
      "향수",
      "향낭",
      item.title,
      item.description,
      item.category,
    ],
  };
}

export default async function ItemDetailPage({ params }: PageProps) {
  try {
    // nextjs 14부터 params도 비동기적으로 제공
    const { id } = await params;
    const item: Item = await getItemById(id);

    if (!item) {
      return notFound();
    }

    const formattedPrice = formatterPrice(item.price);

    return (
      <div className="item-detail-wrap mx-10 xl:mx-20 py-18 overflow-hidden">
        <div className="item-datail-inner">
          <section className="item-heading-info grid grid-cols-1 space-y-10 xl:grid-cols-2 xl:gap-4">
            <div className="item-img-slider">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={900}
                className="w-[400px] xl:w-full max-w-[600px] mx-auto"
                loading="lazy"
              ></Image>
            </div>
            <div className="item-info-txt my-2 space-y-10">
              <div className="item-heading-txt space-y-5 font-serif">
                <h1 className="text-2xl xl:text-3xl">{item.title}</h1>
                <h2 className="text-xl xl:text-2xl">{formattedPrice}</h2>
              </div>
              <ItemTabs />
              <ItemQuantity item={item} />
            </div>
          </section>
          <section className="item-main-info text-[#505050]">
            <div className="detail-contents-nav mt-24 py-20 border-b-1 border-[#a0a09f]">
              <DetailContentsNavBar />
            </div>
            <div className="detail-contents-wrap">
              <ContentContainer item={item} />
            </div>
          </section>
        </div>
        <div className="delivery information mt-20 mb-10 space-y-4">
          <p>[ 배송안내 ] </p>
          <p>배송 방법 : 택배</p>
          <p>배송 지역 : 전국지역</p>
          <p>배송 비용 : </p>
          <p>
            - 조건부 무료: 주문 금액 35,000원 미만일 때 배송비 4,000원을
            추가합니다.
          </p>
          <p>- 제주도 및 도서산간 추가 배송비: 4,000원 </p>
          <p>배송 기간 : 2일 ~ 3일</p>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
