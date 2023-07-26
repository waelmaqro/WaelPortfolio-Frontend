'use client';
import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Splide, SplideSlide, SplideTrack, } from "@splidejs/react-splide";

export default function Hero({ blockData, id }: { blockData: any, id: any}) {
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

  console.log(blockData.heroImgMobile.data)
  
  

  return (
    <div id='HeroSection' key={id} className='items-center xxs:mx-auto xxxs:mx-0 min-w-[28] max-w-[1400px] mx-auto sm:px-10 xs:px-0 sm:mb-[100px] xxs:mb-[50px] mb-[50px] min-[770px]:mt-[120px]' >
      
      {/* Desktop Hero section */}
      <Splide
        hasTrack={ false }     
        options={{

          width: 1200,
          height:800,
          gap: "2rem",
          perPage: 1,
          autoplay: true,
          arrows:false,
          direction: 'ttb',
          wheel: true,
          releaseWheel: true,
          
        }}
        className='min-h-[800px] mx-auto px-6 py-8 min-[50px]:hidden xxxs:hidden xxs:hidden xs:hidden min-[530px]:block sm:block bg-blue rounded-[70px] '
      >
        <SplideTrack>
        {blockData.heroImgMain.data.map((slide: any, index: any) => (
          <SplideSlide
            key={index}
            className="flex justify-center items-center px-5"
          >

            <div 
              className='rounded-[70px] w-full h-full'
              style={{
                
                  backgroundImage: `url(${slide.attributes.url})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  
                }}>
                <div className='flex flex-col text-left pr-[50px] py-[200px] '>
                  <div className='sm:bg-navy sm:bg-opacity-60 sm:max-w-[600px] pl-[50px] py-[50px] rounded-r-full flex flex-col text-left '>

                 
                  
                  <h1 className='text-white flex  font-bold max-w-[450px] text-[65px]'>{blockData.title}</h1>
                  <h1 className='text-white flex  font-bold max-w-[450px] text-[45px]'>Software Developer</h1>
                  <div className='max-w-[450px] max-h-[66px]'><p>{blockData.body}</p></div>
                  <div className='mt-4'>
                    <Link href={`/${blockData.button.href}`}>
                      <button className={`font-Jost flex justify-center items-center rounded-[18px] bg-brown hover:bg-opacity-60 transition duration-300 w-[220px] 
                      py-[15px] px-[29px] text-[18px]`}>
                        {blockData.button.buttonLabel} 
                        <Image className='ml-[10px]' src={blockData.button.icon.data.attributes.url} width={19} height={17} alt='Button Icon'/>
                      </button>
                    </Link>
                  </div>
                  </div>
                </div>
            </div>
          </SplideSlide>
        ))}
        </SplideTrack>
      </Splide>
      
      
      {/* Mobile hero section */}
      <Splide
        options={{
          rewind: true,
          width: 1200,
          height:635,
          gap: "2rem",
          perPage: 1,
          autoplay: true,
          type: "loop",
          arrows:false,
        }}
        className='min-[50px]:block xxxs:block xxs:block xs:block min-[530px]:hidden sm:hidden h-full w-full hidden'
      >
          {blockData.heroImgMobile.data.map((slide: any, index: any) => (
            <SplideSlide
              key={index}
              className="flex justify-center items-center py-10"
            >

              <div 
                className='w-full'
                style={{
                  
                    backgroundImage: `url(${slide.attributes.url})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}>
                <div className='flex flex-col text-left xxs:px-12 xxxs:px-6 py-[150px] gap-[30px] z-[5]'>
                  <div><h1>{blockData.title}</h1></div>
                    <div className='max-w-[250px]'><p className='text-[18px]'>{blockData.body}</p></div>
                    <div>
                      <Link href={`/${blockData.button.href}`}>  
                        <button className={`font-Jost flex justify-center items-center rounded-[18px] bg-brown md:w-[220px] xs:w-[75xpx]
                        py-[18px] px-[39px] xxs:text-[18px] xxxs:text-[16px]`}>
                          {blockData.button.buttonLabel} 
                          <Image className='ml-[10px]' src={blockData.button.icon.data.attributes.url} width={19} height={17} alt='Button Icon'/>
                        </button>
                      </Link>
                    </div>
                </div>
              </div>
            </SplideSlide>
          ))}
      </Splide>
    </div>
  )
}