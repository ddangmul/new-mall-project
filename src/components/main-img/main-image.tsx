"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const MainImage: React.FC = () => {
  const images = useMemo(
    () => [
      {
        // title: "Corn Incense",
        // category: "HomeCare",
        src: "/homeImage/home-image4.jpg",
      },
      { src: "/homeImage/home-image2.jpg" },
      { src: "/homeImage/home-image1.jpg" },
    ],
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // 5초마다 이미지 변경

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="main_image">
      <div className="main_image_wrap relativ">
        <div className="image-container relative w-full  h-[400px] md:h-[600px] lg:h-[700px]  overflow-hidden">
          <AnimatePresence>
            {images.map(
              (image, index) =>
                currentIndex === index && (
                  <motion.div
                    key={image.src}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 1 } }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={image.src}
                      alt={`image-${index}`}
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                    />
                  </motion.div>
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
export default MainImage;
