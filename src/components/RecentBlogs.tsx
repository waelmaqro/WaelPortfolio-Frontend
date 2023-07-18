"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Skeleton } from "@mui/material";

const placeholderBlog = {
  attributes: {
    author: "Loading",
    authorIcon: undefined,
    blogTitle: { Skeleton },
    content: "Loading......",
    seo: [],
    timestamp: new Date(),
    thumbnail: {
      data: {
        attributes: {
          url: process.env.loading_image,
          alternativeText: "loading",
          width: 200,
          height: 200,
        },
        id: 0,
      },
    },
    category: {
      data: {
        attributes: {
          Category: "",
        },
        id: 0,
      },
    },
  },
  id: 0,
};

const placeholderData = {
  data: [
    placeholderBlog,
    placeholderBlog,
    placeholderBlog,
    placeholderBlog,
    placeholderBlog,
    placeholderBlog,
  ],
};

export default function RecentBlogs() {
  // Check window to avoid server render issues
  let pageNumberStorage: number = 1;
  if (typeof window !== "undefined") {
    if (window.localStorage.getItem("pageNumber")) {
      pageNumberStorage = parseInt(window.localStorage.getItem("pageNumber")!);
    }
  }

  // State variables
  const [blogsData, setBlogsData]: any = React.useState(placeholderData);
  const [pageNumber, setPageNumber] = React.useState(pageNumberStorage);

  // Hook to fetch data based on page number
  React.useEffect(() => {
    fetch(
      `${process.env.latest6Blogs}pagination[page]=${pageNumber}&pagination[pageSize]=6&populate=deep,2`
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogsData(data);
        if (typeof window !== "undefined") {
          // Check window to avoid server render issues
          localStorage.setItem("pageNumber", pageNumber.toString());
          window.onbeforeunload = function () {
            localStorage.clear();
          };
        }
      });
  }, [pageNumber]);

  return (
    <section className="flex justify-center items-center flex-col gap-[10px]">
      <div className="grid md:grid-cols-3  max-w-[1201px] w-screen gap-[28px] justify-center px-10 md:px-5 ">
        {/* Blog Display */}
        {blogsData &&
          blogsData.data.map((data: any, index: any) => (
            <Link
              href={`/blogs/${data.attributes.category.data.attributes.Category}/${data.id}`}
              key={index}
            >
              <div className="group border border-[#E7E7E7]    xxs:p-5  rounded-[62px] bg-white hover:bg-[#F4F0EC] transition duration-200 ">
                {/* Upper image & category */}
                <div className=" md:mb-5 sm:mb-2 xxs:mb-5 mb-2 ">
                  <Image
                    className="w-screen h-[200px] md:h-[289px] md:w-[340px] rounded-t-[45px] object-cover"
                    src={data.attributes.thumbnail.data.attributes.url}
                    alt=""
                    width={600}
                    height={400}
                    loading="lazy"
                  />
                  <div className="absolute">
                    <div className="relative top-[-60px] left-5 bg-white px-3 pt-1 pb-2 rounded-t-lg rounded-br-lg">
                      <p className="p-xs">
                        {data.attributes.category.data.attributes.Category
                          .length > 1 ? (
                          data.attributes.category.data.attributes.Category
                        ) : (
                          <Skeleton
                            width={100}
                            variant="text"
                            animation="pulse"
                            sx={{ animationDuration: "0.7s" }}
                          />
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Title, date & button */}
                <div className="flex flex-col justify-between h-[100%] md:px-0 md:pb-0 sm:px-5 sm:pb-5 xxs:px-0 xxs:pb-0 px-5 pb-5">
                  <h3 className="lg:mr-9 lg:mb-10 mb-5 h-[65px] md:flex hidden">
                    {data.attributes.blogTitle.length > 1 ? (
                      data.attributes.blogTitle.slice(0, 35) + "..."
                    ) : (
                      <Skeleton
                        width={200}
                        variant="text"
                        animation="pulse"
                        sx={{ animationDuration: "0.7s" }}
                      />
                    )}
                  </h3>
                  <h3 className="lg:mr-9 lg:mb-10 mb-5 h-[65px] md:hidden flex">
                    {data.attributes.blogTitle.length > 1 ? (
                      data.attributes.blogTitle.slice(0, 35) + "..."
                    ) : (
                      <Skeleton
                        width={200}
                        variant="text"
                        animation="pulse"
                        sx={{ animationDuration: "0.7s" }}
                      />
                    )}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <p className="p-xs">
                      {data.attributes.timestamp &&
                      data.attributes.timestamp.length > 0 ? (
                        `${new Date(
                          data.attributes.timestamp
                        ).toLocaleDateString("en-GB", {
                          month: "long",
                          day: "numeric",
                        })}, ${new Date(
                          data.attributes.timestamp
                        ).getFullYear()}`
                      ) : (
                        <Skeleton
                          width={100}
                          variant="text"
                          animation="pulse"
                          sx={{ animationDuration: "0.7s" }}
                        />
                      )}
                    </p>
                    <div className="bg-white rounded-full ">
                      <Image
                        className="hover:opacity-60 w-[52px] h-[52px]  rounded-full group-hover:opacity-20 transition duration-200 "
                        src="/nextbutton.svg"
                        alt="right arrow"
                        width={52}
                        height={52}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      {pageNumber === 1 ? (
        <div className="flex flex-row sm:gap-[20px] gap-[10px] justify-center items-center ">
          <p className="h-[52px] w-[52px]  rounded-full bg-[#F4F0EC] text-center flex items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold">
            0{pageNumber}
          </p>
          <button
            onClick={() => {
              setPageNumber(pageNumber + 1);
              setBlogsData(placeholderData);
            }}
            className="h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] text-center flex items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold"
          >
            0{pageNumber + 1}
          </button>
          <button
            onClick={() => {
              setPageNumber(pageNumber + 2);
              setBlogsData(placeholderData);
            }}
            className="hidden xs:flex h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] text-center  items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold"
          >
            0{pageNumber + 2}
          </button>
          <button
            className="h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] flex items-center justify-center text-[16px] text-[#292F36] font-semibold"
            onClick={() => {
              setPageNumber(pageNumber + 1);
              setBlogsData(placeholderData);
            }}
          >
            <GrNext />
          </button>{" "}
        </div>
      ) : (
        <div className="flex flex-row sm:gap-[20px] gap-[10px] justify-center items-center">
          <button
            className="h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] flex items-center justify-center text-[16px] text-[#292F36] font-semibold"
            onClick={() => {
              setPageNumber(pageNumber - 1);
              setBlogsData(placeholderData);
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
              setBlogsData(placeholderData);
            }}
            className={`h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] text-center flex items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold`}
          >
            {pageNumber > 8 ? "" : 0}
            {pageNumber + 1}
          </button>
          <button
            onClick={() => {
              setPageNumber(pageNumber + 2);
              setBlogsData(placeholderData);
            }}
            className={`h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] text-center hidden xs:flex items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold `}
          >
            {pageNumber > 7 ? "" : 0}
            {pageNumber + 2}
          </button>
          <button
            className={`h-[52px] w-[52px] rounded-full border-1 border border-[#CDA274] flex items-center justify-center text-[16px] text-[#292F36] font-semibold`}
            onClick={() => {
              setPageNumber(pageNumber + 1);
              setBlogsData(placeholderData);
            }}
          >
            <GrNext />
          </button>{" "}
        </div>
      )}
    </section>
  );
}
