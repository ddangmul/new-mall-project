"use client";

import React from "react";
import ItemCard from "./item-card";
import { Item } from "../../../types/types";
import { useCart } from "@/store/cart-context";

import Link from "next/link";

const ItemsGrid: React.FC<{ items: Item[] }> = ({ items }) => {
  const { addCartHandler, openModal } = useCart();

  return (
    <ul className="grid grid-cols-2 xl:grid-cols-3 gap-6 space-y-6">
      {items.map((item, index) => (
        <div key={index}>
          <Link href={`${item.category}/${item.id}`}>
            <li>
              <ItemCard item={item} />
            </li>
          </Link>
          <button
            className=" bg-[#f8f7f5] text-[#2a2828] px-3 py-1.5 rounded-sm  drop-shadow-sm"
            onClick={() => {
              addCartHandler(item, 1);
              openModal();
            }}
          >
            Cart
          </button>
        </div>
      ))}
    </ul>
  );
};

export default ItemsGrid;
