import { Image } from "@heroui/image";
import { Link, Button } from "@heroui/react";


import Project from "@/sections/projects/project";
import SplitHeading from "@/components/split-heading";

export default function FairCompass() {
  const pdfUrl1 = "/image/projects/faircompass/review.pdf";
  const pdfUrl2 = "/image/projects/faircompass/system-proposal.pdf";

  return (
    <Project url="faircompass">
        <SplitHeading heading={"Literature Review"} size="lg">
              <p>
              </p>
        </SplitHeading>
        <div className="mb-16">
          <object
            data={pdfUrl1}
            type="application/pdf"
            width="100%"
            className="rounded-lg aspect-square"
          >
            <div className="flex flex-col items-center justify-center gap-4 p-8 bg-default-100 rounded-lg h-48">
              <p className="text-default-600 text-center">
                PDF preview is not available in your browser.
              </p>
              <Button as={Link} href={pdfUrl1} target="_blank" color="primary" variant="flat">
                Open PDF in new tab
              </Button>
            </div>
          </object>
        </div>
        <SplitHeading heading={"Proposed Solution"} size="lg">
              <p>
                When trying to solve the problem, I knew from existing failed solutions, that adding additional features to the platform would only act as a patch to the problem but not a long-term answer. Instead, I worked to rethink how the algorithm worked in order to provide natural rests instead of starting to create echo chambers within a viewing session. 
              </p>
        </SplitHeading>
        <div className="mb-16">
          <object
            data={pdfUrl2}
            type="application/pdf"
            width="100%"
            className="rounded-lg aspect-square"
          >
            <div className="flex flex-col items-center justify-center gap-4 p-8 bg-default-100 rounded-lg h-48">
              <p className="text-default-600 text-center">
                PDF preview is not available in your browser.
              </p>
              <Button as={Link} href={pdfUrl2} target="_blank" color="primary" variant="flat">
                Open PDF in new tab
              </Button>
            </div>
          </object>
        </div>
    </Project>
  );
}
