'use client'
import React, { useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import YouTube from "react-youtube";

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
};

export default function LatestWebinar() {
  const [webData, setWebData]: any = React.useState(placeholderData);
  const [loading, setLoading]: any = React.useState(true);
  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    fetch(
      `${process.env.latest6Webinars}&pagination[page]=1&pagination[pageSize]=6&populate=deep,2`
    )
      .then((res) => res.json())
      .then((data) => {
        setWebData(data);
        setTimeout(() => {
          setLoading(false), 1000;
        });
      });
  }, []);

  return (
    <div className="flex justify-center items-center flex-col gap-[27px]">
      <h1>Latest Webinar</h1>
      {loading ? (
        <div className="md:w-[600px] w-full md:px-10 px-5 mb-[50px] flex align-top flex-col">
          <div className="">
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
        </div>
      ) : (
        <>
          {" "}
          {webData.data.slice(0, 1).map((vid: any, index: any) => (
            <div
              key={index}
              className="md:w-[600px] w-full md:px-10 px-5 mb-[50px]  "
            >
              <YouTube
                videoId={vid.attributes.videoUrl}
                opts={opts}
                style={{ height: "300px" }}
                loading="lazy"
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
