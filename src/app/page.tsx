import { Suspense } from "react";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Wins from "@/components/Wins";
import Pipeline from "@/components/Pipeline";
import Activity from "@/components/Activity";
import AskClient from "@/components/AskClient";
import {
  Stats,
  Work,
  AIWork,
  AskEmbed,
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
      <div id="wins" data-tour="wins" className="scroll-mt-16">
        <Wins />
      </div>
      <div id="work" data-tour="work" className="scroll-mt-16">
        <Work />
      </div>
      <div id="ai" data-tour="ai" className="scroll-mt-16">
        <AIWork />
      </div>
      <div id="ask" data-tour="ask" className="scroll-mt-16">
        <AskEmbed>
          <Suspense>
            <AskClient />
          </Suspense>
        </AskEmbed>
      </div>
      <div id="questions" data-tour="questions" className="scroll-mt-16">
        <OpenQuestions />
      </div>
      <OSS />
      <div id="stats" data-tour="stats" className="scroll-mt-16">
        <Stats />
      </div>
      <div id="pipeline" data-tour="pipeline" className="scroll-mt-16">
        <Pipeline />
      </div>
      <Activity />
      <BlogPreview />
      <Path />
      <div id="contact" data-tour="contact" className="scroll-mt-16">
        <Contact />
      </div>
    </>
  );
}
