import { Image } from "@heroui/image";
import { Link, Button } from "@heroui/react";

import Project from "@/sections/projects/project";
import SplitHeading from "@/components/split-heading";

export default function PrismConnect() {
  const pdfUrl = "/image/projects/prismconnect/hcidevelopment.pdf";

  return (
    <Project url="prismconnect">
      <SplitHeading heading={"Introduction"} size="lg">
        <p>
          As part of the module Human Computer Interaction, we were given the task to design a
          product to solve a problematic behaviour that impact everyday life. We decided we wanted
          to focus more on health and wellbeing, brainstorming to refine the problem to
          cybersecurity and the lack of awareness of everyday of how to be protected. By analysing
          existing solutions, the evolution of scams over time, we found that the rise of AI and an
          increase in the scale that scammers now work at, it is becoming increasingly hard to keep
          track of updates and maintain high security. We found through interviews and surveys that
          the average person has given up on cybersecurity awareness and education consistently is
          outdated or is not remembered in average day use. We wanted to fix this problem not by
          attempting to educate but by instead building a product that informs the user, keeping up
          to date with how scams currently work.
        </p>
      </SplitHeading>
      <SplitHeading heading={"Exploring Ideas"} size="lg">
        <p>
          With the problem now narrowed down to be the question &quot;Which design best supports
          users in reliabily identifying and responding to scam attempts across platforms,
          especially during rushed, emotional, or high-urgency moments?&quot;, allowed us to begin
          ideating and discovering ways that this can be solved. We began by sketching out rough
          drafts using different techniques to give us a range of different solutions and then used
          criteria to narrow down the solutions. From here, we refined the ideas and prototyped,
          getting us to the final idea of a Verified Identity Communication App, which later got
          renamed to PrismConnect.
        </p>
      </SplitHeading>
      <Image src="/image/projects/prismconnect/prototype-sketches.png" />\
      <SplitHeading heading={"Application Flow"} size="lg">
        <p>
          To ensure that the applicaiton had all considerations, we developed the application flow
          which looked at how a user would interact with the application and how the features would
          reduce the likelihood of impersonaters and malicious actors from interupting the user.
        </p>
      </SplitHeading>
      <Image src="/image/projects/prismconnect/application-flow.png" />
      <SplitHeading heading={""} size="lg">
        <p>
          These features were sketched and refined further, testing with different people to ensure
          that when someone picked up the app, they could understand it and would be able to
          identify warnings and that they would be in comfortable positions on the screen itself.
        </p>
      </SplitHeading>
      <Image src="/image/projects/prismconnect/screen-draft1.png" />
      <SplitHeading heading={""} size="lg">
        <p>
          Using Figma, I created the many different screens that make up the app and tested on an
          even larger audience to get their opinions and thoughts which then got used in the
          analysis phase of product development as to how we could improve the application.
        </p>
      </SplitHeading>
      <Image src="/image/projects/prismconnect/figma.png" />
      <SplitHeading heading={"Promotional Materials"} size="lg">
        <p>
          To advertise our product PrismConnect, I designed some promotional material to demonstrate
          the capabilties of what it could do. In these, it aims to target the wider general
          audience to show off how simple and effortless it can work whilst in the hands of
          customers.
        </p>
      </SplitHeading>
      <div className="grid gap-4 md:grid-cols-2">
        <Image src="/image/projects/prismconnect/prismconnect3.png" />
      <Image src="/image/projects/prismconnect/prismconnect1.png" />
      <Image src="/image/projects/prismconnect/prismconnect2.png" />
      <Image src="/image/projects/prismconnect/prismconnect4.png" />
      </div>
      <SplitHeading heading={"Stakeholder Showcase"} size="lg">
        <p>
          To advertise our product to stakeholder, we were tasked to create a poster to display the
          features and advertise as to how the product helps to solve the problem. The poster I
          created for PrismConnect, displays the steps we went through to get to the final product,
          through iteration and market research, we found a solution to a growing problem. The
          features we included on the poster aims to show stakeholders what makes our product
          different from the others. We included information on how the authentication system works
          as that was at the core of how the app works, using simple, easy steps that on the backend
          use multiple different ways of checking the users realness.
        </p>
      </SplitHeading>
      <Image src="/image/projects/prismconnect/prismconnect-poster-mockup.png" />
      <SplitHeading heading={""} size="md">
        <p>
          In our class, we displayed our posters - we noted a few things people talked about. These
          include having a clear message and easy to understand features. There was one thing that
          people did notice, by having borders around many of the different areas, the content felt
          densly packed even though the distance between the text was far.
        </p>
      </SplitHeading>
      <Image src="/image/projects/prismconnect/hci-showcase.jpg" />
      <SplitHeading heading={"Slide Deck"} size="lg">
        <p>
          Want to read the submitted slide deck? Below is the slide deck we submitted, resulting in
          us getting a grade of 93%, the highest mark compared to all other students in 2025
        </p>
      </SplitHeading>
      <div className="mb-16">
        <object
          className="rounded-lg aspect-square"
          data={pdfUrl}
          type="application/pdf"
          width="100%"
        >
          <div className="flex flex-col items-center justify-center gap-4 p-8 bg-default-100 rounded-lg h-48">
            <p className="text-default-600 text-center">
              PDF preview is not available in your browser.
            </p>
            <Button as={Link} color="primary" href={pdfUrl} target="_blank" variant="flat">
              Open PDF in new tab
            </Button>
          </div>
        </object>
      </div>
    </Project>
  );
}
