"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ItemsGrid from "@/components/items/items-grid";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  // const [isLoading, setIsLoadig] = useSearchParams();

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
        .then((data) => setProducts(data))
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchTerm]);

  const memorizedItems = useMemo(() => {
    return <ItemsGrid items={products} />;
  }, [products]);

  return (
    <section className="searchPage py-6 md:py-8 lg:py-10 px-4 md:px-8 lg:px-14">
      <div className="cart-heading flex gap-2 lg:gap-3 items-center">
        <span className="text-xl md:text-2xl lg:text-3xl py-4 md:py-8 lg:py-10">
          <span className="font-serif">'{searchTerm}'</span> 관련 검색 결과
        </span>
        <span className="text-sm md:text-lg lg:text-xl bg-foreground text-background px-2 rounded-full">
          {products.length}
        </span>
      </div>
      {products.length === 0 ? (
        <p>검색어와 일치하는 제품이 없습니다.</p>
      ) : (
        memorizedItems
      )}
    </section>
  );
};

export default SearchPage;
