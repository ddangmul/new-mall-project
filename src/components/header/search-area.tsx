"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import searchIcon from "../../assets/icons/search.png";
import Image from "next/image";

const SearchArea: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  // const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // // 300ms 후에 searchTerm 값을 debouncedSearchTerm에 업데이트
  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedSearchTerm(searchTerm);
  //   }, 300);

  //   return () => clearTimeout(handler); // 컴포넌트가 다시 렌더링될 때 타이머 클리어
  // }, [searchTerm]);

  function handleSearch() {
    const trimmed = searchTerm.trim();
    if (trimmed.length > 0) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
    setSearchTerm("");
  }

  return (
    <span className="flex items-center ml-2 xl:ml-4 relative">
      <p>Search</p>
      <label htmlFor="searchTerm"></label>
      <input
        id="searchTerm"
        name="searchTerm"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-b-1 border-b-amber-50 text-white max-w-30 mx-2 bg-transparent outline-none"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enter 키로 검색 가능
        autoComplete="off"
      ></input>
      <Image
        src={searchIcon}
        alt="search-icon"
        width={10}
        height={10}
        className="absolute invert right-2"
        loading="lazy"
      />
    </span>
  );
};
export default SearchArea;
