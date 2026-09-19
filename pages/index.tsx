import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import { Image } from "@heroui/image";
import { motion } from "motion/react";
import { Button } from "@heroui/button";

import { siteConfig } from "@/config/site";
import {
  ArrowRight,
  DribbbleIcon,
  EmailIcon,
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import ScrollingTitle from "@/sections/home/scrollingTitle";
import FadeText from "@/components/custom-text";
import GridProjects from "@/sections/home/projectsList";
import { Instagram } from "lucide-react";

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
            <Image isBlurred alt="Ilya Sullivan holding Canva image border" className="m-5" src="/image/ilya-x-canva.webp" />
          </motion.div>
          <div className="flex flex-col items-start md:w-1/2 py-20 px-8">
            {FadeText(
              "flex py-8 text-lg",
              `Ilya Sullivan is a dedicated product designer specialising in creating personal, human-focused experiences. From software to graphics, he aims to show the best in humanity and improve the lives through everything he makes. "Everyone deserves to be represented from the start"`,
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
                href={siteConfig.links.linkedin}
              >
                <LinkedInIcon size={20} />
                LinkedIn
              </Link>
              <Link
                isExternal
                className={buttonStyles({
                  variant: "bordered",
                  radius: "full",
                })}
                href={siteConfig.links.instagram}
              >
                <InstagramIcon size={20} />
                Instagram
              </Link>
              <Link
                isExternal
                className={buttonStyles({
                  variant: "bordered",
                  radius: "full",
                })}
                href={siteConfig.links.email}
              >
                <EmailIcon size={20} />
                Email
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
        <GridProjects featuredOnly nItems={3} />
        <div className="w-full align-middle mt-8 justify-end flex px-4">
          <Button
            as={Link}
            className=""
            endContent={<ArrowRight />}
            href="/projects"
            radius="full"
            size="lg"
            variant="bordered"
          >
            All Pr ojects
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}
