import {useEffect, useRef} from "react";

export const useModal = (isOpen, onClose) => {
  const focusRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    focusRef.current?.focus();

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  return focusRef;
};
