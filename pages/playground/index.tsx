import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { Maximize2, Minus, Plus, X } from "lucide-react";

import { DraggableContainer, GridBody, GridItem } from "@/components/infiniteGrid";
import { AppNavbar } from "@/components/navbar";
import { playgroundImages } from "@/config/playground";

const playgroundCategories = [
  "All",
  ...Array.from(new Set(playgroundImages.flatMap((image) => image.category))),
];

export default function PlaygroundPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<(typeof playgroundImages)[number] | null>(
    null,
  );
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const positionRef = useRef(position);
  const panStart = useRef({ x: 0, y: 0, positionX: 0, positionY: 0 });
  const categoryScrollerRef = useRef<HTMLDivElement>(null);
  const categoryDrag = useRef({ isDragging: false, startX: 0, startScrollLeft: 0 });
  const [settledImageIds, setSettledImageIds] = useState<Set<number>>(new Set());

  const filteredImages =
    selectedCategory === "All"
      ? playgroundImages
      : playgroundImages.filter((image) => image.category.includes(selectedCategory));

  const isGalleryLoading = filteredImages.some((image) => !settledImageIds.has(image.id));

  useEffect(() => {
    positionRef.current = position;
  }, [position]);

  const handleImageSettled = (imageId: number) => {
    setSettledImageIds((currentIds) => {
      if (currentIds.has(imageId)) return currentIds;

      return new Set(currentIds).add(imageId);
    });
  };

  const handleImageOpen = (image: (typeof playgroundImages)[number]) => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setSelectedImage(image);
  };

  const handleCategoryPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const scroller = categoryScrollerRef.current;
    if (!scroller) return;

    categoryDrag.current = {
      isDragging: true,
      startX: event.clientX,
      startScrollLeft: scroller.scrollLeft,
    };
  };

  const handleCategoryPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const scroller = categoryScrollerRef.current;
    if (!scroller || !categoryDrag.current.isDragging) return;

    scroller.scrollLeft =
      categoryDrag.current.startScrollLeft - (event.clientX - categoryDrag.current.startX);
    event.preventDefault();
  };

  const handleCategoryPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    categoryDrag.current.isDragging = false;
  };

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [selectedImage]);

  const changeZoom = (amount: number) => {
    setZoom((currentZoom) => {
      const nextZoom = Math.min(4, Math.max(1, currentZoom + amount));

      if (nextZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }

      return nextZoom;
    });
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    changeZoom(event.deltaY < 0 ? 0.25 : -0.25);
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (zoom <= 1) return;

    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);

    panStart.current = {
      x: event.clientX,
      y: event.clientY,
      positionX: positionRef.current.x,
      positionY: positionRef.current.y,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;

    event.preventDefault();
    event.stopPropagation();

    setPosition({
      x: panStart.current.positionX + event.clientX - panStart.current.x,
      y: panStart.current.positionY + event.clientY - panStart.current.y,
    });
  };

  const handlePointerEnd = (event: ReactPointerEvent<HTMLImageElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    event.stopPropagation();
  };

  return (
    <div className="relative h-dvh w-screen overflow-hidden">
      <div className="absolute inset-x-0 top-0 z-20">
        <AppNavbar />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-20 z-30 flex justify-center px-4 md:top-24">
        <div
          ref={categoryScrollerRef}
          className="pointer-events-auto w-fit max-w-[calc(100vw-2rem)] cursor-grab overflow-x-auto rounded-full border border-divider bg-background/80 p-1 shadow-small backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden active:cursor-grabbing"
          onPointerDown={handleCategoryPointerDown}
          onPointerMove={handleCategoryPointerMove}
          onPointerUp={handleCategoryPointerEnd}
          onPointerCancel={handleCategoryPointerEnd}
        >
          <div className="flex w-max min-w-full select-none gap-1 whitespace-nowrap touch-pan-x">
            {playgroundCategories.map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-foreground text-background"
                      : "text-foreground/70 hover:bg-default-100 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <DraggableContainer variant="polaroid">
        <GridBody>
          {filteredImages.map((image) => (
            <GridItem key={image.id} className="w-64" onClick={() => handleImageOpen(image)}>
              <img
                src={image.src}
                alt={image.alt}
                ref={(element) => {
                  if (element?.complete) handleImageSettled(image.id);
                }}
                onLoad={() => handleImageSettled(image.id)}
                onError={() => handleImageSettled(image.id)}
                className="pointer-events-none block h-auto w-full"
              />
            </GridItem>
          ))}
        </GridBody>
      </DraggableContainer>

      {isGalleryLoading && (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          role="status"
          aria-label="Loading gallery images"
        >
          <div className="flex items-center gap-3 rounded-full border border-divider bg-background/90 px-5 py-3 shadow-medium">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-default-300 border-t-foreground" />
            <span className="text-sm font-medium">Loading gallery</span>
          </div>
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 p-4 backdrop-blur-md md:p-8"
          role="dialog"
          aria-label={`Viewing ${selectedImage.alt}`}
          aria-modal="true"
          onClick={() => setSelectedImage(null)}
          onWheelCapture={(event) => {
            event.stopPropagation();
            handleWheel(event);
          }}
        >
          <button
            type="button"
            aria-label="Close image viewer"
            title="Close image viewer"
            onClick={(event) => {
              event.stopPropagation();
              setSelectedImage(null);
            }}
            className="absolute right-4 top-4 z-10 rounded-full border border-divider bg-background/80 p-3 text-foreground shadow-medium transition-colors hover:bg-default-100 md:right-8 md:top-8"
          >
            <X size={18} />
          </button>

          <div className="fixed bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full border border-divider bg-background/80 p-1 shadow-medium backdrop-blur-md">
            <button
              type="button"
              aria-label="Zoom out"
              title="Zoom out"
              onClick={(event) => {
                event.stopPropagation();
                changeZoom(-0.25);
              }}
              className="rounded-full p-3 text-foreground transition-colors hover:bg-default-100"
            >
              <Minus size={18} />
            </button>

            <div className="flex min-w-20 items-center justify-center gap-2 px-2 text-sm text-foreground/70">
              <Maximize2 size={14} />
              <span>{Math.round(zoom * 100)}%</span>
            </div>

            <button
              type="button"
              aria-label="Zoom in"
              title="Zoom in"
              onClick={(event) => {
                event.stopPropagation();
                changeZoom(0.25);
              }}
              className="rounded-full p-3 text-foreground transition-colors hover:bg-default-100"
            >
              <Plus size={18} />
            </button>
          </div>

          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            draggable={false}
            onClick={(event) => event.stopPropagation()}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerLeave={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            className="max-h-full max-w-full select-none object-contain touch-none"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              cursor: zoom > 1 ? "grab" : "default",
            }}
          />
        </div>
      )}
    </div>
  );
}
