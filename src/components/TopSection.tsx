'use client'
import React,{ useState, useEffect } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import Link from 'next/link';
import Image from 'next/image';

export default function TopSection({ globalData }: any) {

    const [isHidden, setDisplay] = useState("");

    useEffect(() => {
        const changeDisplay = () => {
          if (window.scrollY > 10) {
            setDisplay("opacity-0");
          } else {
            setDisplay("opacity-1");
          }
        };
    
        window.addEventListener("scroll", changeDisplay);
    
        return () => {
          window.removeEventListener("scroll", changeDisplay);
        };

    }, []);

    const data = globalData.data.attributes;
    const renderSocial = (data: any, index: number) => (
        <Link className=' hover:opacity-60 p-2' key={index} href={data.href} target={data.target}>
          <Image 
            className='h-[100%]' 
            src={data.icon.data.attributes.url} 
            alt={data.icon.data.attributes.alternativeText}
            width={data.icon.data.attributes.width}
            height={data.icon.data.attributes.height}
            loading='lazy'
            />
        </Link>
      )
  return (
    <div id='topSection' 
         className={` text-black z-[41] flex flex-wrap justify-center items-center p-3 bg-gray-200 ${isHidden}`}
         style={{
          transition: "display 0.3s",
         }}>
        <div className='p-3'>
            <Link href="/contact" className='flex justify-center items-center gap-2'><LocationOnIcon className='mr-[2px]' /><p>{data.topSection.address}</p></Link>
        </div>
        <div className='p-3'>
        <Link href={`mailto:${data.topSection.email}`} className='flex justify-center items-center gap-2'><EmailIcon className='mr-[2px]' /><p>{data.topSection.email}</p></Link>
        </div>
        <div className='p-3'>
            <Link href={`tel:${data.topSection.phoneNum}`} className='flex justify-center items-center gap-2'><LocalPhoneIcon className='mr-[2px]' /><p>{data.topSection.phoneNum}</p></Link>
        </div>
        <div className='flex flex-wrap justify-center items-center ml-6 py-3'>
            {data.socials.map(renderSocial)}
        </div>
        <div className='px-7 py-3 flex justify-center items-center gap-2'>
            <DraftsOutlinedIcon className='mr-[2px]' />
            <p>Free Daily Insights</p>
        </div>
        <div>
            <form className='flex gap-2'>
                <input
                    id='email'
                    type='email'
                    name='email'
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    className='invalid:border-red-500 w-[180px] px-2'
                    placeholder='Enter your Email'
                    width={5}/>
                <button type='submit' className={`text-white max-w-[220px] font-Jost flex justify-center items-center  bg-[#CDA274] hover:bg-[#434950] 
                py-2 px-6 text-[12px]`}>
                Sign Up
            </button>
            </form>
        </div>
    </div>
  )
}
