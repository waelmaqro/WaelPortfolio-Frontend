import React from "react";
import Image from "next/image";
import CarouselComponent from "./Carousel";


const Sponsors = ({ blockData }: any) => {
  return (
    <div id="techStack" className="flex flex-col  justify-center items-center flex-wrap sm:mb-[85px] xxs:mb-[85px] xxxs:mb-[42.5px] max-w-screen px-5 gap-10  ">
      <h1 className="text-navy">My tech stack</h1>
      <div className="min-[0px]:hidden min-[900px]:flex flex-row gap lg:gap-[108px] md:gap-[70px] sm:gap-[50px] max-w-[1090px]">
        {blockData.images.map((sponsor: any, index: any) => (
          <Image
            src={sponsor.image.data.attributes.url}
            key={index}
            alt={sponsor.altTag}
            height={90}
            width={90}
          />
        ))}
      </div>

      <div className="min-[900px]:hidden">
        <CarouselComponent blockData={blockData} />
      </div>
    </div>
  );
};

export default Sponsors;
