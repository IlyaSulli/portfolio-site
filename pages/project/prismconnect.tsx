import { Image } from "@heroui/image";
import { Link, Button } from "@heroui/react";
import Project from "@/sections/projects/project";
import SplitHeading from "@/components/split-heading";

export default function PrismConnect() {
  const pdfUrl = "/image/projects/prismconnect/hcidevelopment.pdf";

  return (
    <Project url="prismconnect">
      <Image src="/image/projects/prismconnect/prismconnectposter.png" />
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
            <Button as={Link} href={pdfUrl} target="_blank" color="primary" variant="flat">
              Open PDF in new tab
            </Button>
          </div>
        </object>
      </div>
    </Project>
  );
}
