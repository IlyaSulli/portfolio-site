import { Image, Modal, ModalBody, ModalContent } from "@heroui/react";
import React, { useState } from "react";
import { motion } from "framer-motion";

import { ArrowRight } from "@/components/icons";
import { projects } from "@/config/projects";

export default function GridProjects({ nItems }: { nItems: number }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const sortedProjects = projects
    .sort(
      (a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime(),
    )
    .slice(0, nItems);

  return (
    <div className="grid-cols-2 grid">
      {sortedProjects.map((project, idx) => (
        <React.Fragment key={idx}>
          <motion.div
            whileHover={{
              rotateZ: 2,
              rotateX: -2,
              scale: 0.95,
            }}
          >
            <button
              aria-expanded={openIdx === idx}
              aria-haspopup="dialog"
              className="p-2 w-full text-left"
              style={{ position: "relative" }}
              type="button"
              onClick={() => setOpenIdx(idx)}
            >
              <Image
                isBlurred
                className="aspect-square object-cover"
                src={project.coverImage}
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
          <Modal
            isOpen={openIdx === idx}
            size="2xl"
            onOpenChange={(open) => setOpenIdx(open ? idx : null)}
          >
            <ModalContent>
              <ModalBody>
                <span className="flex flex-col gap-1">{project.title}</span>
                <p>{project.description}</p>
              </ModalBody>
            </ModalContent>
          </Modal>
        </React.Fragment>
      ))}
    </div>
  );
}

export function ListProjects() {
  return <div>{/* ListProjects implementation */}</div>;
}
