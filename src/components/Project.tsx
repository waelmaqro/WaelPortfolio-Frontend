'use client'

import { motion } from 'framer-motion'
import { Modal, useResize } from '@nextui-org/react'
import Image from 'next/image'
import React from 'react'
import { Options, Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'

export default function Project({ blockData, id }: { blockData: any, id: any }) {

  const [isOpen, setIsOpen]: any = React.useState(false)
  const [projectIndex, setProjectIndex]: [number, any] = React.useState(0)
  const [mobileView, setMobileView]: [boolean, any] = React.useState(false)

  // Switch desktop/mobile view based on window size
  useResize(() => {
    if(typeof window !== 'undefined' && window.screen.width < 768)
      setMobileView(true)
    else 
      setMobileView(false)
  }, true)


  const renderProjectCard = (cardData: any, index: number) => {

    const handleClicked = () => {
      setIsOpen(true)
      setProjectIndex(index)
    }

    const cardImage = cardData.image.data.attributes
    const iconImage = cardData.icon.data.attributes

    let cornerStyling = ''
    switch (cardData.curveCorner) {
      case 'topLeft':
        cornerStyling = 'rounded-tl-[80px]'
        break;
      case 'topRight':
        cornerStyling = 'rounded-tr-[80px]'
        break
      case 'bottomLeft':
        cornerStyling = 'rounded-bl-[80px]'
        break;
      case 'bottomRight':
        cornerStyling = 'rounded-br-[80px]'
        break;
    }
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: index % 2 == 0 ? -25 : 25, display: 'hidden' }}
        whileInView={{ opacity: 1, x: 0, display: 'block' }}
        transition={{ ease: 'easeIn', duration: 0.6 }}
        viewport={{ once: true }}
      >
        <button className='w-[100%]' onClick={handleClicked}>
          <div className='flex flex-col'>
            <Image
              className={`w-[100%] mb-7 ${cornerStyling}`}
              src={cardImage.url}
              alt={cardImage.alternativeText}
              width={cardImage.width}
              height={cardImage.height}
              loading='lazy' />

            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <h3 className='mb-1'>{cardData.title}</h3>
                <p>{cardData.category}</p>
              </div>

              <Image
                className='sm:w-[70px] sm:h-[70px] w-[45px] h-[45px] hover:opacity-60'
                src={iconImage.url}
                alt={iconImage.alternativeText}
                width={70}
                height={70}
                loading='lazy' />

            </div>
          </div>
        </button>
      </motion.div>
    )
  }

  const renderDesktopModal = () => {

    const splideOptions: Options = {
      rewind: true,
      start: projectIndex,
    }

    return (
      <Modal
        open={isOpen}
        onClose={() => { setIsOpen(false) }}
        closeButton
        width='80vw'
        css={
          mobileView
          ?{}
          :{ height: '80vh'}
        }
      >
        <div className='flex flex-col justify-center h-[100%] py-10'>
          <Splide id='modal-container' className='h-[100%]' hasTrack={false} aria-label='Carousel' options={splideOptions}>

            <SplideTrack className='h-[100%]'>
              {blockData.cards.map((cardData: any, index: number) => (
                <SplideSlide key={index} className='flex flex-col justify-between'>
                  {/* Description */}
                  <div>
                    <h1 className='mx-5'>{cardData.title}</h1>
                    <p className='mx-5'>{cardData.category}</p>
                  </div>
                  {/* Desktop Image */}
                  <div className='relative sm:block hidden mt-10 h-[100%]'>
                    <Image
                      className='w-[100%] h-auto object-contain mx-auto'
                      src={cardData.image.data.attributes.url}
                      alt={cardData.image.data.attributes.alternativeText}
                      fill={true}
                      loading='eager'
                    />
                  </div>
                  {/* Mobile Image */}
                  <div className='sm:hidden block mt-10'>
                    <Image
                      className='w-[100%] h-auto object-contain mx-auto'
                      src={cardData.image.data.attributes.url}
                      alt={cardData.image.data.attributes.alternativeText}
                      width={cardData.image.data.attributes.width}
                      height={cardData.image.data.attributes.height}
                      loading='eager'
                    />
                  </div>
                </SplideSlide>
              ))}
            </SplideTrack>

            <div className='splide__arrows'>
              {/* Prev Arrow */}
              <button className='splide__arrow__custom splide__arrow--prev sm:w-[54px] sm:h-[54px] w-[0px] h-[0px] rotate-180'>
                <svg width="54" height="54" viewBox="0 0 71 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="35.1641" cy="35" r="35" fill="#F4F0EC" />
                  <path d="M32.1641 44L40.1641 35L32.1641 26" stroke="#292F36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>

              {/* Next Arrow */}
              <button className='splide__arrow__custom splide__arrow--next sm:w-[54px] sm:h-[54px] w-[0px] h-[0px]'>
                <svg width="54" height="54" viewBox="0 0 71 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="35.1641" cy="35" r="35" fill="#F4F0EC" />
                  <path d="M32.1641 44L40.1641 35L32.1641 26" stroke="#292F36" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </Splide>

        </div>
      </Modal>
    )
  }

  return (
    <div key={id} className='max-w-7xl mx-auto px-10 sm:mb-[200px] xxs:mb-[100px] mb-[50px]'>

      {/* Main Content */}
      <h1 className='text-center mx-auto mb-2'>{blockData.title}</h1>
      <p className='text-center mx-auto sm:w-2/3 sm:mb-24 xxs:mb-12 mb-6'>{blockData.subtitle}</p>
      <div className='grid sm:grid-cols-2 grid-cols-1 lg:gap-x-24 md:gap-x-12 sm:gap-x-6 sm:gap-y-14 xxs:gap-y-7 gap-y-4'>
        {blockData.cards.map((card: any, index: number) => {
          return renderProjectCard(card, index)
        })}
      </div>

      {/* Modal */}
      {renderDesktopModal()}

    </div>
  )
}