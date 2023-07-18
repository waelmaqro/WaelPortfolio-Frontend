
import Image from "next/image";

export default function LeftRightWork({ blockData }: any) {
  
  return (
    <div
      className={`flex justify-center items-center text-center flex-col w-screen sm:mb-[200px] xxs:mb-[100px]`}
    >
      <div
        className={`flex justify-center items-center text-center flex-col ${blockData.theme} px-10 lg:px-[160px] py-[116px] md:rounded-[70px] gap-[70px]  `}
      >
        <div className="md:mb-[30px] max-w-[802px] flex flex-col gap-[25px]">
          <h1>{blockData.title}</h1>
          <p>{blockData.body}</p>
        </div>
        {blockData.LeftRightWork.map((data: any, index: any) => (
          <div
            key={index}
            className="flex flex-col max-w-[967px]  gap-[56px] justify-center items-center text-center md:flex-row md:justify-start md:items-start md:text-start"
          >
            <div
              className={`flex justify-center flex-col md:max-w-[456px] ${
                data.imageFirst === true ? "md:order-2" : "md:order-1"
              }`}
            >
              <div className="flex justify-between items-center ">
                <h1 className=" font-DM text-[80px] md:text-[120px] font-bold text-white">
                  {data.heading}
                </h1>
                <Image
                  src={data.icon.data.attributes.url}
                  alt={data.icon.data.attributes.alternativeText}
                  width={92}
                  height={92}
                  className=" w-[75px] md:w-[92px]"
                />
              </div>

              <h2 className=" text-[#292F36] ">{data.textHeading}</h2>
              <p>{data.textBody}</p>
            </div>
            <div className={` ${data.imageFirst === true ? "md:order-1" : "md:order-2"}`}>
              <Image
                src={data.featureImg.data.attributes.url}
                alt={data.featureImg.data.attributes.alternativeText}
                width={500}
                height={250}
                className={`md:rounded-bl-[327px] md:rounded-tr-[123px] rounded-[70px]`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
