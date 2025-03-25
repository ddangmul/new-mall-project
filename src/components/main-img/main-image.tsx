"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const MainImage: React.FC = () => {
  const images = [
    { src: "/homeImage/home-image4.jpg" },
    { src: "/homeImage/home-image2.jpg" },
    // { src: "/homeImage/home-image1.jpg" },
    // { src: "/homeImage/home-image5.jpg" },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // 5초마다 이미지 변경

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="main_image">
      <div className="main_image_wrap relative">
        <div
          className="image-container"
          style={{
            position: "relative",
            width: "100%",
            height: "700px",
            overflow: "hidden",
          }}
        >
          <AnimatePresence>
            {images.map(
              (image, index) =>
                currentIndex === index && (
                  <motion.img
                    key={image.src}
                    src={image.src}
                    alt={`image-${index}`}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      ...image.style,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 1 } }}
                  />
                )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
export default MainImage;
