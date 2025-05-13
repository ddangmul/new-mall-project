import { ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      const shouldShow = window.scrollY > 100 && window.innerWidth >= 320; // 모바일 포함
      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleVisibility);
    window.addEventListener("resize", handleVisibility);

    // 초기 렌더 시 한 번 실행
    handleVisibility();

    return () => {
      window.removeEventListener("scroll", handleVisibility);
      window.removeEventListener("resize", handleVisibility);
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
            <ChevronUp size={20} />
          </button>
          <button
            onClick={scrollToBottom}
            className="bg-[#e1d8d6] p-2 rounded-full shadow hover:bg-[#c0b0ac] transition"
            aria-label="최하단으로 이동"
          >
            <ChevronDown size={20} />
          </button>
        </>
      )}
    </div>
  );
};

export default ScrollButtons;
