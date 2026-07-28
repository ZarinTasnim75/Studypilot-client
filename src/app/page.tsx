import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import PopularSubjects from "@/components/home/PopularSubjects";  
import HowItWorks from "@/components/home/HowItWorks";
import AIStudyStudio from "@/components/home/AIStudyStudio";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <PopularSubjects />
      <AIStudyStudio />
    </>
  );
}