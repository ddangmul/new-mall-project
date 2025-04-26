"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import LoadingIndicator from "@/components/loading-indicator";

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
    <main className="mt-20">
      <h1 className="text-4xl font-serif p-4 mb-8">Archive</h1>
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
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px]">
                <Image
                  src={archive.image}
                  alt={archive.slug}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex justify-between px-6 py-8">
                <span className="text-xl font-serif text-[#868686]">
                  {archive.category}
                </span>
                <div className="flex flex-col text-right">
                  <span className="text-2xl font-serif">{archive.title}</span>
                  <span className="text-[#868686]">{archive.description}</span>
                </div>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </main>
  );
}
