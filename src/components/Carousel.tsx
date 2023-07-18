"use client";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import "@splidejs/react-splide/css";

export default function CarouselComponent({ blockData }: any) {
    
  return (
    <div className=" flex justify-center items-center ">
      <Splide
        options={{
          rewind: true,
          width: 800,
          gap: "1rem",
          perPage: 1,
          autoplay: true,
          type: "loop",
          arrows:false
          
          
          
        }}
      >
        {blockData.images.map((sponsor: any, index: any) => (
          <SplideSlide
            key={index}
            className="flex justify-center items-center py-10 xxxs:h-[150px] "
          >
   
            <Image
              src={sponsor.image.data.attributes.url}
              alt={sponsor.altTag}
              key={index}
              fill={true}
              loading="lazy"
              className=""
              
            />
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}
