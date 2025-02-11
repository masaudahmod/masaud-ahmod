import AboutMe from "@/components/pages/about-section/About";
import ContactSection from "@/components/pages/contact-section/ContactSection";
import EducationSection from "@/components/pages/education-section/EducationSection";
import HeroSection from "@/components/pages/hero-section/HeroSection";
import ProjectSection from "@/components/pages/project-section/ProjectSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutMe />
      <EducationSection />
      <ProjectSection />
      <ContactSection />
    </>
  );
}
