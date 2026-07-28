import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import PopularSubjects from "@/components/home/PopularSubjects";
import HowItWorks from "@/components/home/HowItWorks";
import AIStudyStudio from "@/components/home/AIStudyStudio";
import StudentAnalytics from "@/components/home/StudentAnalytics";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <PopularSubjects />
      <AIStudyStudio />
      <StudentAnalytics />
      <Testimonials />
      <FAQ />
    </>
  );
}