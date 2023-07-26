'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function HeroStretched({ blockData, id, blogTitle }: { blockData: any, id: any, blogTitle: string}) {
    let pathname = usePathname()
    let slug = pathname.split("/").slice(1)
    let len = slug.length
    const capitalFirstLetter = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    const lowerCase = (str: string) => {
        return str.charAt(0).toLowerCase() + str.slice(1)
    }


    switch(len) {
        case 1:
            return(
                <div key={id} className=' flex justify-center items-center 
                    sm:mb-[200px] xxs:mb-[100px] 
                    mb-[50px] '>
                        <div className='max-w-[1900px] w-full'>
                            <div className='flex justify-center items-end max-h-[400px] min-h-[356px]'
                                style={{
                        
                                backgroundImage: `url(${blockData.heroImg.data.attributes.url})`,
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: 'cover',
                            }}>
                                <div className='bg-navy max-w-[520px] xxxs:px-[40px] sm:px-[80px] py-[41px] rounded-t-[37px]'>
                                    <div className='flex-col justify-center items-center text-center'>
                                        <h1>{blockData.title}</h1>
                                        <p><Link href={'/home'}>Home </Link>{slug.map((crumb: any, index: number) => (
                                            <span  key={index}>
                                                {<span>/ {capitalFirstLetter(crumb)}</span>}
                                            </span>
                                        ))}</p>
                                    </div>        
                                </div>
                            </div>
                        </div>
                    </div>
            )
        case 2:
            return (
                <div key={id} className=' flex justify-center items-center 
                    sm:mb-[200px] xxs:mb-[100px] 
                    mb-[50px] '>
                    <div className='max-w-[1900px] w-full'>
                        <div className='flex justify-center items-end max-h-[400px] min-h-[380px]'
                            style={{
                    
                            backgroundImage: `url(${blockData.heroImg.data.attributes.url})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}>
                            <div className='bg-navy max-w-[520px] xxxs:px-[40px] sm:px-[80px] py-[41px] rounded-t-[37px]'>
                                <div className='flex-col justify-center items-center text-center'>
                                    <h1>{blockData.title}</h1>
                                    <div><p><Link href={'/home'}>Home </Link>{slug.map((crumb: any, index: number) => (
                                        <span key={index}>
                                            {index === len-1 ? <span>/ {capitalFirstLetter(blockData.title)}</span> : <Link href={`/${crumb}`}>/ {capitalFirstLetter(crumb)} </Link>}
                                        </span>
                                    ))}</p></div>
                                </div>        
                            </div>
                        </div>
                    </div>
                </div>
            )
        case 3:

            if(blogTitle.length > 20){
                blogTitle = blogTitle.substring(0, 20) + "..."
            }
            return (
                <div key={id} className=' flex justify-center items-center 
                    sm:mb-[200px] xxs:mb-[100px] 
                    mb-[50px] '>
                    <div className='max-w-[1900px] w-full'>
                        <div className='flex justify-center items-end max-h-[400px] min-h-[380px]'
                            style={{
                    
                            backgroundImage: `url(${blockData.heroImg.data.attributes.url})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        }}>
                            <div className='bg-navy max-w-[520px] xxxs:px-[40px] sm:px-[80px] py-[41px] rounded-t-[37px]'>
                                <div className='flex-col justify-center items-center text-center'>
                                    <h2>{blogTitle}</h2>
                                    <div><p><Link href={'/home'}>Home </Link>{slug.map((crumb: any, index: number) => (
                                        <span key={index}>
                                            {index === len-2 ? <Link replace={true} href={`/projects/${lowerCase(blockData.categoryID)}`}>/ {capitalFirstLetter(blockData.category)} </Link> : (index === len-1 ? <span>/ {capitalFirstLetter(blogTitle)}</span> : <Link href={`/${crumb}`} replace={true}>/ {capitalFirstLetter(crumb)} </Link> )}
                                        </span>
                                    ))}</p></div>
                                </div>        
                            </div>
                        </div>
                    </div>
                </div>
            )


    }
}
