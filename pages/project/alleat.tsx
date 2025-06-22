import { Image } from "@heroui/image";

import Project from "@/sections/projects/project";

export default function AllEatProject() {
  return (
    <Project url="alleat">
      <div className="grid gap-4 md:grid-cols-2">
        <Image src="/image/projects/alleat/slides/alleatcategoriesslide.webp" />
        <Image src="/image/projects/alleat/slides/alleatconfirmedorderslide.webp" />
        <Image src="/image/projects/alleat/slides/alleathomepageslide.webp" />
        <Image src="/image/projects/alleat/slides/alleatitemslide.webp" />
        <Image src="/image/projects/alleat/slides/alleatlogoslide.webp" />
      </div>
    </Project>
  );
}
