import BlockManager from "../../services/blockManager";


export async function generateMetadata({ params }: any) {
  const slug = params.slug
  let strapiRawData;
  
  const res = await fetch(
    `${process.env.pageURL}[slug][$eq]=${slug}`,
    { next: { revalidate: 300 } }
  );
  strapiRawData = await res.json();
  const data = strapiRawData.data[0].attributes;
  const metaTitle = data.seo.metaTitle
  const metaDescription = data.seo.metaDescription
  return {
      title: metaTitle,
      description: metaDescription
    
  }
}

export default async function DynamicPage({ params }: any) {
  //fetch api based on slug
  const slug = params.slug;
  //`${process.env.pageURL}[slug][$eq]=${slug}`
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
    <div className="h-200px my-20 mx-auto  text-white ">
      {BlockManager(data.blocks)}
    </div>
  );
}
