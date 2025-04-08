"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import searchIcon from "../../assets/icons/search.png";
import Image from "next/image";

const SearchArea: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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
    <span className="flex items-center ml-10 relative">
      <p>Search</p>
      <input
        name="searchTerm"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border-b-1 border-b-amber-50 text-white max-w-30 mx-2 bg-transparent focus:bg-transparent outline-none"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()} // Enter 키로 검색 가능
      ></input>
      <Image
        src={searchIcon}
        alt="search-icon"
        width={10}
        height={10}
        className="absolute invert right-2"
      />
    </span>
  );
};
export default SearchArea;
