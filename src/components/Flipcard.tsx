"use client";

import { Options, Splide, SplideSlide } from "@splidejs/react-splide";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Flipcard({
  blockData,
  id,
}: {
  blockData: any;
  id: number;
}) {
  const carouselOptions: Options = {
    type: "loop",
  };

  const renderFlipcard = (data: any, index: number) => {
    return (
      <div
        key={index}
        className="xs:w-[284px] xs:h-[433px] w-[189px] h-[289px] group"
      >
        {/* Inner Container */}
        <div className="relative w-[100%] h-[100%] text-center transition duration-500 [transform-style:preserve-3d] rounded-[30px] group-hover:rotateY-180">
          {/* Front */}
          <div className="absolute w-[100%] h-[100%] no-backface rounded-[30px]">
            <Image
              className="rounded-[30px]"
              src={data.profileImage.data.attributes.url}
              alt={data.profileImage.data.attributes.alternativeText}
              fill={true}
            />
          </div>

          {/* Back */}
          <div className="absolute w-[100%] h-[100%] bg-light rotateY-180 no-backface rounded-[30px]">
            <div className="flex flex-col justify-between h-[100%] py-[70px]">
              <div>
                <h3 className="text-navy">{data.name}</h3>
                <p className="p-sm text-navy">{data.subtitle}</p>
              </div>

              <div className="flex justify-center gap-8 text-navy">
                {data.body}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div key={id} className="bg-blue mb-[200px] py-[185px]">
      <div className="max-w-7xl px-10 mx-auto">
        <h1 className="text-center mx-auto max-w-xl px-3 mb-10">
          {blockData.title}
        </h1>

        <div className="xlg:grid hidden grid-cols-4 gap-[22px]">
          {blockData.FlipCard.map((card: any, index: number) =>
            renderFlipcard(card, index)
          )}
        </div>

        <Splide options={carouselOptions} className="xlg:hidden block">
          {blockData.FlipCard.map((card: any, index: number) => (
            <SplideSlide key={index} className="flex w-[100%] justify-center">
              {renderFlipcard(card, index)}
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
}
