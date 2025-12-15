import Project from "@/sections/projects/project";
import { Image } from "@heroui/image";

export default function TakeCtrl() {
  return (
    <Project url="takectrl">
      <div className="grid gap-4">
        <Image src="/image/projects/takectrl/battery.png" />
        <Image src="/image/projects/takectrl/control.png" />
        <Image src="/image/projects/takectrl/compromise.png" />
      </div>
    </Project>
  );
}
