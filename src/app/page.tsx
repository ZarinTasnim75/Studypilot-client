import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import PopularSubjects from "@/components/home/PopularSubjects";  

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <PopularSubjects />
    </>
  );
}