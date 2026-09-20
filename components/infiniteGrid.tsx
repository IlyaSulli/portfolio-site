import { animate, cubicBezier, motion, useMotionValue, wrap } from "motion/react";
import {
  Children,
  createContext,
  isValidElement,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";

// Supported visual modes for the grid layout.
type variants = "default" | "masonry" | "polaroid";

// Passes the active grid variant down to child components without prop drilling.
const GridVariantContext = createContext<variants | undefined>(undefined);

// Shared animation config for each item as it fades and scales into view.
const rowVariants = {
  initial: { opacity: 0, scale: 0.3 },
  animate: () => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: Math.random() + 1.5,
      duration: 1.4,
      ease: cubicBezier(0.18, 0.71, 0.11, 1),
    },
  }),
};

const shuffleItems = (items: React.ReactNode[], seed: number) => {
  const shuffledItems = [...items];
  let randomSeed = seed;

  const nextRandom = () => {
    randomSeed = (randomSeed * 1664525 + 1013904223) % 4294967296;
    return randomSeed / 4294967296;
  };

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(nextRandom() * (index + 1));
    [shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index],
    ];
  }

  return shuffledItems;
};

export const DraggableContainer = ({
  className,
  children,
  variant,
}: {
  className?: string;
  children: React.ReactNode;
  variant?: variants;
}) => {
  // Reference to the draggable grid so we can measure its size.
  const ref = useRef<HTMLDivElement | null>(null);

  // Motion values drive the x/y offset for drag and wheel-based movement.
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Tracks whether the user is actively dragging so wheel scrolling can pause.
  const [isDragging, setIsDragging] = useState(false);
  const handleIsDragging = () => setIsDragging(true);
  const handleIsNotDragging = () => setIsDragging(false);

  useEffect(() => {
    // Measure the grid container once it mounts so wrapping logic knows the bounds.
    const container = ref.current?.getBoundingClientRect();
    if (!container) return;

    const { width, height } = container;

    // Wrap around the center of the repeated grid to keep momentum smooth.
    const xDrag = x.on("change", (latest) => {
      const wrappedX = wrap(-(width / 2), 0, latest);
      if (wrappedX !== latest) x.set(wrappedX);
    });

    const yDrag = y.on("change", (latest) => {
      const wrappedY = wrap(-(height / 2), 0, latest);
      if (wrappedY !== latest) y.set(wrappedY);
    });

    // Mouse wheel scroll moves the grid vertically when not dragging.
    const handleWheelScroll = (event: WheelEvent) => {
      if (!isDragging) {
        animate(y, y.get() - event.deltaY * 2.7, {
          type: "tween",
          duration: 1.2,
          ease: cubicBezier(0.18, 0.71, 0.11, 1),
        });
      }
    };

    window.addEventListener("wheel", handleWheelScroll);
    return () => {
      xDrag();
      yDrag();
      window.removeEventListener("wheel", handleWheelScroll);
    };
  }, [x, y, isDragging]);

  return (
    // Share the current layout variant with all items in this grid.
    <GridVariantContext.Provider value={variant}>
      <div className="h-dvh w-screen overflow-hidden">
        <motion.div className="h-dvh w-screen overflow-hidden">
          <motion.div
            className={clsx(
              "grid h-fit w-fit touch-none cursor-grab grid-cols-[repeat(2,1fr)] bg-background active:cursor-grabbing will-change-transform",
              className,
            )}
            // Enables free dragging with momentum and smooth rest behavior.
            drag
            dragMomentum={true}
            dragTransition={{
              timeConstant: 200,
              power: 0.28,
              restDelta: 0,
              bounceStiffness: 0,
            }}
            onMouseDown={handleIsDragging}
            onMouseUp={handleIsNotDragging}
            onMouseLeave={handleIsNotDragging}
            style={{ x, y }}
            ref={ref}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </GridVariantContext.Provider>
  );
};

export const GridItem = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  // Pull the active layout style from the parent container.
  const variant = useContext(GridVariantContext);

  // Track a pointer press so a drag does not accidentally trigger a click.
  const pointerStart = useRef({ x: 0, y: 0 });
  const hasDragged = useRef(false);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
    hasDragged.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const distance = Math.hypot(
      event.clientX - pointerStart.current.x,
      event.clientY - pointerStart.current.y,
    );

    // If the pointer moves enough, treat it as a drag instead of a click.
    if (distance > 6) hasDragged.current = true;
  };

  const handleClick = () => {
    if (hasDragged.current) {
      hasDragged.current = false;
      return;
    }

    onClick?.();
  };

  // Apply styling differences based on the chosen grid variant.
  const gridItemStyles = clsx(
    "overflow-hidden hover:cursor-pointer w-full h-auto self-start will-change-transform",
    variant === "default" && "rounded-sm",
    variant === "masonry" && "break-inside-avoid mb-28 inline-block rounded-sm",
    variant === "polaroid" &&
      "break-inside-avoid mb-28 inline-block border-10 border-b-28 border-white shadow-xl even:rotate-3 odd:-rotate-2 hover:rotate-0 transition-transform ease-out duration-300",
    className,
  );

  return (
    <motion.div
      className={gridItemStyles}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      // Fade/scale animation for each item when it mounts.
      variants={rowVariants}
      initial="initial"
      animate="animate"
    >
      {children}
    </motion.div>
  );
};

export const GridBody = memo(
  ({ children, className }: { children: React.ReactNode; className?: string }) => {
    // Reuse the active visual mode from the container context.
    const variant = useContext(GridVariantContext);
    const items = Children.toArray(children);
    const itemSignature = items
      .map((item, index) => (isValidElement(item) ? (item.key ?? index) : index))
      .join("|");
    const shuffledRows = useRef<{ signature: string; rows: React.ReactNode[][] }>({
      signature: "",
      rows: [],
    });

    if (shuffledRows.current.signature !== itemSignature) {
      const shuffleSeed = itemSignature
        .split("")
        .reduce((seed, character) => (seed * 31 + character.charCodeAt(0)) >>> 0, 7);
      const shuffledItems = shuffleItems(items, shuffleSeed);

      shuffledRows.current = {
        signature: itemSignature,
        rows: Array.from({ length: 4 }, () => shuffledItems),
      };
    }

    // Each row gets the same base layout plus variant-specific spacing.
    const gridBodyStyles = clsx(
      variant === "default" &&
        "grid grid-cols-[repeat(6,1fr)] h-fit w-fit gap-7 p-7 md:gap-28 md:p-14",
      (variant === "masonry" || variant === "polaroid") && "columns-6 h-fit w-fit gap-x-28 px-14",
      className,
    );

    return (
      <>
        {/* Create four repeated rows so the grid feels continuous and fills the viewport. */}
        {shuffledRows.current.rows.map((row, index) => (
          <div key={index} className={gridBodyStyles}>
            {row}
          </div>
        ))}
      </>
    );
  },
);

GridBody.displayName = "GridBody";
