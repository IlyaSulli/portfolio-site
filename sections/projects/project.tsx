import Image from "next/image";
import { ReactNode } from "react";

import { title } from "@/components/primitives";
import { formatDate } from "@/components/formatDate";
import { projects } from "@/config/projects";
import DefaultLayout from "@/layouts/default";

interface ProjectProps {
  url: string;
  children: ReactNode;
}

export default function Project({ url, children }: ProjectProps) {
  const project = projects.find((entry) => entry.url === url);

  if (!project)
    return <div className="text-warning">Project metadata not found</div>;

  return (
    <DefaultLayout>
      <header>
        <div className="absolute w-full h-96 -mt-8 left-0 top-0">
          <Image
            fill
            alt={"Cover image for project " + project.title}
            className="object-cover"
            quality={100}
            src={project.coverImage}
          />
        </div>
        <div className="my-16 mt-72 flex flex-col items-center justify-center">
          <span className={title()}>{project.title}</span>
          <span className="py-4 font-medium">
            {formatDate(project.startDate)} - {formatDate(project.endDate)}
          </span>
        </div>
      </header>
      <main>{children}</main>
    </DefaultLayout>
  );
}
