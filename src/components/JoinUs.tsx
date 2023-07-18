
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function JoinUs({ blockData, id }: { blockData: any, id: any }) {
    let themeBtn = blockData.button.theme

    switch (themeBtn) {
        case "transparent":
        themeBtn = "bg-transparent"
        break;
        case "blue":
        themeBtn = "bg-[#292F36]"
        break;
        case "gold":
        themeBtn = "bg-[#CDA274]"
        break;
    }
    return (
    <div className='max-w-7xl mx-auto xs:px-10 xxs:px-0 sm:mb-[200px] xxs:mb-[100px] mb-[50px]' key={id}>
        <div className='bg-[#292F36] py-[80px] md:px-[315px] sm:px-[215px] xs:px-[100px] xxs:px-0  xxs:rounded-none xs:rounded-[70px]'>
            <div className='flex flex-col justify-center items-center text-center'>
                <h1 className='text-white mb-3 tracking-normal'>{blockData.title}</h1>
                <p className='text-white'>{blockData.body}</p>
                <div className='mt-[32px]'>
                    <Link href={`${blockData.button.href}`}>
                        <button className={`font-Jost flex justify-center items-center rounded-[18px] ${themeBtn} hover:bg-[#434950] 
                        py-[26px] px-[37px] xs:text-[18px] xxs:text-[14px] xxxs:text-[14px]`}>
                            {blockData.button.buttonLabel} 
                            <Image className='ml-[10px]' src={blockData.button.icon.data.attributes.url} width={20} height={20} alt={blockData.button.icon.data.attributes.alternativeText} loading='lazy'/>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
