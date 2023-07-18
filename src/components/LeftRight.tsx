
import React from "react";
import Link from "next/link";
import Image from "next/image";

const LeftRight = ({ blockData, id }: { blockData: any; id: any }) => {
  const imageFirst = blockData.imageFirst;
  const repeatable = blockData.repeatedSection === true;
  let imageStyling = "";
  

  switch (blockData.theme) {
    case "sharp-round-corners":
      imageStyling =
        "lg:w-[700px] lg:h-[635px]  lg:rounded-bl-[123px] lg:rounded-tr-[326.5px]";
      break;
    case "round-corners":
      imageStyling= "lg:rounded-[80px]"
  }

  return (
    <div
      className={`text-[#292F36] font-Jost  xxs:mb-[110px] xxxs:mb-[55px] flex xxxs:gap-[30px]  min-[1200px]:gap-[75px] items-center max-w-7xl px-10 mx-auto flex-col lg:flex-row ${repeatable ? "sm:mb-[120px]" : "sm:mb-[220px]"}`}
      key={id}
    >
      <div
        className={`flex flex-col md:gap-[47px] sm:gap:-[30px] xxxs:gap-[20px]  justify-center items-center text-center lg:justify-start lg:items-start lg:text-start ${
          imageFirst === true ? "lg:order-2" : "order-1"
        }`}
      >
        {/* Heading & Body */}
        <div className="flex flex-col gap-[33px]">
          <div className=" w-auto lg:max-w-[420px] font-DM font-bold">
            <h1>{blockData.heading}</h1>
          </div>
          <div className="body w-auto lg:max-w-[472px] ">
            <p>{blockData.body}</p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center md:gap-[47px] sm:gap:-[30px] xxxs:gap-[20px] sm:flex-row min-[1200px]:flex-col">
          {/* Call us */}
          {blockData.callSection == true ? (
            <div className="flex  xxxs:flex-row xxxs:justify-center items-center  gap-[15px] ">
              <Image
                src={blockData.phoneIcon.data.attributes.url}
                className="w-auto h-auto md:w-[93px] xxxs:w-[70px]"
                alt={blockData.phoneIcon.data.attributes.alternativeText}
                width={300}
                height={300}
                loading="lazy"
              />

              <div className="flex flex-col items-center xxxs:items-start">
                <div className="font-bold">
                  <p className="text-[1.5rem] font-bold">
                    {blockData.phoneNumber}
                  </p>
                </div>
                <p className=" ">{blockData.phonePhrase}</p>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* button */}
          <Link
            href={blockData.button[0].href}
            target={blockData.button[0].target}
          >
            <div
              className={` flex bg-[#292F36] py-[26px] px-[50px] text-white rounded-[18px] text-[18px] items-center gap-[10px] font-Jost hover:opacity-80 transition-all duration-300 `}
            >
              <div>{blockData.button[0].buttonLabel}</div>
              <Image
                src={blockData.button[0].icon.data.attributes.url}
                className="w-[18.14px] h-[16.18px] "
                alt={blockData.button[0].icon.data.attributes.alternativeText}
                width={18.14}
                height={16.18}
              />
            </div>
          </Link>
        </div>
      </div>

      <div className={`${imageFirst === true ? "lg:order-1" : "order-2"} max-w-[655px]`}>
        {/* Featured Image */}
        <Image
          src={blockData.featureImg.data.attributes.url}
          alt={blockData.featureImg.data.attributes.alternativeText}
          className={` ${imageStyling} rounded-lg flex-grow object-cover`}
          height={672}
          width={635}
          priority={true}
        />
      </div>
    </div>
  );
};

export default LeftRight;
