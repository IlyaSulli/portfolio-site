import { Image } from "@heroui/react";
import React from "react";
import { motion } from "motion/react";

import { ArrowRight } from "@/components/icons";
import { projects } from "@/config/projects";

export default function GridProjects({
  nItems,
  featuredOnly = false,
}: {
  nItems: number;
  featuredOnly?: boolean;
}) {
  const sortedProjects = projects
    .filter((project) => !featuredOnly || project.featured)
    .sort(
      (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
    )
    .slice(0, nItems);

  return (
    <div className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 grid ">
      {sortedProjects.length === 0 ? (
        <div className="p-2 w-full text-left relative">
          <div className="aspect-square object-cover bg-foreground rounded-xl opacity-50" />
          <div className="absolute top-0 z-10 flex flex-row justify-center p-6">
            <div className="flex items-center gap-2 bg-background rounded-full px-4 py-2">
              <span className="text-foreground">No Items Found</span>
            </div>
          </div>
        </div>
      ) : (
        sortedProjects.map((project: any, idx: number) => (
          <motion.div
            key={idx}
            whileHover={{
              rotateZ: 2,
              rotateX: -2,
              scale: 0.95,
            }}
          >
            <button
              aria-haspopup="dialog"
              className="p-2 w-full text-left relative"
              type="button"
              onClick={() =>
                (window.location.href = `../project/${project.url}`)
              }
            >
              <Image
                className="aspect-square object-cover"
                src={project.thumbnailImage}
                width={600}
              />
              <div className="absolute top-0 right-0 z-10 flex flex-row justify-end p-6">
                <div className="flex items-center gap-2 bg-background rounded-full px-4 py-2">
                  <span>{project.title}</span>
                  <ArrowRight />
                </div>
              </div>
            </button>
          </motion.div>
        ))
      )}
    </div>
  );
}

export function ListProjects({
  nItems,
  featuredOnly = false,
}: {
  nItems: number;
  featuredOnly?: boolean;
}) {
  const sortedProjects = projects
    .filter((project) => !featuredOnly || project.featured)
    .sort(
      (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
    )
    .slice(0, nItems);

  const arrowVariants = {
    intial: { x: 0 },
    hover: { x: 20 },
  };

  const textVariants = {
    intial: { scale: 1 },
    hover: { scale: 1.1 },
  };

  return (
    <div>
      {sortedProjects.map((project, idx) => (
        <div key={idx} className="w-full">
          <motion.div initial="intial" whileHover="hover">
            <button className="flex flex-row justify-between w-full pl-10 pr-20 py-10 rounded group">
              <motion.span
                transition={{ ease: "easeInOut", duration: 0.2 }}
                variants={textVariants}
              >
                <span className="font-medium text-3xl">{project.title}</span>
              </motion.span>
              <motion.span
                transition={{ type: "spring", stiffness: 100 }}
                variants={arrowVariants}
              >
                <ArrowRight size={36} />
              </motion.span>
            </button>
          </motion.div>
          <hr />
        </div>
      ))}
    </div>
  );
}
