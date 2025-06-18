import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Image } from "@heroui/image";
import { motion } from "motion/react";
import { Button } from "@heroui/button";

import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  DribbbleIcon,
  GithubIcon,
  LinkedInIcon,
} from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import ScrollingTitle from "@/sections/home/scrollingTitle";
import FadeText from "@/components/custom-text";
import GridProjects from "@/sections/home/projects";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between gap-4 py-8 md:py-10">
        <ScrollingTitle />
        <div className="flex flex-col md:flex-row-reverse z-0 w-full">
          <motion.div
            className="md:w-1/2 md:-mt-24 mr-5 p-5"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
          >
            <Image
              isBlurred
              alt="Ilya Sullivan Profile"
              className="m-5"
              fetchPriority="high"
              src="/image/ilya.webp"
            />
          </motion.div>
          <div className="flex flex-col items-start md:w-1/2 py-20 px-8">
            {FadeText(
              "flex py-8 text-lg",
              "Ilya Sullivan is a results-driven software developer specialising in crafting user-centric websites and applications. With a keen eye for design and a strong programming background he strives to build innovative digital products that provide exceptional user experiences.",
            )}
            <span className="flex py-4 text-lg font-semibold">Quick Links</span>
            <div className="flex flex-row gap-2 flex-wrap">
              <Link
                isExternal
                className={buttonStyles({
                  variant: "bordered",
                  radius: "full",
                })}
                href={siteConfig.links.github}
              >
                <GithubIcon size={20} />
                GitHub
              </Link>
              <Link
                isExternal
                className={buttonStyles({
                  variant: "bordered",
                  radius: "full",
                })}
                href={siteConfig.links.dribbble}
              >
                <DribbbleIcon size={20} />
                Dribbble
              </Link>
              <Link
                isExternal
                className={buttonStyles({
                  variant: "bordered",
                  radius: "full",
                })}
                href={siteConfig.links.linkedin}
              >
                <LinkedInIcon size={20} />
                LinkedIn
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="md:w-1/2 p-4 mb-4">
          <span className="font-sans font-medium text-2xl">
            Solving everyday problems with unique and{" "}
            <span className="text-primary font-medium text-2xl italic">
              personalised experiences
            </span>
          </span>
        </div>
        <GridProjects nItems={6} />
        <div className="w-full align-middle mt-8 justify-end flex px-4">
          <Button
            className=""
            endContent={<ArrowRight />}
            radius="full"
            size="lg"
            variant="bordered"
          >
            All Projects
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}
