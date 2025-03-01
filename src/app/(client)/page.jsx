"use client"
import Hero from "../../components/clientside/home/Hero";
import TopPlacesToVisitNow from "@/components/clientside/home/TopPlacesToVisitNow"
import NewsLetter from "@/components/clientside/home/NewsLetter"
import NearYou from "@/components/clientside/home/NearYou"
import ArticleOfTheDay from "@/components/clientside/home/ArticleOfTheDay"
import WhyToRead from "@/components/clientside/home/WhyToRead"
import FAQ from "@/components/clientside/FAQ"
export default function Home() {
  return (
    <div>
      <Hero />
      
      <TopPlacesToVisitNow/>
      <ArticleOfTheDay/>
      <NearYou/>

      <WhyToRead/>
      <FAQ/>

      
     
    </div>
  );
}