import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Image } from "@heroui/react";

import { ArrowLeft, ArrowRight } from "@/components/icons";

export default function Carousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl">
      <div className="relative h-96 w-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentIndex}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            initial={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              alt={`Slide ${currentIndex}`}
              className="absolute inset-0 w-full h-full object-cover"
              height="auto"
              src={images[currentIndex]}
              width="auto"
            />
          </motion.div>
        </AnimatePresence>

        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition z-20"
          onClick={prevSlide}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-75 transition z-20"
          onClick={nextSlide}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === currentIndex ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
