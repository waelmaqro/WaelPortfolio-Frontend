'use client'
import React, { useEffect, useState } from 'react';
import { InstagramEmbed, LinkedInEmbed, TwitterEmbed, YouTubeEmbed , } from 'react-social-media-embed';

const Instagram = ({ blockData, id }: { blockData: any, id: number }) => {

  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const getInstagramWidth = () => {
    if (screenWidth >= 1200) {
      return '600px';
    } else if (screenWidth >= 768) {
      return '400px';
    } else {
      return '300px';
    }
  };

  const getInstagramHeight = () => {
    if (screenWidth >= 1200) {
      return '800px';
    } else if (screenWidth >= 768) {
      return '600px';
    } else {
      return '450px';
    }
  };
  const getYouTubeWidth = () => {
    if (screenWidth >= 1200) {
      return '800px';
    } else if (screenWidth >= 768) {
      return '600px';
    } else {
      return '400px';
    }
  };

  const getYouTubeHeight = () => {
    if (screenWidth >= 1200) {
      return '600px';
    } else if (screenWidth >= 768) {
      return '450px';
    } else {
      return '300px';
    }
  };
  
  const getTwitterWidth = () => {
    if (screenWidth >= 1200) {
      return '400px';
    } else if (screenWidth >= 768) {
      return '300px';
    } else {
      return '200px';
    }
  };

  const getTwitterHeight = () => {
    if (screenWidth >= 1200) {
      return '600px';
    } else if (screenWidth >= 768) {
      return '450px';
    } else {
      return '350px';
    }
  };

  return (
    <div key={id} className='max-w-7xl mx-auto sm:mb-[200px] xxs:mb-[100px] mb-[50px]'>
      <div className='flex flex-wrap justify-center items-top gap-3'>
        <div className='p-3 max-w-[350px] xs:scale-100 scale-75'>
          <InstagramEmbed
            url={blockData.links[0].link}
            width={"100%"}
          />
        </div>
        <div className='p-3 max-w-[350px] xs:scale-100 scale-75'>
          <LinkedInEmbed
            url={`${blockData.links[1].link}`} 
            height="600" 
            width="300" 
            />
        </div>
        <div className='p-3 max-w-[350px] xs:scale-100 scale-75 flex justify-center items-center'>
          <TwitterEmbed
            url={blockData.links[2].link}
            width={"100%"}
            height={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default Instagram;

