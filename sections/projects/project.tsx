import React, { ReactNode, useEffect, useState } from "react";
import {
  Spacer,
  Breadcrumbs,
  BreadcrumbItem,
  Chip,
  Image,
  Link,
} from "@heroui/react";

import BackToTop from "@/components/back-to-top";
import SplitHeading from "@/components/split-heading";
import { languageIcons } from "@/config/languageIcons";
import { title } from "@/components/primitives";
import { formatDate } from "@/components/formatDate";
import { projects } from "@/config/projects";
import DefaultLayout from "@/layouts/default";
import { GithubIcon, LinkedInIcon } from "@/components/icons";

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
          <span className={title({ size: "xl", className: "text-center" })}>
            {project.title}
          </span>
          <span className="py-4 font-medium text-sm">
            {formatDate(project.startDate ?? "")} -{" "}
            {formatDate(project.endDate ?? "")}
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
            fetchPriority="high"
            height={600}
            src={
              project.coverImage && project.coverImage !== ""
                ? project.coverImage
                : "/image/placeholder.jpg"
            }
            width={1200}
          />
        </div>
        <SplitHeading heading="Project Overview" size="lg">
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
          {project.contributors && project.contributors.length !== 0 && (
            <>
              <div className="my-4">
                <hr className="border-1 h-0" />
              </div>
              <div className="flex flex-row justify-between text-right">
                <span className="text-lg font-semibold">contributors</span>
                {(() => {
                  const hasAnyGithub = project.contributors.some(
                    (c) => "github" in c && c.github
                  );
                  const hasAnyLinkedin = project.contributors.some(
                    (c) => c.linkedin
                  );
                  return (
                    <div className="flex flex-col w-2/3 items-end gap-2">
                      {project.contributors.map((contributor, idx) => (
                        <div key={idx} className="flex items-center gap-1">
                          <Chip
                            className="font-normal"
                            color="default"
                            radius="full"
                            size="lg"
                            variant="dot"
                          >
                            {contributor.name}
                          </Chip>
                          {hasAnyGithub && (
                            "github" in contributor && contributor.github ? (
                              <Link
                                isExternal
                                href={contributor.github}
                                aria-label={`${contributor.name}'s GitHub`}
                                className="flex items-center justify-center w-7 h-7 rounded-full bg-[#24292e] hover:bg-[#1b1f23] transition-colors"
                              >
                                <GithubIcon size={16} className="text-white" />
                              </Link>
                            ) : (
                              <div className="w-7 h-7" />
                            )
                          )}
                          {hasAnyLinkedin && (
                            contributor.linkedin ? (
                              <Link
                                isExternal
                                href={contributor.linkedin}
                                aria-label={`${contributor.name}'s LinkedIn`}
                                className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0A66C2] hover:bg-[#004182] transition-colors"
                              >
                                <LinkedInIcon size={16} className="text-white" />
                              </Link>
                            ) : (
                              <div className="w-7 h-7" />
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </>
          )}
          {project.languages && project.languages.length !== 0 && (
            <>
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
                      color="default"
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
            </>
          )}
          {project.tools && project.tools.length !== 0 && (
            <>
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
            </>
          )}
        </SplitHeading>
      </header>
      <main>{children}</main>
      <BackToTop />
    </DefaultLayout>
  );
}
