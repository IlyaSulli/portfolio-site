import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import GridProjects, { ListProjects } from "@/sections/home/projectsList";
import { Button, Card, CardFooter, Image } from "@heroui/react";

export default function ProjectsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center mb-8">
          <h1 className={title()}>Tools</h1>
        </div>
        <Card
          isFooterBlurred
          className="border-none shadow-xl max-w-xs w-full bg-white dark:bg-zinc-900"
          radius="lg"
        >
          <Image
            alt="Scattered list of words"
            className="object-cover rounded-t-lg -mb-4 z-0"
            height={240}
            src="/image/tools/textgen/textgen.webp"
            width={400}
          />
          <CardFooter className="flex flex-col items-start bg-white dark:bg-zinc-900 border-t border-black/10 dark:border-white/10 rounded-b-lg p-4 gap-2">
            <span className="text-lg font-semibold text-black dark:text-white">Text Generator</span>
            <p className="text-sm text-black/80 dark:text-white/80">
              This tool is currently in beta. There may be some issues and will get updated in the future.
            </p>
            <Button
              as="a"
              className="text-sm font-medium text-white bg-black/90 hover:bg-black dark:bg-white/90 dark:hover:bg-white dark:text-black w-full mt-2"
              color="default"
              radius="full"
              size="md"
              variant="flat"
              href="/tool/textgen"
            >
              Try it out
            </Button>
          </CardFooter>
        </Card>
      </section>
    </DefaultLayout>
  );
}
