import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import PopularSubjects from "@/components/home/PopularSubjects";
import HowItWorks from "@/components/home/HowItWorks";
import AIStudyStudio from "@/components/home/AIStudyStudio";
import StudentAnalytics from "@/components/home/StudentAnalytics";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <PopularSubjects />
      <AIStudyStudio />
      <StudentAnalytics />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}