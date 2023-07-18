'use client';
import React, { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Image from 'next/image';

interface TestimonialProps {
  blockData: any;
  id: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ blockData, id }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [perPage, setPerPage] = useState(3);

  const handleSlideChange = (splide: any) => {
    setActiveIndex(splide.index);
  };

  const handleSliderDrag = (splide: any) => {
    setActiveIndex(splide.index);
  };

  const handleArrowClick = (nextIndex: number) => {
    setActiveIndex(nextIndex);
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let perPageValue = 3;

      if (screenWidth < 640) {
        perPageValue = 1;
      } else if (screenWidth < 1200) {
        perPageValue = 2;
      } else {
        perPageValue = 3;
      }

      setPerPage(perPageValue);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call to set the initial perPage value based on the screen size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div key={id} className='max-w-7xl mx-auto px-10 sm:mb-[150px] xxs:mb-[75px] mb-[37.5px]'>
      <div className="bg-[#F4F0EC] sm:w-full sm:h-auto px-5" style={{ borderRadius: '70px', paddingTop: '3%', paddingBottom: '3%' }}>
        <section className="flex flex-col items-center justify-center py-12 mx-auto max-w-1xl lg:max-w-6xl md:max-w-3xl  sm:h-64" style={{ width: '100%', height: '100%' }}>
          <h1 className="text-5xl font-DM Serif Display text-center leading-[125%] tracking-[1px]" style={{ width: '50%', marginBottom: '10px' }}>{blockData.Title}</h1>

          <Splide id="three-testimonials"
            options={{
              perPage,
              perMove: 1,
              pagination: true,
              rewind: true,
              autoplay: true,
              interval: 3000,
              start: activeIndex,
              arrows: false,
              gap: '2rem',
              type: 'loop',
            }}
            onMoved={handleSlideChange}
            onDragged={handleSliderDrag}
            className="grid grid-cols-1 mx-auto gap-5 mt-8"
          >
            {blockData.reviews.map((element: any, index: any) => (
              <SplideSlide key={index} className='py-[50px]'>
                <div
                  style={{ border: '1px solid white', marginBottom: 'mb-4', borderRadius: '33px', display: 'flex', flexDirection: 'column', justifyContent: 'start', height: '339px' }}
                  className='bg-[#FFFFFF] h-64 pl-9 w-[100%]'
                >
                  <div style={{ display: 'flex', marginBottom: '20px', marginTop: '55px' }}>
                    <div style={{ width: '75px', height: '75px', borderRadius: '50%', overflow: 'hidden', marginRight: '10px', marginBottom: '2.5%' }}>
                      <Image
                        src={element.profilePic.data.attributes.url}
                        alt={element.name}
                        style={{ width: '305px', height: 'auto', objectFit: 'cover' }}
                        width={305}
                        height={300}
                        priority
                      />
                    </div>
                    <div className='leading-[150%] tracking-[0.22px]' style={{ marginLeft: '13px', marginTop: '8px' }}>
                      <h3 className='font-bold p-lg' style={{ marginBottom: '3px' }}>{element.name}</h3>
                      <p className='font-Jost  p-md' style={{}}>{element.location}</p>
                    </div>
                  </div>
                  <p style={{ width: '85%', marginBottom: '10px' }} className='font-Jost leading-[150%] tracking-[0.30px] p-md '>{element.desc}</p>
                </div>
              </SplideSlide>
            ))}
          </Splide>
        </section>
      </div>
    </div>
  );
};

export default Testimonial;
