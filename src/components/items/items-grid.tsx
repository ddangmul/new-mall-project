"use client";

import React from "react";
import ItemCard from "./item-card";
import { Item } from "../../../types/types";
import { useCart } from "@/store/cart-context";

import Link from "next/link";

const ItemsGrid: React.FC<{ items: Item[] }> = ({ items }) => {
  const { addCartHandler, openModal } = useCart();

  return (
    <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-8">
      {items.map((item) => (
        <li key={item.id}>
          <Link href={`${item.category}/${item.id}`}>
            <ItemCard item={item} />
          </Link>
          <button
            className="bg-[#f8f7f5] text-[#2a2828] px-3 py-1 rounded-sm drop-shadow-sm mt-[-4] mb-2"
            onClick={() => {
              addCartHandler(item, 1);
              openModal();
            }}
          >
            Cart
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ItemsGrid;
