import { ReactNode } from "react";
import { Image } from "@heroui/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface BrandedCardProps {
  bg: string;
  brandsrcLight: string;
  brandsrcDark: string;
  children: ReactNode;
}

export default function BrandedCard({
  bg,
  brandsrcLight,
  brandsrcDark,
  children,
}: BrandedCardProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const brandSrc = theme === "dark" ? brandsrcDark : brandsrcLight;

  return (
    <div
      className={`rounded-3xl lg:px-24 lg:py-16 lg:mx-16 m-4 mx-0 p-8 pt-12 md:px-16`}
      style={{ background: bg }}
    >
      <Image alt="Brand" className="h-12 mb-12" src={brandSrc} />
      {children}
    </div>
  );
}
