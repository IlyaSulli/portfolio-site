import { Image } from "@heroui/image";

import Project from "@/sections/projects/project";
import SplitHeading from "@/components/split-heading";
import BrandedCard from "@/components/brandedCard";

export default function AllEatProject() {
  return (
    <Project url="alleat">
      <Image src="/image/projects/alleat/alleatlogo.webp" />
      <SplitHeading heading={"Analysis"} size="lg" subheading={"Stage 1"}>
        <p>
          Through my use of many food delivery apps, I noticed one key factor
          that made it difficult to use the apps, the lack of a way to see what
          I could eat. Especially when I was vegan, these apps made it hard to
          find new places that were also vegan friendly without looking at each
          restaurant one at a time. By the time I would find what I was looking
          for, the usefulness of a food delivery app was eliminated. It
          wasn&apos;t quick nor was it easy.
          <br />
          <br />
          For people with severe allergies, it makes it close to impossible to
          order food via a delivery app, with the fear that they are ordering in
          the blind and although new apps show if something is vegan or
          vegetarian, it still doesn&apos;t show if it contains gluten, nuts
          etc. As etc. As well, people with severe allergies still have to keep
          their guard up because they may mis click and order something that
          they are to and therefore causing them to go to the hospital or die.
          To make To make things worse is that on most occasions, people order
          food when they want things quickly and are away from home, without an
          EpiPen, therefore, making them be in the most vulnerable state.
          <br />
          <br />
          Some apps do something to help with this by creating a whole category
          for each dietary need but once again this stops the ease of use
          because you are left without a way to sort by categories like Italian
          or Chinese or find specific foods. I want to solve this by allowing
          users to hide any meals they can&apos;t eat, leaving them with only
          the ones they can eat. Along with the difficulty of finding vegan
          restaurants, I also ran into another issue when using these food
          delivery apps: there was no way to see what each person thought of the
          dish, only a way to rate the restaurant, making it difficult to know
          what was good and what was bad. To solve this issue, I intend to
          implement a system that allows each person to rate the dish they ate,
          and will then recommend it to other people with similar needs and who
          like similar dishes.
        </p>
      </SplitHeading>
      <SplitHeading heading={"User Research"} size="lg" subheading={"Stage 2"}>
        <p>
          When it comes to my project, I selected people who were able to
          provide detailed analysis&apos;s and give me user feedback of how to
          make the app user-friendly. I grouped the users into specific
          categories based on the part of the app that best suited them.
        </p>
      </SplitHeading>
      <div className="grid gap-4 md:grid-cols-4 grid-cols-2 md:mx-4 lg:mx-32 sm:mx-16 mx-8">
        <div className="p-4 flex items-center justify-center bg-gray-200 dark:bg-[#222] rounded-3xl">
          <Image src="/image/projects/alleat/person1.webp" />
        </div>
        <div className="p-4 align-middle justify-center bg-gray-200 dark:bg-[#222] rounded-3xl">
          <Image src="/image/projects/alleat/person2.webp" />
        </div>
        <div className="p-4 align-middle justify-center bg-gray-200 dark:bg-[#222] rounded-3xl">
          <Image src="/image/projects/alleat/person3.webp" />
        </div>
        <div className="p-4 align-middle justify-center bg-gray-200 dark:bg-[#222] rounded-3xl">
          <Image src="/image/projects/alleat/person4.webp" />
        </div>
      </div>
      <SplitHeading heading={"Experienced Customer"} size="sm">
        <p>
          There were many people that had one or two food delivery apps that
          they used, proffering either the ease of use or the exclusive
          restaurant offerings for their favourite restaurants. In the area
          studying, Just Eat was the most preferred app due to the speedy
          delivery times and the most variety of restaurants offering.
          <br /> <br />
          There was a few things that stood out to be a good app including
          category browsing, the ability to sort by most popular and having
          ratings for restaurants. Apps which did not include these features
          lost the interest of the customers and instead went with more
          reputable apps. A few people mentioned the lack of good
          recommendations based on the time of day which meant they had to spend
          more time searching for the restaurant they wanted.{" "}
        </p>
      </SplitHeading>
      <SplitHeading heading={"Inexperienced Customer"} size="sm">
        <p>
          Inexperienced users of food delivery apps encountered notable
          challenges that differed from those experienced by more seasoned
          customers. They generally found these apps to be less intuitive,
          leading to difficulties in navigating the platforms and placing orders
          efficiently. A prominent issue for this group was the overwhelming
          number of restaurant choices, which often resulted in option fatigue,
          making it challenging for them to make a decision.
        </p>
      </SplitHeading>
      <SplitHeading heading={"Customer with Dietary Needs"} size="sm">
        From the group with dietary needs the answered ranged significantly
        based on the type of diet they had:
        <br />
        For people that were vegetarian, pescatarian or vegan they loved the
        fact that the apps displayed an icon for if an item was part of their
        diet. They also pointed out that they had a category for their diet but
        pointed out that they wish it was a filter option as well since if they
        select that category they can&apos;t search for cuisines they are
        looking for. Users with intolerances and allergies had the same points
        stating that food delivery apps were hard to use for them since they
        either have to call each restaurant or are forced to read through the
        entire list of ingredients for each item.
      </SplitHeading>
      <SplitHeading heading={"Market Research"} size="lg" subheading="Stage 3">
        <p>
          When it comes to food delivery apps, the market is extremely
          saturated, with most doing the basics, allowing you to pick from a
          variety of restaurants and get it delivered within an hour. With the
          number of apps on the market, it makes it hard to choose the best one
          for you with some giving perks like discounts while others give quick
          deliveries. Each has its positives and negatives to each other but
          what all of them do not have, is overall useability for people with
          allergies (nearly 11% of the US population) and the additional 14% of
          the UK population that are vegetarian and vegan.
        </p>
      </SplitHeading>
      <BrandedCard
        bg="rgba(255,128,0,0.1)"
        brandsrcDark="/image/projects/alleat/justeat.png"
        brandsrcLight="/image/projects/alleat/justeat.png"
      >
        <p>
          Just Eat is a food delivery app designed for quick and easy food
          ordering from a variety of local restaurants. Its simplicity and
          user-friendly interface make it accessible for a wide range of
          eateries to partner with the app. However, the extensive restaurant
          options on a single screen can sometimes overwhelm users when making a
          choice. In terms of design, Just Eat employs a basic black and white
          colour scheme with an orange accent. While its minimalist design aids
          in user intuitiveness, it also shares a similarity in appearance with
          other food delivery apps, making it both familiar and yet
          indistinguishable from its competitors.
          <br /> <br />
          Key features of Just Eat include its speedy ordering process, where
          users can select dishes and add them to their cart with minimal
          clicks. The app also offers sorting options, such as &quot;Best
          Match,&quot; which recommends restaurants based on user feedback,
          ratings, and ordering frequency. However, this algorithm can sometimes
          limit users to their previous choices, reducing the opportunity to
          discover new restaurants.
        </p>
        <div className="flex lg:flex-row flex-col gap-x-24 gap-y-8 mt-8">
          <div>
            <span className="font-bold text-large">Strengths</span>
            <br />
            <br />
            <p>
              Thanks to the simple colour scheme and large images with quick
              summaries, it makes using Just Eat a breeze, with few buttons to
              click and intuitive buttons, its simplicity means that it can run
              on a variety of devices while still being quick. On top of this,
              those with less experience with food delivery apps can still
              easily move around the app, using the orange as a key to which are
              buttons and which are basic blocks. The app also has the “best
              match” filter which helps users to find new restaurants dependent
              on previous orders made. Under the info tab, you can also get
              information about the hygiene rating and location of the
              restaurant so you know if the food is safe.
            </p>
          </div>
          <div>
            <span className="font-bold text-large">Weaknesses</span>
            <br />
            <br />
            <p>
              I noticed that little thought put into people with dietary needs
              or allergies where the only option is to call or read through a
              PDF of the ingredients reducing the ease of use of the app. There
              has also been little attention to the small parts of the app like
              the account section where if you want to change your details or
              look at previous orders you need to go to a special section where
              there is a side menu that has the details about your account. This
              is not very intuitive and makes it hard for people who are not
              tech-savvy or haven&apos;t tried a food delivery app, to find this
              important information.
            </p>
          </div>
        </div>
      </BrandedCard>
      <BrandedCard
        bg="rgb(150,220,20,0.1)"
        brandsrcDark="/image/projects/alleat/hellofreshdark.png"
        brandsrcLight="/image/projects/alleat/hellofreshlight.png"
      >
        <p>
          HelloFresh is a meal kit delivery service offering a variety of meal
          options based on user preferences. Users can select from 27+ weekly
          recipes created by chefs and receive ingredients and cooking
          instructions on their chosen day. The service emphasizes design and
          user experience, particularly in its colour scheme, which
          predominantly features green, white, and black. The site uses
          variations of green to indicate interactable elements.
          <br />
          <br />
          Utilizing vibrant images to showcase dishes, it helps users visualize
          meals. One standout aspect is the attention to detail, especially in
          packaging. Meals arrive in recycled materials, with portioned
          ingredients. The outer box is visually appealing and aligned with the
          brand. Inside, detailed instructions and labelled bags streamline the
          cooking process, with one bag designated for refrigerated items.
          <br />
          <br />
          HelloFresh offers several key features that set it apart. Firstly, it
          prides itself on providing high-quality meals by continuously refining
          its menu based on user preferences. They use popular ingredients
          chosen by customers to create new recipes. Additionally, user feedback
          helps accommodate those with allergies by offering multiple options
          and providing detailed ingredient lists, including nutrition
          information. This is particularly helpful for individuals with
          specific dietary requirements, such as diabetics, protein enthusiasts,
          or those seeking low-calorie options.
          <br />
          <br />
          Another notable feature is the flexibility of the menu. Users can
          adjust the number of portions they want and, for some dishes, can even
          switch the type of meat used. This not only caters to dietary
          restrictions but also allows for variety within dishes. Furthermore,
          HelloFresh offers flexibility at a broader level, allowing users to
          switch between different meal plan categories, such as &quot;meat and
          veggies,&quot; &quot;veggie,&quot; or &quot;pescetarian.&quot; They
          also have a family option, making it convenient to prepare delicious
          meals on a larger scale, accommodating a range of palates.
        </p>
        <div className="flex lg:flex-row flex-col gap-x-24 gap-y-8 mt-8">
          <div>
            <span className="font-bold text-large">Strengths</span>
            <br /> <br />
            <p>
              HelloFresh excels in providing a speedy and user-friendly service,
              catering to individuals with busy lives. Its strengths in this
              regard are achieved through various means:
            </p>
            <ol className="list-decimal pl-6">
              <br />
              <li>
                <b>Limited Menu</b>: HelloFresh offers a curated menu of around
                20 dishes, streamlining the selection process and reducing
                decision fatigue for users.
              </li>
              <br />
              <li>
                <b>Automatic Selection</b>: The service automatically selects
                meals for the following week if a user forgets to choose,
                ensuring that customers do not go hungry and maintaining a
                seamless experience.
              </li>
              <br />
              <li>
                <b>Efficient Dish Preparation</b>: HelloFresh takes into account
                the time needed for meal preparation, ensuring that users do not
                feel overwhelmed by multitasking. The step-by-step instructions
                are clear and concise, making cooking more relaxed and
                manageable.
              </li>
              <br />
              <li>
                <b>Family-Friendly</b>: The service&apos;s clear instructions
                with accompanying images make it family-friendly, allowing even
                children to help with meal preparation.
              </li>
            </ol>
          </div>
          <div>
            <span className="font-bold text-large">Weaknesses</span>
            <br /> <br />
            <p>
              HelloFresh, while generally effective, does have a few limitations
              that could be improved:
            </p>
            <ol className="list-decimal pl-6">
              <br />
              <li>
                <b>Allergies</b>: HelloFresh could enhance its allergy
                management. It currently lacks a feature to specify allergens,
                potentially leading to the accidental selection of meals
                containing allergens. Additionally, the full ingredient lists,
                especially for hidden ingredients in sauces and spices, should
                be more transparent to accommodate individuals with allergies.
              </li>
              <br />
              <li>
                <b>Recipe Limit</b>: Another limitation is the maximum of 5
                recipes per week. This might be restrictive for users who need
                to plan meals for both lunch and dinner throughout the week.
                Expanding the variety and number of recipes could provide more
                flexibility and options for customers.
              </li>
            </ol>
          </div>
        </div>
      </BrandedCard>
      <BrandedCard
        bg="rgb(218, 54, 67, 0.1)"
        brandsrcDark="/image/projects/alleat/opentabledark.png"
        brandsrcLight="/image/projects/alleat/opentablelight.png"
      >
        <p>
          OpenTable is a comprehensive platform for discovering and reserving
          restaurant reservations online. It offers a robust search and review
          system, allowing users to search by dish and rate restaurants across
          various categories. The app&apos;s design features a quad-tone colour
          scheme with white, black, red, and blue elements.
          <br /> <br />
          OpenTable&apos;s main feature is its reservation system, offering a
          unique and efficient way to book tables at various restaurants as well
          as providing a visual interface for restaurants to manage reservations
          effectively. Another significant feature is its comprehensive
          restaurant data, including menus, transport information, location
          details, and reviews. This data is sourced from restaurants and
          reviewed by users, with categorization helping users identify what
          each restaurant excels at. Lastly, the app&apos;s advanced search
          functionality allows users to refine their restaurant searches by
          variables like date, time, and the number of people. This approach
          ensures users receive tailored results without suffering from option
          fatigue.
        </p>
        <div className="flex lg:flex-row flex-col gap-x-24 gap-y-8 mt-8">
          <div>
            <span className="font-bold text-large">Strengths</span>
            <br /> <br />
            <p>
              OpenTable boasts several notable strengths that set it apart in
              the restaurant reservation and discovery realm:
            </p>
            <ol className="list-decimal pl-6">
              <br />
              <li>
                <b>Pioneer Status</b>: OpenTable&apos;s unique and robust
                position in the industry is a significant strength. As one of
                the earliest players in the field since its inception in 1998,
                it has had ample time to evolve and cater to the diverse needs
                of users. Its longevity has also contributed to substantial
                brand recognition, making it a go-to choice for
                restaurant-related inquiries.
              </li>
              <br />
              <li>
                <b>Clean and Informative Design</b>: OpenTable&apos;s clean and
                minimalist design simplifies user interaction. The app
                efficiently presents essential restaurant information in
                summaries, including name, rating, category, and price range.
                Quick booking buttons streamline the reservation process.
                Moreover, when users delve deeper into a restaurant&apos;s
                details, OpenTable combines both internal and external sources
                to provide comprehensive information, even for establishments
                that have not integrated with OpenTable.
              </li>
              <br />
              <li>
                <b>Integration with Food Delivery Apps</b>: OpenTable recognizes
                its limitations and seamlessly addresses them. In cases where a
                restaurant does not offer reservation bookings, OpenTable offers
                a secondary option by linking to food delivery apps, ensuring
                users can still access convenient dining solutions.
              </li>
              <br />
              <li>
                <b>Advanced Search Functionality</b>: OpenTable excels in search
                functionality, allowing users to search based on various
                criteria, such as date, time, and party size. Users can also
                employ a search bar to explore categories, specific restaurant
                names, dishes, or simply leave it blank for a broader search.
                This feature provides users with tailored results, reducing the
                risk of option fatigue.
              </li>
            </ol>
          </div>
          <div>
            OpenTable has remarkably few limitations, with one notable drawback
            being its limited support for restaurant chains. Notably, popular
            chain restaurants like Domino&apos;s, Pizza Express, and Papa
            John&apos;s do not have dedicated restaurant pages on the platform.
            While the exact reason for this limitation is unclear, it suggests
            that OpenTable may not fully support or accommodate restaurant
            chains within its system.
            <br /> <br />
            Apart from this specific limitation, OpenTable does not appear to
            have significant flaws or drawbacks, making it a highly functional
            and valuable platform for restaurant reservations and information.
          </div>
        </div>
      </BrandedCard>
      <SplitHeading heading="UI Design" size="lg" subheading="Stage 3">
        <p>
          Taking the time to thoroughly plan and design every aspect ensures
          that the final product meets user needs, functions seamlessly, and
          provides a positive user experience. In my case, dedicating a month to
          designing the food delivery app allowed me to carefully consider user
          interfaces, features, and usability, ultimately resulting in a more
          refined and user-friendly application.
        </p>
      </SplitHeading>
      <Image
        className="my-4"
        src="/image/projects/alleat/alleatconcept1.webp"
      />
      <SplitHeading heading="Concept 1" size="md">
        <p>
          For concept 1, I tried to get a rough idea of how food delivery apps
          work, referencing a variety of different food delivery apps to build
          this initial idea. With this concept, the idea was to learn the
          different areas of a food delivery app and explore the parts of the
          app which were less explored.
        </p>
      </SplitHeading>

      <SplitHeading heading="Concept 2" size="md">
        <p>
          Similar to concept 1, my aim was to get a more in-depth understanding
          of how the current food delivery apps are so effective. To do this, I
          created a wire diagram of the most used food delivery apps, Just Eat
          and Uber Eats
        </p>
      </SplitHeading>
      <Image
        className="my-4"
        src="/image/projects/alleat/alleatjusteatconcept.webp"
      />
      <Image
        className="my-4"
        src="/image/projects/alleat/alleatubereatsconcept.webp"
      />
      <SplitHeading heading="" size="sm">
        <p>
          During this process, I found was that the restaurant banners usually
          have priority over the rest, being front and centre. On top of this,
          restaurants also had the delivery price visible in the summary card,
          having their restaurant names showing up prominently. With these new
          wireframes, I set out making a new design, based around these
          findings, giving comprehensive details of each restaurant. This
          resulted in the following concept:
        </p>
      </SplitHeading>
      <Image
        className="my-4"
        src="/image/projects/alleat/alleatconcept2.webp"
      />
      <SplitHeading heading="" size="sm">
        <p>
          After creating this, I got some participants to fill in a form to get
          their opinion on the designs and immedietely it was clear that the
          restaurants were given too much space on the screen, taking a while to
          search through the list of restaurants - furthermore, the spacing of
          everything, meant that very little information was being conveyed over
          the space of the phone. From my time with mainly desktop app
          development, I understood that in order to make a good mobile app,
          things would need to be condensed to better fit in the size
          constraints of a much smaller screen that could also be a variety of
          sizes. This led me to the final concept art which I would use for the
          app development.
        </p>
      </SplitHeading>
      <Image
        className="my-4"
        src="/image/projects/alleat/alleatfinalconceptfigma.png"
      />
      <SplitHeading heading="Final Concept" size="md">
        <p>
          With the final concept, it aims to be different from the competition -
          instead of having generic recommendations on the homepage, it would
          include a dedicated recommendations page for restaurants and for
          foods, using a multi-point recommendation algorithm with the help of
          machine learning. These points would include
        </p>
        <br />
        <ol className="list-disc pl-6">
          <li>
            <b>Previously ordered restaurants</b>: By including this as a data
            point, it helps to understand user patterns, focusing on a more
            general sense of what the user likes
            <br />
            <br />
            <ol className="list-disc ml-8">
              <li>
                <b>Restaurant category</b>: Identifies the types of restaurants
                the user prefers, enabling clustering and ranking of similar
                restaurants for future recommendations
              </li>
              <br />
              <li>
                <b>Distance from restaurant</b>: Balances personalisation with
                practicality. Users tend to order from nearby restaurants due to
                shorter delivery times and lower fees. A model can weigh
                proximity to boost relevant recommendations.
              </li>
              <br />
              <li>
                <b>Public restaurant rating</b>: Users typically have a limit to
                what rating they would be willing to order from - if a
                restaurant is highly rated by others, the system increases its
                weight, especially when similar users also liked it.
              </li>
              <br />
              <li>
                <b>Food Hygine Rating</b>: Some users are health-conscious,
                prioritising high hygiene ratings based on a variety of reasons.
                By checking if the user has a preference towards this, it can
                adapt based around it and give a higher weight.{" "}
              </li>
            </ol>
          </li>
          <br />
          <li>
            <b>Previous orders</b>: The inclusion of previous orders, aids in
            focusing the model on the speicific meals the user has ordered,
            helping the recommendation system infer spending habbits and their
            taste.
            <br /> <br />
            <ol className="list-disc ml-8">
              <li>
                <b>Price of food</b>: Spending patterns determine how much they
                are willing to spend and what bracket they prefer. For example,
                if they never spend over £40 on an order, it would find foods
                and restaurants that fit that bracket.
              </li>
              <br />
              <li>
                <b>Food ingredients</b>: For a more hyperfocused approach, the
                algorithm looks at the ingredients of the dishes the user
                ordered - for example continuous ordering of chicken based meals
                would recommend more like that. On the backend, each ingredient
                would get a priority rating to ensure that only core ingredients
                have weight on the recommendations.
              </li>
              <br />
              <li>
                <b>Food names and descriptions</b>: Descriptions, although low
                priority, may be important for data gathering, looking at the
                names of the dishes and compare them to user preferernces. With
                a NLP model, they may be able to convert something like
                &quot;Spicy burger&quot; into two data points, one that the user
                likes spice and another for burgers
              </li>
              <br />
              <li>
                <b>Discounts applied</b>: If the user often orders when
                discounts are available, the model can highlight deals and
                limited-time offers to increase engagement.
              </li>
              <br />
              <li>
                <b>Food cuisine</b>: Core to personalisation, the cuisine takes
                a high weighting, looking at patterns in orders to find which
                cuisines the user has preference for. For restaurants that sell
                different types of cuisines this may be very important to data
                analytics.
              </li>
            </ol>
          </li>
          <br />
          <li>
            <b>Profile Specifics</b>: These data points focus more on the user
            preferences and ensures that recommendations are accurate.
            <br />
            <ol className="list-disc ml-8">
              <li>
                <b>Allergies & Intollerances</b>: Acting as a hard filter, this
                removes any recommendations which contains allergins and cannot
                be removed by a customise option. This is critical to the safety
                of the users as the main selling factor is safety and
                convenience even for those with a specific food need
              </li>
              <br />
              <li>
                Diet: Based on the user&apos;s prefence, it can act as either a
                filter so that only those restaurants and dishes are
                recommended, both preventing breaking the diet and enabling
                healthy choices
              </li>
              <br />
              <li>
                Favourited Restaurants: Fourite restaurants act as a direct
                correlation to what the user wants to see, giving more
                recommendations from this restaurant than others so they can
                quickly find what they want
              </li>
              <br />
              <li>
                Favourited Foods: Similar to restaurants, it searches for foods
                that are similar to what has been favourited from other
                restaurants, acting as a more concrete recommendation over just
                previous orders
              </li>
              <br />
              <li>
                Rated restaurants: Uses explicit feedback to improve
                recommendations, with high-rated restaurants get boosted,
                low-rated ones get down-ranked.
              </li>
              <br />
              <li>
                Rated foods: Helps the model differentiate between good and bad
                dishes at a finer granularity than restaurant-level ratings.
              </li>
            </ol>
          </li>
          <br />
          <li>
            <b>Miscelaneous</b>: These include a variety of small factors that
            may make an impact with what may get recommended
            <br />
            <br />
            <ol className="list-disc ml-8">
              <li>
                <b>Time</b>: Based on the time of day, different restaurants may
                get recommended - for example breakfast foods in the morning.
                These can be made more granular if the user orders specific
                things depending on either the date in the week or the time in
                the day
              </li>
              <br />
              <li>
                <b>Location</b>: Locations of ordering may change the type of
                foods the user orders - for example, if at home, they may order
                more comfort food whilst if they are at a friend&apos;s house,
                they may order more party food. This can go further, taking into
                account if they go international for a holiday, with
                recommendations choosing the cuisine of the location to
                incentivise trying local dishes
              </li>
              <br />
              <li>
                <b>Cross-user Preferences</b>: If ordering with a lot of people,
                it may use other profiles currently on the account to find
                things that everyone can eat and will enjoy.
              </li>
            </ol>
          </li>
        </ol>
        <br />
        <p>
          The concept introduced the concept of profiles, allowing each person
          to be on the app, storing their preferences including diet, alleries
          and preferences in a single location. With this method, you can give
          temporary access to the profile through a QR code to allow for a more
          interconnected experience. From personal experience, I found that when
          ordering from a food delivery app in a group of friends, we would pass
          around a single phone, stopping any recommendations based around a
          single person to be available but by having this new system, it would
          not only keep recommendations but make ordering quicker.
        </p>
      </SplitHeading>
      <SplitHeading heading="Interactive Mockup" size="sm">
        <i>
          Try out the interactive Figma mockup.
          <br />
          <br />
          Please note that some areas may not be fully interactable. This mockup
          is used for the purpose of understanding how the app would look not
          for full functionality
        </i>
      </SplitHeading>
      <div className="w-full md:aspect-[2/1] aspect-[1/2] px-20">
        <iframe
          allowFullScreen
          className="w-full h-full"
          src="https://embed.figma.com/proto/fjJuRJ9yAnqaLxYECrHncT/All-Eat-Final?page-id=16%3A533&node-id=55-5&p=f&viewport=153%2C-427%2C0.26&scaling=scale-down&content-scaling=fixed&starting-point-node-id=55%3A5&show-proto-sidebar=1&embed-host=share"
          title="Figma Final Concept"
        />
      </div>
      <SplitHeading heading="Development" size="lg" subheading="Stage 4">
        <p>
          Development of the application used a reciprocal cycles similar to
          agile development, where a set time was assigned to finish each
          prototype and each prototype would iterate on the last. This process
          was determined by the time restraint set by the exam board.
          <br /> <br />
          Being my first app that I have made, meant that through the process, I
          was learning the skills and then applying them throughout the
          application. Initially, I was struggling to pick which platform to use
          to develop the app but decided on using Flutter due to it being new
          and looked like it would work with my needs (Little did I know that
          during the process I would find that it was missing some core features
          and would have constant issues due to it being new)
        </p>
      </SplitHeading>
      <SplitHeading
        heading="Prototype 1"
        size="lg"
        subheading="Databases and the Core"
      >
        <p />
      </SplitHeading>
      <Image src="/image/projects/alleat/alleatdatabase.webp" />
      <div className="grid gap-4 md:grid-cols-2">
        <Image src="/image/projects/alleat/slides/alleatcategoriesslide.webp" />
        <Image src="/image/projects/alleat/slides/alleatconfirmedorderslide.webp" />
        <Image src="/image/projects/alleat/slides/alleatitemslide.webp" />
      </div>
    </Project>
  );
}
