"use client"
import Hero from "../../components/clientside/home/Hero";
import TopPlacesToVisitNow from "@/components/clientside/home/TopPlacesToVisitNow"
import NewsLetter from "@/components/clientside/home/NewsLetter"
import NearYou from "@/components/clientside/home/NearYou"
import ArticleOfTheDay from "@/components/clientside/home/ArticleOfTheDay"
export default function Home() {
  return (
    <div>
      <Hero />
    
      <TopPlacesToVisitNow/>
      <NewsLetter/>
      <NearYou/>
      <ArticleOfTheDay/>
     
    </div>
  );
}