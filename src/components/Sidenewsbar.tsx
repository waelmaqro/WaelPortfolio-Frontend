import Link from "next/link";
import SearchComponent from "./SearchComponent";
import Image from "next/image";


const getCategories = async () => {

  const res = await fetch(`${process.env.getAllCategories}`);

  return res.json();

}

export default async function Sidenewsbar({ category }: any) {
  const res = await fetch(
    `${process.env.baseURL}/api/categories?populate=deep,3&category&filters[Category][$eq]=${category}&pagination[pageSize]=3`
  );
  const data = await res.json();
  const data2 = await getCategories();
  
  return (
    <div className="flex flex-col ">
      {/* Latest News */}
      <div className="flex flex-col gap-[20px] justify-center items-center  ">
        <h3>Related Articles</h3>
        {data.data[0].attributes.blogs.data
          .splice(0, 3)
          .map((category: any, index: any) => (
            <Link
              href={`/blogs/${category.attributes.category.data.attributes.Category}/${category.id}`}
              key={index}
            >
              <div
                className={`border border-[#E7E7E7] md:p-5 sm:p-0 xxs:p-5 p-0 rounded-[62px] bg-white w-full md:w-[310px]  `}
              >
                <div className="flex flex-col ">
                  <div className=" md:mb-5 sm:mb-2 xxs:mb-5 mb-2">
                    <Image
                      className="rounded-t-[45px]  h-[250px] w-screen object-cover"
                      src={category.attributes.thumbnail.data.attributes.url}
                      alt={
                        category.attributes.thumbnail.data.attributes
                          .alternativeText
                      }
                      width={
                        category.attributes.thumbnail.data.attributes.width
                      }
                      height={
                        category.attributes.thumbnail.data.attributes.height
                      }
                      loading="lazy"
                    />
                    <div className="absolute">
                      <div className="relative top-[-60px] left-5 bg-white px-3 pt-1 pb-2 rounded-t-lg rounded-br-lg">
                        <p className="p-xs">
                          {
                            category.attributes.category.data.attributes
                              .Category
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Title, date & button */}
                  <div className="flex flex-col justify-between h-[100%] md:px-0 md:pb-0 sm:px-5 sm:pb-5 xxs:px-0 xxs:pb-0 px-5 pb-5">
                    <h3 className="lg:mr-9 mb-2 h-[63px]">
                      {category.attributes.blogTitle.slice(0, 20)}...
                    </h3>
                    <div className="flex justify-between items-center mb-4">
                      <p className="p-xs">{`${new Date(
                        category.attributes.timestamp
                      ).toLocaleDateString("en-GB", {
                        month: "long",
                        day: "numeric",
                      })}, ${new Date(
                        category.attributes.timestamp
                      ).getFullYear()}`}</p>

                      <Image
                        className="hover:opacity-60 w-[52px] h-[52px]"
                        src="/icons/arrow_right_beige.svg"
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

      {/* Categories */}
      <div className="mt-[50px] mb-[25px]">
        <h3>Discover categories you{"'"}re interested in</h3>
        <div className="mt-2">
        {data2.data.slice(0, 10).map((item: any, index: number) => (
  <button
    key={index}
    className='rounded-full bg-[#F4F0EC] text-[#4D5053] px-4 py-2 mr-2 mb-2'
  >
    <Link href={`/blogs/${item.attributes.slug}`}>{item.attributes.Category}</Link>
  </button>
))}
</div>

      </div>

      {/* <SearchComponent/> */}
      <div className="flex justify-center flex-grow w-full">
        <SearchComponent />
      </div>
    </div>
  );
}

