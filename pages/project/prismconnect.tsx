import { Image } from "@heroui/image";
import { Link, Button } from "@heroui/react";
import Project from "@/sections/projects/project";
import SplitHeading from "@/components/split-heading";

export default function PrismConnect() {
  const pdfUrl = "/image/projects/prismconnect/hcidevelopment.pdf";
  
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
      <div className="mb-16">
        <object
          data={pdfUrl}
          type="application/pdf"
          width="100%"
          className="rounded-lg aspect-square"
        >
          <div className="flex flex-col items-center justify-center gap-4 p-8 bg-default-100 rounded-lg h-48">
            <p className="text-default-600 text-center">
              PDF preview is not available in your browser.
            </p>
            <Button
              as={Link}
              href={pdfUrl}
              target="_blank"
              color="primary"
              variant="flat"
            >
              Open PDF in new tab
            </Button>
          </div>
        </object>
      </div>

    </Project>
  );
}