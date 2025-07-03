import { Image } from "@heroui/image";

import Project from "@/sections/projects/project";

export default function katSullivan() {
  return (
    <Project url="katsullivan">
      <div className="grid gap-4 md:grid-cols-2">
        <Image src="/image/projects/katsullivan/slides/katsullivanaboutslide.webp" />
        <Image src="/image/projects/katsullivan/slides/katsullivanblogslide.webp" />
      </div>
    </Project>
  );
}
