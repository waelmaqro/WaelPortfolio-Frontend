import CategoryWebinars from "@/components/CategoryWebinars";
import HeroStretched from "@/components/HeroStretched";
import CategoryWebinarButtons from "@/components/CategoryWebinarButtons";
import WebinarSearchComponent from "@/components/WebinarSearchComponent";

const getCategories = async () => {
  const res = await fetch(`${process.env.getAllCategories2}`);
  return res.json();

}

export default async function DynamicPage({ params }: any) {
  const slug = params.category;
  const blockData = await getCategories();
  const res = await fetch(
    `${process.env.baseURL}/api/webinar-categories?filters[slug][$contains]=${slug}&sort[0]=id%3Adesc&pagination[page]=1&pagination[pageSize]=6&populate=deep,3`
  );
  const data = await res.json();
  let heroData = {
    title: data.data[0].attributes.Category,
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
    <div className="flex  flex-col">
      <HeroStretched blockData={heroData} blogTitle="" id={1} />
      <div className="flex justify-center items-center flex-col gap-[27px]">
        {/* Webinar title */}
        {data.data.map((category: any, index: any) => (
          <h1 key={index}>{category.attributes.Category}</h1>
        ))}
        <CategoryWebinarButtons blockData={blockData} />
        <div className="w-full flex justify-center items-center md:px-10 px-5 md:mb-[50px]">
        <WebinarSearchComponent />
        </div>
    
     
       
        <CategoryWebinars slug={slug} />
      </div>
    </div>
  );
}
