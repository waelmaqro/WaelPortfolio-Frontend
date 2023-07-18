import BlockManager from "@/services/blockManager"
//http://127.0.0.1:1337/api/pages?populate=deep&filters[slug][$eq]=about
// ${process.env.pageURL}[slug][$eq]=${slug}
export default async function HomePage() {
  //fetch api based on slug
  const slug = "home";
  let strapiRawData;
  try {
    const res = await fetch(
      `${process.env.pageURL}[slug][$eq]=${slug}`,
      { next: { revalidate: 300 } }
    );
    strapiRawData = await res.json();
  } catch (err) {
    return <div>Error...</div>;
  }


  //Check if page "exists"
  if (strapiRawData.data.length === 0) return <div>404 Not Found</div>;
  const data = strapiRawData.data[0].attributes;

  return (
    <div className="my-[200px]">
      {BlockManager(data.blocks)}
    </div>
  );
}
