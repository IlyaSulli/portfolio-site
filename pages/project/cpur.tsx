import { Image } from "@heroui/image";

import Project from "@/sections/projects/project";

export default function CPURProject() {
  return (
    <Project url="cpur">
      <div className="grid gap-4 md:grid-cols-2">
        <Image src="/image/projects/cpur/slides/cpurdatarecoveryslide.webp" />
        <Image src="/image/projects/cpur/slides/cpurgetstartedslide.webp" />
        <Image src="/image/projects/cpur/slides/cpurhomepageslide.webp" />
        <Image src="/image/projects/cpur/slides/cpurrepairslide.webp" />
      </div>
    </Project>
  );
}
