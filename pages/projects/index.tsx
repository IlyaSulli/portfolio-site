import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import GridProjects, { ListProjects } from "@/sections/home/projectsList";

export default function ProjectsPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center mb-8">
          <h1 className={title()}>Projects</h1>
        </div>
        <GridProjects nItems={30} />
      </section>
    </DefaultLayout>
  );
}
