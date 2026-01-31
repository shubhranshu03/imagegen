import ClearClientAttributes from "./Component/ClearClientAttributes";
import ComparisonSection from "./Component/ComparisonSection";
import FAQSection from "./Component/FAQSection";
import Footer from "./Component/Footer";
import GenHero from "./Component/GenHero";
import Headshot from "./Component/Headshot";
import HeroSection from "./Component/HeroSection";
import InfiniteGallery from "./Component/InfiniteGallery";
import MarketingBanner from "./Component/MarketingBanner";
import Navbar from "./Component/Navbar";
import Pricing from "./Component/Pricing";
import ReviewsSection from "./Component/ReviewsSection";
import StyleShowcase from "./Component/StyleShowcase";

export default function Home() {
  return (
     <div>
      <Navbar/>
      <HeroSection/>
      <ComparisonSection/>
      <MarketingBanner/>
      <InfiniteGallery/>
      <GenHero/>
      <Headshot/>
      <StyleShowcase/>
      <ReviewsSection/>
      <Pricing/>
      <FAQSection/>
      <Footer/>
       
      
    </div>
  );
}
