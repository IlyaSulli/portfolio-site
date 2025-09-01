import { Image } from "@heroui/image";

import Project from "@/sections/projects/project";

export default function TheGreatBeyond() {
  return (
    <Project url="thegreatbeyond">
      <Image
        alt="Map of the planet of Novaterra"
        src="/image/projects/thegreatbeyond/novaterramap.png"
      />
      <Image
        alt="Map of the City of Gear Mark"
        src="/image/projects/thegreatbeyond/gearmarkmap.png"
      />
    </Project>
  );
}
