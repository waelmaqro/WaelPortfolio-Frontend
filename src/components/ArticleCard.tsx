'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function ArticleCard({ cardData, index, blogID, blog }: { cardData: any, index: number, blogID?: number, blog:number }) {
  // State variable to hold "fetched" data
  const [data, setData]: any = useState(cardData)

  // Fetch data if requested
  useEffect(() => {
    if (blogID) {
      fetch(`${process.env.baseURL}/api/blogs/${blogID}?populate=*`, { next: { revalidate: 10 } })
        .then((res) => res.json())
        .then((resData) => { setData(resData.data.attributes) })
    }
  }, [blogID])

  // Variables
  const cardImage = data.thumbnail.data.attributes
  const date = new Date(data.timestamp)

  return (
    <div>
    <Link href={`/blogs/${data.category.data.attributes.slug}/${blog}`}>
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ ease: 'easeIn', duration: 0.6, delay: 0.2 * index }}
      viewport={{ once: true }}
    >
      <div className={`group border border-[#E7E7E7] h-[100%] md:p-5 sm:p-0 xxs:p-5 p-0 rounded-[62px] bg-white  hover:bg-[#F4F0EC] transition duration-200`}>
        <div className='flex flex-col h-[100%]'>

          {/* Upper image & category */}
          <div className=' md:mb-5 sm:mb-2 xxs:mb-5 mb-2 '>
            <Image
              className='w-[100%] rounded-t-[45px] h-[200px]  object-cover md:w-[340px] md:h-[289px] '
              src={cardImage.url}
              alt={cardImage.alternativeText}
              width={cardImage.width}
              height={cardImage.height}
              loading='lazy' />
            <div className='absolute'>
              <div className='relative top-[-60px] left-5 bg-white px-3 pt-1 pb-2 rounded-t-lg rounded-br-lg'>
                <p className='p-xs'>{data.category.data.attributes.Category}</p>
              </div>
            </div>
          </div>

          {/* Title, date & button */}
          <div className='flex flex-col justify-between h-[100%] md:px-0 md:pb-0 sm:px-5 sm:pb-5 xxs:px-0 xxs:pb-0 px-5 pb-5'>
            <h3 className='lg:mr-9 lg:mb-10 mb-5 h-[63px]'>{data.blogTitle.slice(0, 30)}...</h3>
            <div className='flex justify-between items-center mb-4'>
              <p className='p-xs'>{`${date.toLocaleDateString('en-GB', { month: 'long', day: 'numeric' })}, ${date.getFullYear()}`}</p>
                <div className='bg-white rounded-full'>
                <Image
                  className='hover:opacity-60 w-[52px] h-[52px] group-hover:opacity-20 transition duration-200'
                  src='/icons/arrow_right_beige.svg'
                  alt='right arrow'
                  width={52}
                  height={52}
                  loading='lazy' />
                </div>
                
           
            </div>
          </div>

        </div>
      </div>
    </motion.div>
    </Link>
    </div>
  )
}
