import Image from "next/image";
import React, { ReactNode } from "react";
import { Spacer, Breadcrumbs, BreadcrumbItem, Chip } from "@heroui/react";

import { languageIcons } from "@/config/languageIcons";
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
        <Breadcrumbs>
          <BreadcrumbItem href="/projects">Projects</BreadcrumbItem>
          <BreadcrumbItem>{project.title}</BreadcrumbItem>
        </Breadcrumbs>
        <div className="flex flex-col items-center justify-center mt-32 mb-8">
          <span className={title({ size: "xl" })}>{project.title}</span>
          <span className="py-4 font-medium text-sm">
            {formatDate(project.startDate)} - {formatDate(project.endDate)}
          </span>
          <div className="flex gap-2 flex-wrap">
            {project.classification?.sort().map((tag, idx) => (
              <div key={idx}>
                <Chip radius="full" variant="bordered">
                  {tag}
                </Chip>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full h">
          <Image
            alt={"Cover image for project " + project.title}
            className="object-cover w-full h-fit max-h-min aspect-square md:aspect-video"
            height={600}
            placeholder="blur"
            blurDataURL="/image/projects/alleat/slides/alleathomepageslide_low.webp"
            priority={true}
            quality={80}
            src={project.coverImage}
            width={1200}
          />
        </div>
        <div className="flex flex-col md:flex-row w-full my-16 py-4">
          <div className="md:w-1/4 lg:w-1/2 pr-16">
            <div className="my-4">
              <span className="text-3xl font-semibold">Project Overview</span>
            </div>
          </div>
          <div className="w-1/1 md:w-3/4 lg:w-1/2">
            <span>
              {project.description.split("\n").map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </span>
            <Spacer y={16} />
            <div className="flex flex-row justify-between">
              <span className="text-lg font-semibold">project type</span>
              <div className="flex flex-col text-lg font-normal">
                <span>{project.type}</span>
              </div>
            </div>
            <div className="my-4">
              <hr className="border-1 h-0" />
            </div>

            <div className="flex flex-row justify-between text-right">
              <span className="text-lg font-semibold">languages</span>
              <div className="flex flex-row w-2/3 flex-wrap justify-end">
                {project.languages?.sort().map((lang, idx) => (
                  <Chip
                    key={idx}
                    className="font-normal flex items-center gap-2 m-1"
                    color="primary"
                    radius="full"
                    size="md"
                    startContent={
                      lang in languageIcons && (
                        <span className="ml-2 gap-2">
                          {React.createElement(
                            languageIcons[lang as keyof typeof languageIcons],
                            { size: 16 },
                          )}
                        </span>
                      )
                    }
                    variant="faded"
                  >
                    {lang}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="my-4">
              <hr className="border-1 h-0" />
            </div>
            <div className="flex flex-row justify-between text-right">
              <span className="text-lg font-semibold">tools</span>
              <div className="flex flex-row w-2/3 flex-wrap justify-end">
                {project.tools.sort().map((tool, idx) => (
                  <div key={idx}>
                    <Chip
                      className="gap-2 m-1"
                      color="secondary"
                      radius="full"
                      variant="flat"
                    >
                      {tool}
                    </Chip>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </DefaultLayout>
  );
}
