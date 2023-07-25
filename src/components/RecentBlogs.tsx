"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Skeleton } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

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
  ],
  meta: {
    pagination: {
      page: "loading..",
      pageSize: "loading..",
      pageCount: "loading..",
      total: "loading..",
    },
  },
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
  const [loading, setLoading] = React.useState(true)

  // Hook to fetch data based on page number
  React.useEffect(() => {
    setLoading(true)
    fetch(
      `${process.env.latest6Blogs}pagination[page]=${pageNumber}&pagination[pageSize]=3&populate=deep,2`
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogsData(data);
        setLoading(false)
        if (typeof window !== "undefined") {
          // Check window to avoid server render issues
          localStorage.setItem("pageNumber", pageNumber.toString());
          window.onbeforeunload = function () {
            localStorage.clear();
          };
        }
      });
  }, [pageNumber]);

  const totalPages = blogsData.meta.pagination.pageCount;

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
              <div className="group border border-light   xxs:p-5  rounded-[62px] bg-navy hover:bg-light hover:border-navy transition duration-200 ">
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
                    <div className="relative top-[-60px] left-5 bg-navy px-3 pt-1 pb-2 rounded-t-lg rounded-br-lg">
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
                  <h3 className="lg:mr-9 lg:mb-10 mb-5 h-[65px] md:flex hidden group-hover:text-navy transition duration-300">
                    {data.attributes.blogTitle.length > 1 ? (
                      data.attributes.blogTitle.slice(0, 35)
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
                  <div className="flex items-center mb-4">
                    {data.attributes.timestamp &&
                    data.attributes.timestamp.length > 0 ? (
                      <div className="flex flex-row justify-between w-full items-center gap-2 group-hover:text-navy transition duration-300">
                        <Image
                          src={data.attributes.authorIcon.data.attributes.url}
                          height={
                            data.attributes.authorIcon.data.attributes.height
                          }
                          width={
                            data.attributes.authorIcon.data.attributes.width
                          }
                          alt={
                            data.attributes.authorIcon.data.attributes
                              .alternativeText
                          }
                          className="w-[40px] h-[40px] rounded-full"
                        />
                        <div className=" text-light group-hover:text-navy transition duration-300">
                          {`${new Date(
                            data.attributes.timestamp
                          ).toLocaleDateString("en-GB", {
                            month: "long",
                            day: "numeric",
                          })}, ${new Date(
                            data.attributes.timestamp
                          ).getFullYear()}`}
                        </div>
                      </div>
                    ) : (
                      <Skeleton
                        width={100}
                        variant="text"
                        animation="pulse"
                        sx={{ animationDuration: "0.7s" }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      
      {loading ? <CircularProgress sx={{ color: 'grey.500' }} />  : pageNumber === 1 ? (
        <div className="flex flex-row sm:gap-[20px] gap-[10px] justify-center items-center ">
          <p className="h-[52px] w-[52px]  rounded-full bg-navy text-center flex items-center justify-center font-Jost text-[16px] text-light font-semibold">
            0{pageNumber}
          </p>
          <button
            onClick={() => {
              setPageNumber(pageNumber + 1);
              setBlogsData(placeholderData);
            }}
            className={`h-[52px] w-[52px] rounded-full border-1 border border-navy text-center flex items-center justify-center font-Jost text-[16px] text-[#292F36] font-semibold ${
              totalPages === 1 ? "hidden" : "flex"
            }`}
          >
            0{pageNumber + 1}
          </button>
          <button
            onClick={() => {
              setPageNumber(pageNumber + 2);
              setBlogsData(placeholderData);
            }}
            className={` h-[52px] w-[52px] rounded-full border-1 border border-navy text-center  items-center justify-center font-Jost text-[16px] text-navy font-semibold ${
              totalPages  > 2 ? "xs:flex" : "hidden"
            }`}
          >
            0{pageNumber + 2}
          </button>
          <button
            className={`h-[52px] w-[52px] rounded-full border-1 border border-navy flex items-center justify-center text-[16px] text-navy font-semibold ${
              totalPages === 1 
                ? "hidden"
                : "flex" 
            }`}
            onClick={() => {
              setPageNumber(pageNumber + 1);
              setBlogsData(placeholderData);
            }}
          >
            <GrNext className="text-navy" />
          </button>{" "}
        </div>
      ) : (
        <div className="flex flex-row sm:gap-[20px] gap-[10px] justify-center items-center">
          <button
            className={`h-[52px] w-[52px] rounded-full border-1 border border-navy flex items-center justify-center text-[16px] text-navy font-semibold`}
            onClick={() => {
              setPageNumber(pageNumber - 1);
              setBlogsData(placeholderData);
            }}
          >
            <GrPrevious className="text-navy" style={{color: "#313B44"}}/>
          </button>
          <p className="h-[52px] w-[52px] rounded-full bg-navy text-center flex items-center justify-center font-Jost text-[16px] text-light font-semibold">
            {pageNumber > 9 ? null : 0}
            {pageNumber}
          </p>
          <button
            onClick={() => {
              setPageNumber(pageNumber + 1);
              setBlogsData(placeholderData);
            }}
            className={`h-[52px] w-[52px] rounded-full border-1 border border-navy text-center items-center justify-center font-Jost text-[16px] text-navy font-semibold ${pageNumber === totalPages ? "hidden" : "flex"}`}
          >
            {pageNumber > 8 ? "" : 0}
            {pageNumber + 1}
          </button>
          <button
            onClick={() => {
              setPageNumber(pageNumber + 2);
              setBlogsData(placeholderData);
            }}
            className={`h-[52px] w-[52px] rounded-full border-1 border border-navy text-center  items-center justify-center font-Jost text-[16px] text-navy font-semibold ${totalPages - 2 || pageNumber === totalPages ? "hidden" : "flex"}`}
          >
            {pageNumber > 7 ? "" : 0}
            {pageNumber + 2}
          </button>
          <button
            className={`h-[52px] w-[52px] rounded-full border-1 border border-navy flex items-center justify-center text-[16px] text-navy font-semibold  ${pageNumber === totalPages ? "hidden" : "flex"}`}
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
