import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Image } from "@heroui/image";
import { motion } from "motion/react";

import { siteConfig } from "@/config/site";
import { DribbbleIcon, GithubIcon, LinkedInIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import ScrollingTitle from "@/sections/home/scrollingTitle";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-between gap-4 py-8 md:py-10">
        <ScrollingTitle />
        <div className="flex flex-col md:flex-row-reverse">
          <motion.div
            animate={{ y: 0 }}
            className="p-8 md:w-1/2"
            initial={{ y: -20 }}
          >
            <Image
              isBlurred
              alt="Ilya Sullivan Profile"
              className="m-5"
              src="/images/ilya-downsize.jpg"
            />
          </motion.div>
          <div className="flex flex-col items-start md:w-1/2 py-20 px-8">
            <span className="flex py-8 text-lg">
              Ilya Sullivan is a results-driven software developer specialising
              in crafting user-centric websites and applications. With a keen
              eye for design and a strong programming background he strives to
              build innovative digital products that provide exceptional user
              experiences.
            </span>
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
        <div className="mt-8">
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </div>
      </section>
    </DefaultLayout>
  );
}
