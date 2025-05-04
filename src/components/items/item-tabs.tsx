"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ItemTabs() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="prod_heading_info_inner text-md xl:text-xl">
      <ul className="flex gap-5 mb-3">
        {["제품 설명", "전성분", "사용 방법"].map((tab, index) => (
          <li key={index}>
            <a
              href="#none"
              onClick={() => setActiveTab(index + 1)}
              className={`cursor-pointer ${
                activeTab === index + 1
                  ? "font-semibold border-b-2 pb-1 border-[#9f9a98]"
                  : ""
              }`}
            >
              {tab}
            </a>
          </li>
        ))}
      </ul>

      <div className="min-h-[50px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 1 && <p>제품 설명 정보</p>}
            {activeTab === 2 && <p>전성분 정보</p>}
            {activeTab === 3 && <p>사용 방법 정보</p>}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
