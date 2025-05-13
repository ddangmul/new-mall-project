import Image from "next/image";
import { Item } from "../../../types/types";
import { formatterPrice } from "@/utils/formatter";

const ItemCard: React.FC<{ item: Item }> = ({ item }) => {
  const { title, image, price, description } = item;

  // price 화폐 형식으로 변환
  const formattedPrice = formatterPrice(price);

  return (
    <div className="product-item-card font-serif text-lg text-[#2a2828] mb-8 flex flex-col gap-y-1.5">
      <span className="mb-2">
        <Image
          src={image}
          alt={description}
          width={500}
          height={700}
          style={{ width: "100%", height: "auto" }}
          loading="lazy"
        />
      </span>
      <span>{title}</span>
      <span>{formattedPrice}</span>
    </div>
  );
};

export default ItemCard;
