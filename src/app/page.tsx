import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Pipeline from "@/components/Pipeline";
import Activity from "@/components/Activity";
import {
  Stats,
  Work,
  AIWork,
  OpenQuestions,
  OSS,
  BlogPreview,
  Path,
  Contact,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <div id="intro" className="scroll-mt-16">
        <Intro />
      </div>
      <div id="stats" data-tour="stats" className="scroll-mt-16">
        <Stats />
      </div>
      <div id="pipeline" data-tour="pipeline" className="scroll-mt-16">
        <Pipeline />
      </div>
      <div id="work" data-tour="work" className="scroll-mt-16">
        <Work />
      </div>
      <div id="ai" data-tour="ai" className="scroll-mt-16">
        <AIWork />
      </div>
      <div id="questions" data-tour="questions" className="scroll-mt-16">
        <OpenQuestions />
      </div>
      <OSS />
      <Activity />
      <BlogPreview />
      <Path />
      <div id="contact" data-tour="contact" className="scroll-mt-16">
        <Contact />
      </div>
    </>
  );
}
