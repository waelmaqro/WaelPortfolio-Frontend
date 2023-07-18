import React from 'react';
import CategoryButtons from '@/components/CategoryButtons';
import HeroStretched from '@/components/HeroStretched'
import SearchComponent from '@/components/SearchComponent';
import ArticleCard from '@/components/ArticleCard';

export default async function DynamicPage({ params }: any) {
  //fetch api based on slug
  const slug = params.category;

  const res = await fetch(`${process.env.baseURL}/api/categories?filters[slug][$contains]=${slug}&populate=deep,3`);
  const ldata = await res.json();

  const res2 = await fetch(`${process.env.baseURL}/api/categories?sort[0]=id:asc&pagination[page]=1&pagination[pageSize]=10&populate=deep,1`)
  const categoryData = await res2.json();

  let heroData = {
    title: ldata.data[0].attributes.Category,
    heroImg: {
      data: {
        attributes: {
          name: "heroContact.webp",
          alternativeText: "Hero Image for blog",
          url: "https://res.cloudinary.com/ds6szmrgb/image/upload/v1688352554/hero_Contact_c499b30b1b.webp",
        }
      }
    }
  }

  return (

    <div className='mt-[140px] mb-[200px]'>
      <HeroStretched blockData={heroData} id={1} blogTitle='' />
      <div className='flex flex-col justify-center items-center md:px-10 px-5'>
        <div className='max-w-7xl'>
          {/* Title */}
          <h1 className='text-center'>{ldata.data[0].attributes.Category}</h1>
          <div className='mt-[20px]'>
            <p className='p-md'>{ldata.data[0].attributes.body}</p>
          </div>

          {/* Category List */}
          <CategoryButtons blockData={categoryData} />

          {/* Category Search */}
          <div className='w-[100%] flex flex-col items-center justify-center gap-[20px]'>
            <h1 className="text-center mx-auto">Blogs</h1>

            <SearchComponent />

            {/* Articles */}
            <div className='flex justify-center w-[100%] mt-[25px]'>
              <div className='grid md:grid-cols-3 grid-cols-1 w-[100%] max-w-[1201px] gap-[28px]'>
                {ldata.data[0].attributes.blogs.data.map((data: any, index: number) => <ArticleCard key={index} cardData={data.attributes} index={index} blog={data.id} />)}
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>

  );
}