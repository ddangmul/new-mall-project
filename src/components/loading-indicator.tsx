"use client";
import { motion } from "framer-motion";

export default function LoadingIndicator() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="w-24 h-24 bg-[#313030] rounded-full"
        animate={{
          scale: [1, 1.5, 1], // 크기 변화
          rotate: [0, 360], // 회전 애니메이션
        }}
        transition={{
          duration: 1.5, // 1.5초 동안 애니메이션
          repeat: Infinity, // 무한 반복
          repeatType: "loop", // 루프 반복
        }}
      />
    </div>
  );
}
