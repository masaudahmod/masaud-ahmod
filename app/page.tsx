import AboutMe from "@/components/pages/About";
import EducationSection from "@/components/pages/education-section/EducationSection";
import HeroSection from "@/components/pages/hero-section/HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutMe />
      <EducationSection />
    </>
  );
}
