import HeroStretched from "@/components/HeroStretched";
import RecentWebinars from "@/components/RecentWebinars";
import LatestWebinar from "@/components/LatestWebinar";
import CategoryWebinarButtons from "@/components/CategoryWebinarButtons";
import WebinarSearchComponent from "@/components/WebinarSearchComponent";

const getCategories = async () => {

  const res = await fetch(`${process.env.getAllCategories2}`);
  
  return res.json();

}

export default async  function Page() {
  const blockData = await getCategories();

  let heroData = {
    title: "Webinars",
    heroImg: {
      data: {
        attributes: {
          name: "heroContact.webp",
          alternativeText: "Hero Image for blog",
          url: "https://res.cloudinary.com/ds6szmrgb/image/upload/v1688352554/hero_Contact_c499b30b1b.webp",
        },
      },
    },
  };

  return (
    <section>
      <HeroStretched blockData={heroData} blogTitle="" id={1} />

      <div className="flex justify-center items-center flex-col px-10 gap-[27px]">
        <LatestWebinar />
        <CategoryWebinarButtons blockData={blockData} />
        <h1>Webinars</h1>
        <div className="w-full flex justify-center items-center md:px-10 px-5 md:mb-[50px]">
        <WebinarSearchComponent />
        </div>
        <RecentWebinars />
      </div>
    </section>
  );
}
