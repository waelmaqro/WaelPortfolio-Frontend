
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer({ globalData }: { globalData: any }) {

  const footerData = globalData.data.attributes

  const renderSocial = (data: any, index: number) => (
    <Link className=' hover:opacity-60' key={index} href={data.href} target={data.target}>
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

  const renderColumn = (data: any, index: number) => (
    <div key={index} className='flex flex-col mb-7'>
      <h3 className='mb-[26px]'>{data.title}</h3>
      {data.links.map(renderLink)}
    </div>
  )

  const renderLink = (data: any, index: number) => (
    <div key={index} className=' hover:opacity-60'>
      <Link href={data.href} target={data.target}><p>{data.title}</p></Link>
      <br />
    </div>
  )

  return (
    <div className=''>

      {/* Main Footer */}
      <div className='flex sm:justify-between justify-start flex-wrap gap-8 max-w-7xl mx-auto px-10 ss:mb-24 mb-12'>

        {/* Logo & Socials */}
        <div className='flex flex-col mb-7'>
          <div className='flex mb-[18px]'>
            <Image 
              src={footerData.headerLogo.data.attributes.url} 
              alt={footerData.headerLogo.data.attributes.alternativeText}
              width={footerData.headerLogo.data.attributes.width}
              height={footerData.headerLogo.data.attributes.height} 
              loading='lazy'
              />
            <h1 className=' ml-[10px]'>{footerData.footerTitle}</h1>
          </div>
          <p className='max-w-[400px] mb-[31px]'>{footerData.footerSubtitle}</p>
          <div className='flex h-[23px] gap-14'>
            {footerData.socials.map(renderSocial)}
          </div>
        </div>

        {/* Link Columns */}
        {footerData.columns.map(renderColumn)}

        {/* Contact */}
        <div className='flex flex-col mb-7'>
          <h3 className='mb-[26px]'>{footerData.contactTitle}</h3>
          <div className='max-w-[265px]'>
            <p>{footerData.address}</p>
            <br />
            <p>{footerData.email}</p>
            <br />
            <p>{footerData.phone}</p>
          </div>
        </div>
      </div>

      {/* Copyright Text */}
      <div className='flex items-center justify-center text-center border-t-2 min-h-[122px] px-10'>
        <p>{footerData.copyrightText}</p>
      </div>

    </div>
  )
}
