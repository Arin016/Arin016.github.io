import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal, { SpotGrid } from "@/components/Reveal";
import Window from "@/components/Window";
import { LINKS } from "@/data/content";

export const metadata = { title: " · About — Arin Mallanna Tumbagi" };

function Eyebrow({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="font-mono text-[12px] tracking-[0.16em] text-green-300">
      <span className="text-zinc-500">{n}</span>
      <span className="mx-2 text-zinc-600">·</span>
      <span>{children}</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div>
      <section>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <PageHeader
            cmd="whoami -a"
            title="I'm Arin. I build systems that survive production."
          />
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-3xl font-display text-xl font-medium leading-relaxed tracking-tight text-zinc-200 sm:text-2xl">
              Identity governance at{" "}
              <a
                className="text-green-300 underline decoration-green-400/40 underline-offset-4"
                href="https://saviynt.com"
                target="_blank"
              >
                Saviynt
              </a>
              . Before that, four years of Ocean Engineering at IIT Madras
              (JEE top 0.2% of 1.1M). Heavy mathematics, computational
              modeling, physics. It trained me to reason about complex
              systems under extreme constraints. The systems just ended up
              being software rather than ships.
            </p>
          </Reveal>
        </div>
      </section>

      {/* credentials as a quiet window object */}
      <section>
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <Reveal>
            <Window
              title="whoami — credentials"
              className="max-w-xl"
              actions={
                <span className="ml-auto shrink-0 pr-2 font-mono text-[10px] text-zinc-600">
                  since 2021
                </span>
              }
            >

              <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-zinc-200">
                    B.Tech, Ocean Engineering — IIT Madras
                  </span>
                  <span className="text-zinc-500">2021 → 2025</span>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-t border-white/10 pt-3">
                  <span className="text-zinc-200">
                    Software Engineer — Saviynt
                  </span>
                  <span className="text-zinc-500">Jun 2025 → now</span>
                </div>
              </div>
            </Window>
          </Reveal>
        </div>
      </section>

      {/* the ~20-hour job — the story, told wide */}      <section className="hairline-t">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.28fr_0.72fr]">
            <Reveal>
              <Eyebrow n="01">the story</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                The ~20-hour job that hooked me
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-[15px] leading-relaxed text-zinc-400">
                Large companies must continuously prove that no employee
                holds conflicting permissions. Creating and approving the
                same payment, for example. Running this check is called
                segregation-of-duties evaluation, and one large enterprise
                production workload ran{" "}
                <span className="text-white">
                  about 20 hours at 65 GB
                </span>
                . It re-examined the same organization hierarchy separately
                for every rule, thousands of times over. I replaced it with
                a single pass over the hierarchy plus bit-level permission
                comparison, where one processor instruction evaluates 64
                people at once.
              </p>
              <div className="mt-6 rounded-xl border border-green-400/25 bg-green-400/[0.06] p-5 font-mono text-sm">
                <span className="font-extrabold text-white">
                  A few minutes end to end. Under about 1 GB.
                </span>{" "}
                <span className="text-green-200">
                  Matching violations across rollout comparisons.
                </span>
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-zinc-400">
                The remaining minutes are almost entirely database writes.
                Persisting the violation records is now the job, where
                evaluating them used to be. Making compute negligible
                didn&apos;t eliminate the bottleneck. It moved it somewhere
                cheaper. That migration is the shape of most performance
                work at scale.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-zinc-400">
                That&apos;s the work I keep chasing: the right data
                structure collapsing a problem by two orders of magnitude.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* what I work on — editorial rows */}
      <section className="hairline-t">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <Reveal>
            <Eyebrow n="02">current work</Eyebrow>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
              What I work on
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-12 md:grid-cols-2">
            {[
              {
                n: "01",
                h: "LICENSE INTELLIGENCE · LATEST",
                p: (
                  <>
                    Companies pay SAP per user by access level, and overpay
                    for dormant or over-privileged accounts. Most recently I
                    built the inference engine that finds this waste over
                    access data. Any number of accounts or identities, with
                    dollar savings attached. It acts on what it finds,
                    creating removal tasks with records that survive the
                    nightly data refresh.{" "}
                    <Link
                      className="text-green-300 underline"
                      href="/blog/unused-permissions-priced-in-dollars"
                    >
                      Full story
                    </Link>
                    .
                  </>
                ),
              },
              {
                n: "02",
                h: "EXPORT PIPELINE",
                p: (
                  <>
                    Streams reports of any size through a bounded buffer.
                    Formatted Excel inside ZIPs directly to S3 via
                    s3-outputstream (Apache-2.0, v2.0.0 on Maven Central):
                    one reusable 5 MiB part buffer, explicit commit/abort
                    semantics, real-S3 conformance receipt. Paginated reads
                    → 50-row sliding window → S3 multipart → streaming ZIP.
                    Full breakdown in{" "}
                    <Link
                      className="text-green-300 underline"
                      href="/blog/streaming-excel-to-s3"
                    >
                      this post
                    </Link>
                    .
                  </>
                ),
              },
              {
                n: "03",
                h: "AGENT SAFETY",
                p: (
                  <>
                    When AI assistants hold tools, data access, and
                    credentials, and can call other assistants or share
                    credentials with them, dangerous permission combinations
                    reappear with no person in the loop. Existing user-role
                    checks didn&apos;t cover that setting, so I formulated
                    the agent version and built the evaluation engine. Five
                    risk patterns, deterministic checks, findings tracked to
                    resolution.{" "}
                    <Link
                      className="text-green-300 underline"
                      href="/blog/sod-for-agents"
                    >
                      Full model
                    </Link>{" "}
                    ·{" "}
                    <a
                      className="text-green-300 underline"
                      href="/agent-sod-report.pdf"
                      target="_blank"
                    >
                      Technical report (PDF)
                    </a>
                    .
                  </>
                ),
              },
              {
                n: "04",
                h: "AUTOMATED FRAUD REVIEW",
                p: (
                  <>
                    Software agents that investigate
                    emergency-administrator logs on their own, within
                    strict budgets on steps and time. Every log entry cited
                    as evidence is re-checked against the source data;
                    uncertain findings go to a human reviewer. The public
                    research harness is open source with 110 tests and a
                    frozen synthetic evaluation.{" "}
                    <a
                      className="text-green-300 underline"
                      href="https://github.com/Arin016/Log-Insights-generator"
                      target="_blank"
                    >
                      Log-Insights-generator
                    </a>
                    .
                  </>
                ),
              },
              {
                n: "05",
                h: "SECURITY INITIATIVES",
                p: (
                  <>
                    Twice asked to join temporary company-wide security
                    teams: categories of injection and access-control flaws
                    across services, encrypted internal communication, test
                    coverage from 30% to 80%.
                  </>
                ),
              },
              {
                n: "06",
                h: "AFTER HOURS · AI SYSTEMS",
                p: (
                  <>
                    Nostos, a KV-cache-aware LLM router (radix-tree prefix
                    affinity,{" "}
                    <Link
                      className="text-green-300 underline"
                      href="/blog/route-to-the-prefix"
                    >
                      write-up
                    </Link>
                    ); ArinLM, a GPT built by hand with no model shortcuts;
                    the same transformer in dependency-free C++ (
                    <a
                      className="text-green-300 underline"
                      href="https://github.com/Arin016/gpt2-cpp"
                      target="_blank"
                    >
                      gpt2-cpp
                    </a>
                    , tested); and again in raw CUDA (in progress).{" "}
                    <Link
                      className="text-green-300 underline"
                      href="/blog/gpt-from-scratch-thrice"
                    >
                      Why three times
                    </Link>
                    .
                  </>
                ),
              },
            ].map((it, i) => (
              <Reveal key={it.h} delay={(i % 2) * 0.05}>
                <div className="border-t border-white/10 py-7">
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[12px] text-green-300">
                      {it.n}
                    </span>
                    <h3 className="font-mono text-[12px] tracking-[0.18em] text-green-300">
                      {it.h}
                    </h3>
                  </div>
                  <p className="mt-3 pl-8 text-[14px] leading-relaxed text-zinc-400">
                    {it.p}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* how I got here */}
      <section className="hairline-t">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.28fr_0.72fr]">
            <Reveal>
              <Eyebrow n="03">the path</Eyebrow>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                How I got here without a CS degree
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="text-[15px] leading-relaxed text-zinc-400">
                My department&apos;s timetable left no room for Data
                Structures, OS, or Databases. So I trained in programming
                contests against students who had taken those courses, and
                stayed until my rankings matched theirs. Four years of
                evenings after naval architecture labs. Progress was slow
                and nonlinear.
              </p>
              <SpotGrid className="mt-6 grid gap-4 sm:grid-cols-3">
                <a
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:-translate-y-1 hover:border-green-400/30"
                  href={LINKS.leetcode}
                  target="_blank"
                >
                  <div className="font-display text-2xl font-bold text-white">
                    2077
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-green-300">
                    LeetCode Guardian
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-zinc-500">
                    peak rating
                  </div>
                </a>
                <a
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:-translate-y-1 hover:border-green-400/30"
                  href={LINKS.codeforces}
                  target="_blank"
                >
                  <div className="font-display text-2xl font-bold text-white">
                    1602
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-green-300">
                    Codeforces Expert
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-zinc-500">
                    max rating
                  </div>
                </a>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="font-display text-2xl font-bold text-white">
                    R2
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-green-300">
                    Meta Hacker Cup
                  </div>
                  <div className="mt-1 font-mono text-[11px] text-zinc-500">
                    round two
                  </div>
                </div>
              </SpotGrid>
              <p className="mt-6 text-[15px] leading-relaxed text-zinc-400">
                I learn the same way in ML: by rebuilding. A GPT by hand in
                PyTorch, then in dependency-free C++, then in raw GPU code;
                helmet detection with Faster R-CNN and YOLOv8; a
                Rubik&apos;s cube solver built on heuristic search with
                pattern databases.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* beyond engineering + working toward */}
      <section className="hairline-t">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="grid gap-x-12 gap-y-14 md:grid-cols-2">
            <Reveal>
              <Eyebrow n="04">off the clock</Eyebrow>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Beyond engineering
              </h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-zinc-400">
                <span className="text-white">Team Abhiyaan</span> (IITM
                autonomous vehicles). I led external relations and in 2023
                pitched to Finance Minister Nirmala Sitharaman and Commerce
                Minister Piyush Goyal at an IIT Madras Research Park event.
                Athletics: inter-department football runner-up,
                Dean&apos;s Trophy third place, hostel captain, IIT Madras
                co-captain in my final year.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <Eyebrow n="05">working toward</Eyebrow>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                What I&apos;m working toward
              </h2>
              <p className="mt-4 text-[14.5px] leading-relaxed text-zinc-400">
                I can build systems that work under extreme constraints.
                I&apos;ve done it repeatedly at scale. But I&apos;ve done it
                by inferring principles from operating production systems
                under pressure. I know <em>that</em> my ordered, replayable
                pipelines held up in review. I want the theory that
                explains <em>why</em> in the general case.
              </p>
              <p className="mt-4 text-[14.5px] leading-relaxed text-zinc-400">
                The current list (consensus, storage engines, verification,
                and serving intelligence cheaply) lives on the{" "}
                <Link className="text-green-300 underline" href="/#questions">
                  homepage
                </Link>
                , next to the production experience behind each item.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* contact band — mirrors the homepage contact */}
      <section className="hairline-t">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <Reveal>
            <div className="font-mono text-[12px] text-green-300">
              <span className="text-zinc-500">$</span> ./open_channel
            </div>
            <div className="mt-8 flex flex-wrap gap-3 font-mono text-sm">
              <a
                href={LINKS.github}
                target="_blank"
                className="rounded-md border border-white/15 bg-white/[0.04] px-6 py-3.5 text-zinc-200 transition hover:border-green-400/40 hover:text-green-200"
              >
                github/Arin016
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                className="rounded-md border border-white/15 bg-white/[0.04] px-6 py-3.5 text-zinc-200 transition hover:border-green-400/40 hover:text-green-200"
              >
                linkedin
              </a>
              <a
                href={LINKS.email}
                className="rounded-md bg-green-400 px-6 py-3.5 font-bold text-black transition hover:bg-green-300"
              >
                email me
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                className="rounded-md border border-white/15 bg-white/[0.04] px-6 py-3.5 text-zinc-200 transition hover:border-green-400/40 hover:text-green-200"
              >
                resume.pdf ↓
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
