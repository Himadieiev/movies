import {useState, useEffect, useRef} from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setIsVisible(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 1500);
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
    if (window.scrollY > 150) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
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
          if (window.scrollY > 150) {
            timeoutRef.current = setTimeout(() => {
              setIsVisible(false);
            }, 1500);
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
