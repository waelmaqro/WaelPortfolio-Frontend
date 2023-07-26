import React from "react";
import { LatesPost } from "@/components/LatestPost";
import SearchComponent from "@/components/SearchComponent";
import CategoryButtons from "@/components/CategoryButtons";
import HeroStretched from "@/components/HeroStretched";
import RecentBlogs from "@/components/RecentBlogs";


const getCategories = async () => {

  const res = await fetch(`${process.env.getAllCategories}`);

  return res.json();

}

export default async function Page() {
  const blockData = await getCategories();
  let heroData = {
    title: "Projects",
    heroImg: {
      data: {
        attributes: {
          name: "heroContact.webp",
          alternativeText: "Hero Image for blog",
          url: "https://res.cloudinary.com/ds6szmrgb/image/upload/v1689896481/photo_1636956026491_86a9da7001c9_f990cc475a.avif",
        }
      }
    }

  }

  return (
    <div className="mt-[90px] mb-[200px]">
      {/* <ParallaxNews /> */}
      <HeroStretched blockData={heroData} id={1} blogTitle="" />
      <div className='px-10'>
        <LatesPost />
        <div className="mb-5 ">
          <CategoryButtons blockData={blockData} />
        </div>
      </div>
      {/* Blogs section */}
      <div className="flex flex-col gap-[20px]">
        <h1 className="text-center mx-auto text-navy">Projects</h1>

        <div className="flex justify-center items-center flex-col gap-[50px] md:px-10 px-5">
          <SearchComponent />
          <RecentBlogs />
        </div>
      </div>
    </div>
  );
}
