'use client';
import { useState } from 'react';
import Link from 'next/link';

const getBlogsFromCategory = async (id: number) => {
  const res = await fetch(`${process.env.baseURL}/api/categories/${id}?populate=deep&filters`);
  const data = await res.json();

  return data;
};

export default function CategoryButtons({ blockData }: { blockData: any }) {
  const [visibleCategories, setVisibleCategories] = useState(10);

  const loadAllCategories = () => {
    setVisibleCategories(blockData.data.length);
  };

  const categoriesToShow = blockData.data.slice(0, visibleCategories);

  const showRemoveButton = blockData.data.length > 10 && visibleCategories > 10;

  return (
    <div className='flex flex-col justify-center items-center'>
      <div className='max-w-7xl mt-20 mb-10'>
        {categoriesToShow.map((item: any, index: number) => (
          <button
            key={index}
            className='rounded-full bg-[#F4F0EC] text-[#4D5053] px-4 py-2 mr-2 mb-2'
          >
            <Link href={`/blogs/${item.attributes.slug}`}>{item.attributes.Category}</Link>
          </button>
        ))}
      </div>
      {blockData.data.length > 10 && visibleCategories < blockData.data.length && (
        <button
          className='rounded-full bg-black text-white px-4 py-2'
          onClick={loadAllCategories}
        >
          Show More
        </button>
      )}
      {showRemoveButton && (
        <button
          className='rounded-full bg-black text-white px-4 py-2 mt-4'
          onClick={() => setVisibleCategories(10)}
        >
          Show Less
        </button>
      )}
    </div>
  );
};

export { getBlogsFromCategory };
