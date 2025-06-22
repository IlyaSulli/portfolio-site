import { ReactNode } from "react";

interface SplitHeadingProps {
  size: "lg" | "md" | "sm";
  heading: string;
  subheading?: string;
  children: ReactNode;
}

const sizeToClass = {
  lg: "text-3xl",
  md: "text-2xl",
  sm: "text-xl",
};

export default function SplitHeading({
  size,
  heading,
  subheading,
  children,
}: SplitHeadingProps) {
  return (
    <div className="flex flex-col md:flex-row w-full my-16 py-4">
      <div className="md:w-1/4 lg:w-1/2 pr-16">
        <div className="my-4 flex flex-col">
          <span className={`${sizeToClass[size]} font-semibold`}>
            {heading}
          </span>
          <span className="text-sm font-normal pt-2">
            {subheading?.toUpperCase()}
          </span>
        </div>
      </div>
      <div className="w-1/1 md:w-3/4 lg:w-1/2">{children}</div>
    </div>
  );
}
