import { Image } from "@heroui/image";
import Project from "@/sections/projects/project";
import SplitHeading from "@/components/split-heading";

export default function PrismConnect() {
  return (
    <Project url="prismconnect">
      <SplitHeading heading={"Poster"} size="lg">
        <p>
          Below is the poster intended to show to stakeholders in order to market them to invest in the product, showing off our prototype favourably while keeping details high-level.
        </p>
      </SplitHeading>
      <Image src="/image/projects/prismconnect/prismconnectposter.png" />
      <SplitHeading heading={"Development"} size="lg">
        <p>
          The project itself was intended as an assignment to test our ability to work as a team to work from a single overarching problem, and narrowing down the issue through interviews, questionnaries and market research to create a product - from there, we worked iteratively to ideate concepts and prototype the best idea. Below is the full breakdown:
        </p>
      </SplitHeading>
      <embed
        src="/image/projects/prismconnect/hcidevelopment.pdf"
        type="application/pdf"
        width="100%"
        height="800px"
        className="rounded-lg mb-16"
      />

    </Project>
  );
}