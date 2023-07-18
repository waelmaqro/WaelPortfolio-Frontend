
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Features({ blockData, id }: { blockData: any, id: any }) {

  return (
    <div className='max-w-7xl mx-auto px-10 sm:mb-[100px] xxs:mb-[50px] mb-[50px]' key={id}>
        <div className='flex flex-row flex-wrap text-black'>
            {
                blockData.featureCard.map((card: any, index: number) => {
                    return(
                        <div className='p-11 mt-6 mx-auto max-w-[400px] text-center justify-center items-center flex flex-col xs:py-0 xxs:py-8 xxxs:py-8 hover:bg-[#F4F0EC] hover:rounded-[70px]' key={index}> 
                            <h3 className='mt-[80px] mb-[20px]'>{card.title}</h3>
                            <div className='xxs:pb-[25px] xxxs:pb-[25px] xs:pb-[52px] max-w-md'>
                                <p>{card.body}</p>
                            </div>
                            <div className='mb-[80px] justify-center flex text-center'>
                                <Link href={card.button.href}>
                                    <button className={`${card.button.theme} flex items-center justify-center`}>
                                        <p className='font-semibold p-sm'>{card.button.buttonLabel}</p>
                                        <Image className='ml-[10px]' src={card.button.icon.data.attributes.url} width={20} height={20} alt={card.button.icon.data.attributes.alternativeText} loading='lazy' />
                                    </button>
                                </Link>
                            </div>
                        </div>
                        
                    ) 
                })
            }
        </div>
    </div>
  )
}
