import Image from "next/image";
import Link from "next/link";
import React from "react";
import { format, parseISO } from "date-fns";
 
export async function LatesPost() {
  const res = await fetch(`${process.env.latestBlog}`);
  const latestBlog = await res.json();
  const blog = latestBlog.data[latestBlog.data.length - 1];

  const date = blog.attributes.timestamp;
  const parseDate = parseISO(date);
  const formattedDate = format(parseDate, "d, MMMM, yyyy");

  const paragraphs: string[] = blog.attributes.content.split("\n\n");
  const secondParagraph: string = paragraphs[1];
  const description: string = secondParagraph.slice(0, 150);

  const ref = `/blogs/${blog.attributes.category.data.attributes.slug}/${blog.id}`;
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center flex-col gap-[27px]">
        <h1>Latest Post</h1>
        <div className="md:grid grid-cols-2 flex flex-col max-w-[1201px] gap-[27px] content-center md:border md:p-4 md:rounded-[60px] ">
          <Link href={ref} replace={true} className="order-2 md:order-1">
            <Image
              src={blog.attributes.thumbnail.data.attributes.url}
              alt={blog.attributes.thumbnail.data.attributes.alternativeText}
              height={blog.attributes.thumbnail.data.attributes.height}
              width={blog.attributes.thumbnail.data.attributes.width}
              className="   w-[569px] h-[478px] object-cover rounded-[50px] "
              priority={true}
            />
          </Link>

          <div className="flex-col flex justify-center gap-[41px] order-1 md:order-2 ">
            <Link href={ref} replace={true}>
              <h2>{blog.attributes.blogTitle}</h2>
            </Link>

            <p className="max-lines:4 text-ellipsis">
              {description}...{" "}
              <Link href={ref} replace={true}>
                <span className="underline underline-offset-1 opacity-90 italic hover:opacity-60 cursor-pointer transition duration-300">
                  read more.
                </span>
              </Link>
            </p>
            <div className="flex justify-between items-center">
              <p className="font-Jost text-[16px]">{formattedDate}</p>
              <Link href={ref} replace={true}>
                <Image
                  height={50}
                  width={50}
                  src="/nextbutton.svg"
                  alt="next"
                  className="h-[52px] w-[52px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
