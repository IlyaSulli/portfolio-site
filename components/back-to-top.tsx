import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";

const ArrowUpIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <svg
    fill="none"
    height={size}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    width={size}
  >
    <path d="m18 15-6-6-6 6" />
  </svg>
);

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when user scrolls down 2x screen height
      const threshold = window.innerHeight * 2;

      if (window.pageYOffset > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      isIconOnly
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 min-w-12 h-12 rounded-full shadow-lg transition-all duration-500 hover:scale-110
        ${isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      color="primary"
      variant="solid"
      onPress={scrollToTop}
    >
      <ArrowUpIcon size={20} />
    </Button>
  );
}
