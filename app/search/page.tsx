"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ItemsGrid from "@/components/items/items-grid";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`)
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("API 요청 실패");
          }
          const data = await res.json();
          return data;
        })
        .then((data) => setProducts(data));
    }
  }, [searchTerm]);

  return (
    <section className="searchPage py-10 px-20">
      <div className="cart-heading flex gap-3 items-center">
        <span className="text-3xl py-10">
          <span className="font-serif">'{searchTerm}'</span> 관련 검색 결과
        </span>
        <span className="text-xl bg-[#494643] text-[#f2f0eb] px-2.5 rounded-full">
          {products.length}
        </span>
      </div>
      {products.length === 0 ? (
        <p>검색어와 일치하는 제품이 없습니다.</p>
      ) : (
        <ItemsGrid items={products} />
      )}
    </section>
  );
};

export default SearchPage;
