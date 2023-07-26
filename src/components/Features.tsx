"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";

export default function Features({
  blockData,
  id,
}: {
  blockData: any;
  id: any;
}) {
  return (
    <section id="FeaturesSection" className="flex justify-center items-center">
    <div
      className="max-w-7xl mx-5 px-10 sm:mb-[100px] xxs:mb-[50px] mb-[50px] bg-navy p-10 rounded-[70px]  "
      key={id}
    >
      <div className="flex flex-row flex-wrap text-black gap-2  justify-center items-center">
        <Splide
          hasTrack={false}
          options={{
            height: 400,
            gap: "2rem",
            perPage: 1,
            autoplay: true,
            arrows: false,
            direction: "ttb",
            wheel: true,
            releaseWheel: true,
            snap: true,
            duration: 1000,
            wheelMinThreshold: 0,
          }}
          className="flex justify-center items-center"
        >
          <SplideTrack>
            {blockData.featureCard.map((card: any, index: number) => {
              return (
                <SplideSlide
                  className="p-11 mt-6 mx-auto  min-[1200px]:w-[1100px] w-full  text-center justify-between items-center flex min-[700px]:flex-row flex-col xs:py-10 xxs:py-8 xxxs:py-8  bg-light rounded-[50px] gap-[20px] md:px-[100px]"
                  key={index}
                >
                  <h3 className="text-navy min-[700px]:text-start">{card.title}</h3>
                  <div className="max-w-md min-[700px]:text-start">
                    <p className="text-navy">{card.body}</p>
                  </div>
                  <div className="justify-center flex text-center  ">
                    <Link href={card.button.href}>
                      <button className={`flex items-center justify-center `}>
                        <Image
                          className="ml-[10px] w-[40px] md:w-[90px]"
                          src={card.button.icon.data.attributes.url}
                          width={20}
                          height={20}
                          alt={card.button.icon.data.attributes.alternativeText}
                          loading="lazy"
                        />
                      </button>
                    </Link>
                  </div>
                </SplideSlide>
              );
            })}
          </SplideTrack>
        </Splide>
      </div>
    </div>
    </section>
  )
}
