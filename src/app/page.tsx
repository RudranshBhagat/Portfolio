import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import ProjectsGlimpse from "@/components/projects/ProjectsGlimpse";


export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsGlimpse />
      {/* <ContactSection/> */}
    </>
  );
}