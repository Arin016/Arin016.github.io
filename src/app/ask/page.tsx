import { Suspense } from "react";
import AskClient from "@/components/AskClient";
import Window from "@/components/Window";
import PageHeader from "@/components/PageHeader";

export const metadata = { title: " · Ask — Arin Mallanna Tumbagi" };

export default function AskPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <PageHeader
        cmd="ask-arin --interactive"
        title="Ask the site."
        lede="Ask about my work, background, or projects. Answers come from these pages, with links to the source — or it tells you it doesn't know."
      />
      <Window title="guest@arin: ~/ask" badge="LOCAL" glow>
        <Suspense>
          <AskClient />
        </Suspense>
      </Window>
    </div>
  );
}
