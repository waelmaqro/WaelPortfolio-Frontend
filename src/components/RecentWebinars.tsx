"use client";
import React, { useEffect } from "react";
import YouTube from "react-youtube";
import { GrNext, GrPrevious } from "react-icons/gr";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const placeHolderWebinar = {
  id: null,
  attributes: {
    videoTitle: "loading...",
    videoUrl: null,
    createdAt: null,
    updatedAt: null,
    publishedAt: null,
    webinar_category: {
      data: {
        id: null,
        attributes: {
          Category: null,
          slug: null,
          createdAt: null,
          updatedAt: null,
          publishedAt: null,
        },
      },
    },
  },
};

const placeholderData = {
  data: [
    placeHolderWebinar,
    placeHolderWebinar,
    placeHolderWebinar,
    placeHolderWebinar,
    placeHolderWebinar,
    placeHolderWebinar,
  ],
  meta: {
    pagination: {
      page: 1,
      pageSize: 6,
      pageCount: 1,
      total: 1
  }
  }
};

export default function RecentWebinars() {
  const [webData, setWebData]: any = React.useState(placeholderData);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [loading, setLoading]: any = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.latest6Webinars}&pagination[page]=${pageNumber}&pagination[pageSize]=6&populate=deep,2`
    )
      .then((res) => res.json())
      .then((data) => {
        setWebData(data);
        setTimeout(() => {
          setLoading(false), 1000;
        });
      });
  }, [pageNumber]);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };
  const totalPages = webData.meta.pagination.pageCount

  const skeletonArray = Array.from({ length: 6 }, (_: any, index: any) => (
    <div className="" key={index}>
      <div>
        <SkeletonTheme>
          <Skeleton width="100%" count={1} height={200} />
        </SkeletonTheme>
      </div>
      <div className="flex flex-row gap-5">
        <div>
          <SkeletonTheme>
            <Skeleton
              width="70px"
              height="70px"
              count={1}
              inline={true}
              circle={true}
            />
          </SkeletonTheme>
        </div>
        <div className="flex justify-center items-center gap-[20px]">
          <SkeletonTheme>
            <Skeleton width="200px" height="20px" count={2} />
          </SkeletonTheme>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="flex justify-center items-center flex-col gap-[27px]">
      
      {loading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[20px] min-[1250px]:w-[1200px] w-screen md:px-10 px-5 mb-[50px] whitespace-pre ">
          {skeletonArray}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[20px] min-[1250px]:w-[1200px] w-screen px-5 md:px-10">
          {webData.data.map((vid: any, index: any) => (
            <div key={index} className="">
              <YouTube
                videoId={vid.attributes.videoUrl}
                opts={opts}
                style={{ height: "300px" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {pageNumber === 1 ? (
        <div className="flex flex-row sm:gap-[20px] gap-[10px] justify-center items-center mb-[100px] mt-[50px]">
          <p className="h-[52px] w-[52px]  rounded-full bg-[#F4F0EC] text-center flex items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold">
            0{pageNumber}
          </p>
          <button
            onClick={() => {
              setPageNumber(pageNumber + 1);
              setWebData(placeholderData);
            }}
            className="h-[52px] w-[52px] rounded-full  text-center flex items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold"
          >
            0{pageNumber + 1}
          </button>
          <button
            onClick={() => {
              setPageNumber(pageNumber + 2);
              setWebData(placeholderData);
            }}
            className="hidden xs:flex h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] text-center  items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold"
          >
            0{pageNumber + 2}
          </button>
          <button
            className="h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] flex items-center justify-center text-[16px] text-[#292F36] font-semibold"
            onClick={() => {
              setPageNumber(pageNumber + 1);
              setWebData(placeholderData);
            }}
          >
            <GrNext />
          </button>{" "}
        </div>
      ) : (
        <div className="flex flex-row sm:gap-[20px] gap-[10px] justify-center items-center mb-[100px] mt-[50px]">
          <button
            className="h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] flex items-center justify-center text-[16px] text-[#292F36] font-semibold"
            onClick={() => {
              setPageNumber(pageNumber - 1);
              setWebData(placeholderData);
            }}
          >
            <GrPrevious />
          </button>
          <p className="h-[52px] w-[52px] rounded-full bg-[#F4F0EC] text-center flex items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold">
            {pageNumber > 9 ? null : 0}
            {pageNumber}
          </p>
          <button
            onClick={() => {
              setPageNumber(pageNumber + 1);
              setWebData(placeholderData);
            }}
            className={`h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] text-center flex items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold ${pageNumber === totalPages  ? "hidden" : "flex"}`}
          >
            {pageNumber > 8 ? "" : 0}
            {pageNumber + 1}
          </button>
          <button
            onClick={() => {
              setPageNumber(pageNumber + 2);
              setWebData(placeholderData);
            }}
            className={`h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] text-center  items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold ${totalPages - 2 ? "hidden" : "xs:flex"} `}
          >
            {pageNumber > 7 ? "" : 0}
            {pageNumber + 2}
          </button>
          <button
            className={`h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] flex items-center justify-center text-[16px] text-[#292F36] font-semibold ${pageNumber === totalPages  ? "hidden" : "flex"}`}
            onClick={() => {
              setPageNumber(pageNumber + 1);
              setWebData(placeholderData);
            }}
          >
            <GrNext />
          </button>{" "}
        </div>
      )}
    </div>
  );
}
