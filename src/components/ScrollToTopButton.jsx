import {useState, useEffect, useRef} from "react";

const SCROLL_THRESHOLD = 150;
const HIDE_DELAY = 1500;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setIsVisible(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, HIDE_DELAY);
      } else {
        setIsVisible(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  const handleTouchStart = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleTouchEnd = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, HIDE_DELAY);
    }
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        onMouseEnter={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }}
        onMouseLeave={() => {
          if (window.scrollY > SCROLL_THRESHOLD) {
            timeoutRef.current = setTimeout(() => {
              setIsVisible(false);
            }, HIDE_DELAY);
          }
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="scroll-to-top"
        aria-label="Scroll to top"
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;
