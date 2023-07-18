import CategoryButtons from "@/components/CategoryButtons";
import Link from "next/link";
import { remark } from "remark";
import html from "remark-html"
import HeroStretched from "@/components/HeroStretched";
import Image from "next/image";
import SearchComponent from "@/components/SearchComponent";
import Sidenewsbar from "@/components/Sidenewsbar";

export default async function DynamicPage({ params }: any) {

  //this is for getting category buttons
  const getCategories = async () => {
    const res = await fetch(`${process.env.baseURL}/api/categories?sort[0]=id:asc&pagination[page]=1&pagination[pageSize]=10&populate=deep,1`)
    return res.json();
  }

  //for processing content
  const processContent = async (content: string) => {
    const processedContent = await remark()
      .use(html)
      .process(content)

    const contentHTML = processedContent.toString()

    return contentHTML
  }

  //fetch api based on slug
  const id = params.slug;
  let strapiRawData;
  try {
    const res = await fetch(
      `${process.env.baseURL}/api/blogs/${id}?populate=deep,2`,
      { next: { revalidate: 10 } }
    );
    strapiRawData = await res.json();
  } catch (err) {
    return <div>Error...</div>;
  }

  //Check if page "exists"
  if (strapiRawData.data == undefined) return <div>404 Not Found</div>;
  const data = strapiRawData.data.attributes;
  const blockData = await getCategories();

  let heroData = {
    title: data.blogTitle,
    category: data.category.data.attributes.Category,
    categoryID: data.category.data.attributes.slug,
    heroImg: {
      data: {
        attributes: {
          name: "heroBlog.webp",
          alternativeText: "Hero Image for blog",
          url: "https://res.cloudinary.com/ds6szmrgb/image/upload/v1688352554/hero_Contact_c499b30b1b.webp",
        }
      }
    }
  }

  return (
    <div className="mx-auto xxxs:mt-[100px] md:mt-[140px] mb-[100px]">
      <HeroStretched blockData={heroData} id={3} blogTitle={data.blogTitle} />
      <div className="max-w-7xl mx-auto px-5 md:px-10 flex flex-col md:flex-row md:gap-[52px] gap-[25px] justify-center items-start">

        {/* Blog Content */}
        <div className="md:max-w-[800px] flex flex-col">
          {/* Title */}
          <p className="p-md">{data.category.data.attributes.Category}</p>
          <h1 className="mb-5">{data.blogTitle}</h1>
          <div className="flex justify-between mb-20">
            <p className="p-xs">{data.timestamp}</p>
            <Image
              src={data.authorIcon ? data.authorIcon.data.attributes.url : '/next.svg'}
              alt="image of author"
              width={42}
              height={42}
              className="rounded-full"
            />
          </div>
          {/* Thumbnail */}
          <Image
            className="w-[100%] rounded-[20px] mb-20"
            src={data.thumbnail.data.attributes.url}
            alt={data.thumbnail.data.attributes.alternativeText}
            width={data.thumbnail.data.attributes.width}
            height={data.thumbnail.data.attributes.height}
          />
          {/* Content */}
          <div className="blog-container md:mb-20 " dangerouslySetInnerHTML={{ __html: await processContent(data.content) }} />
        </div>

        {/* Side Bar */}
        <div className="md:w-[345px] flex flex-col w-full">
          <Sidenewsbar category={data.category.data.attributes.Category}/> 
        </div>

      </div>
    </div>
  );
}
