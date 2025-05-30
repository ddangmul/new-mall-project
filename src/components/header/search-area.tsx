"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import searchIcon from "../../assets/icons/search.png";
import Image from "next/image";

const SearchArea = ({ id }: { id: string }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  function handleSearch() {
    const trimmed = searchTerm.trim();
    if (trimmed.length > 0) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
    setSearchTerm("");
  }

  return (
    <span className="flex items-center ml-2 xl:ml-4 relative">
      <p className="font-serif text-xs md:text-lg">Search</p>
      <label htmlFor={id}></label>
      <input
        id={id}
        name="searchTerm"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="text-xs md:text-sm lg:text-md border-b-1 md:border-b-amber-50 md:text-white max-w-20 mx-2 bg-transparent outline-none font-sans"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enter 키로 검색 가능
        autoComplete="off"
      ></input>
      <Image
        src={searchIcon}
        alt="search-icon"
        width={10}
        height={10}
        className="absolute right-2 filter md:invert cursor-pointer"
        loading="lazy"
      />
    </span>
  );
};
export default SearchArea;
