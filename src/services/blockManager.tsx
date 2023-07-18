import LeftRight from "@/components/LeftRight";
import Project from "@/components/Project";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Sponsors from "@/components/Sponsors";
import CompanyStats from "@/components/CompanyStats";
import JoinUs from "@/components/JoinUs";
import Article from "@/components/Article";
import Testimonial from "@/components/Testimonial";
import HeroStretched from "@/components/HeroStretched";
import ContactUs from "@/components/ContactUs";
import SingleTestimonial from "@/components/SingleTestimonial"
import LeftRightWork from "@/components/LeftRightWork";
import PricingList from "@/components/PricingList";
import Flipcard from "@/components/Flipcard";
import Instagram from "@/components/instagram";

const BlockManager = (blocks: any) => {

  return (
    <div>
      {blocks.map((block: any, index: number) => {
        return (
          <div key={index}>{getBlockComponent(block, index)}</div>
        )
      })}
    </div>
  );
};

const getBlockComponent = (block: any, index: number) => {
  switch (block.__component) {
    case "block.left-right":
      return <LeftRight blockData={block} id={index} />;
    case "block.project":
      return <Project blockData={block} id={index} />
    case "block.hero":
      return <Hero blockData={block} id={index} />;
     case "block.testimonial-block":
       return <Testimonial blockData={block} id={index}/>
    case "block.features":
      return <Features blockData={block} id={index} />
    case "block.instagram-block":
      return <Instagram blockData={block} id={index}/>
    case "block.sponsors":
      return <Sponsors blockData={block} id={index} />
    case "block.join-us":
      return <JoinUs blockData={block} id={index} />
    case "block.article":
      return <Article blockData={block} id={index} />
    case "block.company-stats":
      return <CompanyStats blockData={block} id={index} />
    case "block.hero-stretched":
      return <HeroStretched blockData={block} id={index} blogTitle="" />
      case "block.left-right-work":
      return <LeftRightWork blockData={block} id={index} />
    case "block.contact-us":
      return <ContactUs blockData={block} id={index} />
    case "block.single-testimonial":
      return <SingleTestimonial blockData={block} id={index}/>
    case "block.pricing-list":
      return <PricingList blockData={block} id={index}/>
    case "block.flip-cards":
      return <Flipcard blockData={block} id={index}/>
    
    
      
    
  }
};

export default BlockManager;
