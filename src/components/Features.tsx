
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Features({ blockData, id }: { blockData: any, id: any }) {

  return (
    <div className='max-w-7xl mx-auto px-10 sm:mb-[100px] xxs:mb-[50px] mb-[50px]' key={id}>
        <div className='flex flex-row flex-wrap text-black gap-2'>
            {
                blockData.featureCard.map((card: any, index: number) => {
                    return(
                        <div className='p-11 mt-6 mx-auto max-w-[390px] text-center justify-between items-center flex flex-col xs:py-10 xxs:py-8 xxxs:py-8 hover:bg-navy  bg-[#959dca] rounded-[50px] gap-[20px]' key={index}> 
                            <h3 className=''>{card.title}</h3>
                            <div className='max-w-md'>
                                <p>{card.body}</p>
                            </div>
                            <div className='justify-center flex text-center '>
                                <Link href={card.button.href}>
                                    <button className={`flex items-center justify-center `}>
                                      
                                        <Image className='ml-[10px] w-[40px]' src={card.button.icon.data.attributes.url} width={20} height={20} alt={card.button.icon.data.attributes.alternativeText} loading='lazy' />
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
