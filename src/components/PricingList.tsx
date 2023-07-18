'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PricingList({
  blockData,
  id,
}: {
  blockData: any;
  id: any;
}) {
  const renderPricingCard = (cardData: any, index: number) => {
    let priceColor = ""
    if (cardData.isPopular == true){
      priceColor = "text-[#CDA274]"
    } else {
      priceColor = "text-[#292F36]"
    }
    let themeBtn = cardData.button.theme;
    const body = cardData.body
      .split("\n")
      .map((line: string, index: number) => (
        <p key={index} className="leading-[50px] text-[20px]">
          {line}
        </p>
      ));
   
    switch (themeBtn) {
      case "transparent":
        themeBtn = "bg-transparent";
        break;
      case "blue":
        themeBtn = "bg-[#292F36]";
        break;
      case "gold":
        themeBtn = "bg-[#CDA274]";
        break;
    }
    return (
      <div
        key={index}
        className=" flex justify-center items-center flex-col min-[630px]:flex-row min-[840px]:flex-col text-center bg-[#F4F0EC] py-[64px] rounded-[33px] hover:shadow-lg min-[840px]:w-fit min-[630px]:w-screen gap-4 transition duration-300"
      >
        {/* Plan */}
        <div className="flex flex-col gap-[37px]">
          <h3>{cardData.title}</h3>
          <div className="flex flex-col">
            <h1
              className={`text-[85px] leading-[50px] ${priceColor}`}
            >
              <span className="text-[25px] font-DM text-[#292F36]">$</span>
              {cardData.price}
            </h1>
            <h5>{cardData.pricePlan}</h5>
          </div>

          {cardData.isPopular === true ? (
            <div className="relative items-center justify-center mb-[20px] min-[840px]:flex  min-[630px]:hidden flex">
              <div className="absolute translate-x-0 translate-y-0 bg-[#292F36] rounded-[25px] py-[10px] px-[38px]">
                <p className="text-white xxxs:text-[14px] xxs:text-[18px]">Most Popular Plans</p>
              </div>
              <Image src={cardData.line.data.attributes.url} alt={cardData.line.data.attributes.alternativeText} width={350} height={10}/>
            </div>
            
          ) : (
            <Image
              src={cardData.line.data.attributes.url}
              className="mb-[20px] min-[840px]:flex  min-[630px]:hidden flex"
              width={350} 
              height={10}
              alt={cardData.line.data.attributes.alternativeText}
            />
          )}
        </div>

        {/*Sub Content  */}
        <div className="my-[25px]">{body}</div>

        <Link href={`/${cardData.button.href}`}>
          <button
            className={`font-Jost flex justify-center items-center rounded-[18px] ${themeBtn} hover:bg-[#434950] 
                    min-[840px]:py-[26px] min-[840px]:px-[48px] px-[30px] py-[14px] xs:text-[18px] xxs:text-[14px] xxxs:text-[14px]`}
          >
            {cardData.button.buttonLabel}
            <Image
              className="ml-[10px]"
              src={cardData.button.icon.data.attributes.url}
              width={20}
              height={20}
              alt={cardData.button.icon.data.attributes.alternativeText}
              loading="lazy"
            />
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div
      className="max-w-7xl mx-auto px-10 sm:mb-[200px] xxs:mb-[100px] mb-[50px]"
      key={id}
    >
      <div className="flex justify-center items-center gap-6 flex-wrap">
        {blockData.PricingCard.map((data: any, index: number) =>
          renderPricingCard(data, index)
        )}
      </div>
    </div>
  );
}
