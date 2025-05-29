"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import LoadingIndicator from "@/components/loading-indicator";
import PageTitle from "@/components/page-title";

export default function Archive() {
  const [archives, setArchives] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const res = await fetch("/api/archive");
        const data = await res.json();
        setArchives(data);
        setLoading(false);
      } catch (error) {
        console.error("아카이브 데이터를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchArchives();
  }, []);

  if (loading) return <LoadingIndicator />;

  return (
    <main className="pt-10 md:pt-12 lg:pt-14">
      <PageTitle children="Archive" className="px-2 md:px-4" />
      <ul className="w-full flex flex-col items-center space-y-8">
        {archives.map((archive, index) => (
          <motion.li
            key={archive.id}
            className="w-full flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.15,
              ease: "easeOut",
            }}
          >
            <Link href={`/archive/${archive.slug}`}>
              <div className="relative w-full h-[200px] md:h-[300px] lg:h-[500px]">
                <Image
                  src={archive.image}
                  alt={archive.slug}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex justify-between px-4 lg:px-6 py-6 lg:py-8">
                <span className="text-sm md:text-lg lg:text-xl font-serif text-graytext">
                  {archive.category}
                </span>
                <div className="flex flex-col text-right">
                  <span className="text-md md:text-lg lg:text-2xl font-serif">
                    {archive.title}
                  </span>
                  <span className="text-graytext text-xs md:text-md lg:text-lg">
                    {archive.description}
                  </span>
                </div>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </main>
  );
}
