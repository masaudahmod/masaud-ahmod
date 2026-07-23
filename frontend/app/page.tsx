import AboutMe from "@/components/pages/about-section/About";
import BlogSection from "@/components/pages/blog-section/BlogSection";
import ContactSection from "@/components/pages/contact-section/ContactSection";
import EducationSection from "@/components/pages/education-section/EducationSection";
import HeroSection from "@/components/pages/hero-section/HeroSection";
import ProjectSection from "@/components/pages/project-section/ProjectSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masaud Ahmod | MERN Stack & Full Stack Developer",
  description: "Portfolio of Masaud Ahmod, MERN Stack & Full Stack Developer",
  keywords: [
    "Masaud Ahmod",
    "MERN Stack Developer",
    "Full Stack Developer",
    "Next js Developer"
  ],
};


export default function Home() {
  
  return (
    <>
      <HeroSection />
      <AboutMe />
      <EducationSection />
      <ProjectSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
