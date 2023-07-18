import React from 'react'
import ArticleCard from './ArticleCard'

const placeholderData = {
  blogTitle: 'Loading...',
  content: 'Loading...',
  author: 'Loading...',
  timestamp: new Date(),
  category: {
    data: {
      id: 0,
      attributes: {
        Category: 'Loading...'
      }
    }
  },
  thumbnail: {
    data: {
      id: 0,
      attributes: {
        url: '',
        alternativeText: 'loading',
        width: 100,
        height: 100,
      }
    }
  }
}

export default async function Article({ blockData, id, page, pageSize }: { blockData: any, page?: number, pageSize?: number, id: any }) {

  if (page && pageSize) {
    const res = await fetch(`${process.env.baseURL}/api/blogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      { next: { revalidate: 10 } })

    const data = await res.json()

    return (
      <div key={id} className='max-w-7xl mx-auto px-10 sm:mb-[200px] xxs:mb-[100px] mb-[50px]'>
        <h1 className='text-center mb-3'>{blockData.title}</h1>
        <p className='text-center sm:w-2/3 mx-auto ss:mb-[52px] mb-[26px]'>{blockData.subtitle}</p>
        <div className='grid sm:grid-cols-3 grid-cols-1 xs:gap-7 gap-4'>
          {data.data.map((data: any, index: number) => <ArticleCard cardData={placeholderData} index={index} key={index} blogID={data.id} blog={data.id} />)}
        </div>
      </div>
    )
  }

  return (
    <div key={id} className='max-w-7xl mx-auto px-10 sm:mb-[200px] xxs:mb-[100px] mb-[50px]'>
      <h1 className='text-center mb-3'>{blockData.title}</h1>
      <p className='text-center sm:w-2/3 mx-auto ss:mb-[52px] mb-[26px]'>{blockData.subtitle}</p>
      <div className='grid sm:grid-cols-3 grid-cols-1 xs:gap-7 gap-4'>
        {blockData.blogs.data.map((data: any, index: number) => <ArticleCard cardData={data.attributes} index={index} key={index} blog={data.id}/>)}
      </div>
    </div>
  )
}
