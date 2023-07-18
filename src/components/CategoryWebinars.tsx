"use client";
import React, { useEffect } from "react";
import YouTube from "react-youtube";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Skeleton } from "@mui/material";

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
      total: 1,
    },
  },
};

export default function CategoryWebinars({ slug }: any) {
  const [webData, setWebData]: any = React.useState(placeholderData);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [loading, setLoading]: any = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    fetch(
      `${process.env.baseURL}/api/webinar-categories?filters[slug][$contains]=${slug}&sort[0]=id%3Adesc&pagination[page]=${pageNumber}&pagination[pageSize]=6&populate=deep,3`
    )
      .then((res) => res.json())
      .then((data) => {
        setWebData(data);
        setLoading(false);
      });
  }, [pageNumber]);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const totalPages = webData.meta.pagination.pageCount;

  console.log(webData.meta)

  const skeletonArray = Array.from({ length: 6 }, (_: any, index: any) => (
    <div className="max-h-[280px]" key={index}>
      <Skeleton
        width={"100%"}
        height={"450px"}
        variant="text"
        animation="pulse"
        sx={{ animationDuration: "0.7s", margin: "0" }}
      />
    </div>
  ));

  return (
    <div className="flex justify-center items-center flex-col">
      {loading ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[20px] min-[1250px]:w-[1200px] w-screen md:px-10 px-5 mb-[50px] whitespace-pre ">
          {skeletonArray}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[20px] min-[1250px]:w-[1200px] w-screen px-5 md:px-10">
          {webData.data[0].attributes.webinars.data.map(
            (vid: any, index: any) => (
              <div key={index} className="">
                <YouTube
                  videoId={vid.attributes.videoUrl}
                  opts={opts}
                  style={{ height: "300px" }}
                  loading="lazy"
                />
              </div>
            )
          )}
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
            className={`h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] text-center flex items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold ${pageNumber === totalPages  ? "hidden" : "flex"}`}
          >
            0{pageNumber + 1}
          </button>
          <button
            onClick={() => {
              setPageNumber(pageNumber + 2);
              setWebData(placeholderData);
            }}
            className={`h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] text-center  items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold ${pageNumber === totalPages ? "hidden" : "xs:flex"}`}
          >
            0{pageNumber + 2}
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
            className={`h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] text-center flex items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold ${
              pageNumber === totalPages ? "hidden" : "flex"
            }`}
          >
            {pageNumber > 8 ? "" : 0}
            {pageNumber + 1}
          </button>
          <button
            onClick={() => {
              setPageNumber(pageNumber + 2);
              setWebData(placeholderData);
            }}
            className={`h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] text-center  items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold ${
              totalPages - 2 ? "hidden" : "xs:flex"
            } `}
          >
            {pageNumber > 7 ? "" : 0}
            {pageNumber + 2}
          </button>
          <button
            className={`h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] flex items-center justify-center text-[16px] text-[#292F36] font-semibold ${
              pageNumber === totalPages ? "hidden" : "flex"
            }`}
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
