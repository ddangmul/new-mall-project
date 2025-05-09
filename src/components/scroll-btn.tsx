import { ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100); // 스크롤 조금 내렸을 때 보이게
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth > 768 && window.scrollY > 100);
    };
    window.addEventListener("scroll", handleResize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {isVisible && (
        <>
          <button
            onClick={scrollToTop}
            className="bg-[#e1d8d6] p-2 rounded-full shadow hover:bg-[#c0b0ac] transition"
            aria-label="최상단으로 이동"
          >
            <ChevronUp />
          </button>
          <button
            onClick={scrollToBottom}
            className="bg-[#e1d8d6] p-2 rounded-full shadow hover:bg-[#c0b0ac] transition"
            aria-label="최하단으로 이동"
          >
            <ChevronDown />
          </button>
        </>
      )}
    </div>
  );
};

export default ScrollButtons;
