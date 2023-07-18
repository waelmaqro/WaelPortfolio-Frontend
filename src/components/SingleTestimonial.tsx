
import React from 'react';
import Image from 'next/image';



const SingleTestimonial = ({ blockData, id }: { blockData: any, id: number }) => {
  
  return (
    
    <div key={id} className=' mx-auto px-10 sm:mb-[150px] xxs:mb-[75px] mb-[37.5px] '>
      
      <div className="flex flex-row items-center justify-center relative">
      <img className="relative left-[50px] md:left-[80px] lg:left-[80px] xl:left-[60px] md:opacity-50 hidden sm:block" src={blockData.leftpattern.data.attributes.url} />


        
        <div className=" container-text     " style={{width:'520px'}}>
          <h1 id='code' className="text-slate-700 text-center text-6xl italic mb-0 text-center sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">“</h1>

          <h1  className="text-slate-700 text-32px leading-[125%] tracking-[0.7px] italic mb-5 text-center  ">
            <span className="text-2xsm sm:text-2xsm md:text-2xl lg:text-3xl xl:text-xl 2xl:text-2xl text-2xl leading-[125%] tracking-[1px]">{blockData.desc}</span>
          </h1>
          <h4  className="text-center sm:text-s md:text-s lg:text-2xl xl:text-xl 2xl:text-2xl text-lg font-jost font-normal leading-150 tracking-tighter text-gray-700">{blockData.name}</h4>
        </div>
        <img className="relative right-[60px]  lg:right-[80px] xl:right-[80px] md:opacity-50  hidden sm:block hidden md:block" src={blockData.rightpattern.data.attributes.url} />
      </div>
    </div>
  );
};

export default SingleTestimonial;
