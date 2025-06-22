import { Image } from "@heroui/image";

import Project from "@/sections/projects/project";

export default function Passagetopoise() {
  return (
    <Project url="passagetopoise">
      <div className="grid gap-4 md:grid-cols-2">
        <Image src="/image/projects/passagetopoise/slides/passagetopoiseblogslide.webp" />
        <Image src="/image/projects/passagetopoise/slides/passagetopoisedescriptionslide.webp" />
        <Image src="/image/projects/passagetopoise/slides/passagetopoiseshopslide.webp" />
      </div>
    </Project>
  );
}
