import { LINKS } from "@/data/content";

export const metadata = { title: "About — Arin Mallanna Tumbagi" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="font-mono text-[12px] text-green-300">
        <span className="text-zinc-600">$</span> whoami -a
      </div>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-white">
        I&apos;m Arin. I build systems that survive production.
      </h1>
      <p className="mt-5 leading-relaxed text-zinc-400">
        Software Engineer at{" "}
        <a
          className="text-white underline decoration-green-400/50 underline-offset-4"
          href="https://saviynt.com"
          target="_blank"
        >
          Saviynt
        </a>        {" "}
        Identity governance across 300+ enterprise tenants on AWS, Azure and
        GovCloud. Before that, four years of Ocean Engineering at IIT Madras
        (JEE top 0.2% of 1.1M). Heavy mathematics, computational modeling,
        physics. It trained me to reason about complex systems under extreme
        constraints. The systems just ended up being software rather than
        ships.
      </p>

      <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.02] p-5 font-mono text-[13px] leading-relaxed">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:justify-between">
          <span className="text-zinc-300">
            B.Tech, Ocean Engineering — IIT Madras
          </span>
          <span className="text-zinc-600">2021 → 2025</span>
        </div>
        <div className="mt-1.5 flex flex-col gap-1.5 sm:flex-row sm:justify-between">
          <span className="text-zinc-300">Software Engineer — Saviynt</span>
          <span className="text-zinc-600">Jun 2025 → now</span>
        </div>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-white">
        The 21-hour job that hooked me
      </h2>
      <p className="mt-3 leading-relaxed text-zinc-400">
        Large companies must continuously prove that no employee holds
        conflicting permissions. Creating and approving the same payment, for
        example. Running this check is called segregation-of-duties
        evaluation, and one customer&apos;s job ran{" "}
        <span className="text-white">21 hours on a 64GB machine</span>. It
        re-examined the same organization hierarchy separately for every
        rule, thousands of times over. I replaced it with a single pass over
        the hierarchy plus bit-level permission comparison, where one
        processor instruction evaluates 64 people at once.
      </p>
      <div className="mt-4 rounded-lg border border-green-400/25 bg-green-400/[0.06] p-5 font-mono text-sm">
        <span className="font-extrabold text-white">
          2 s of compute. ~3 min end to end. 256 MB.
        </span>{" "}
        <span className="text-green-200">Byte-identical output.</span>
      </div>
      <p className="mt-4 leading-relaxed text-zinc-400">
        The remaining minutes are almost entirely database writes. Persisting
        the violation records is now the job, where evaluating them used to
        be. Making compute negligible didn&apos;t eliminate the bottleneck.
        It moved it somewhere cheaper. That migration is the shape of most
        performance work at scale.
      </p>
      <p className="mt-4 leading-relaxed text-zinc-400">
        That&apos;s the work I keep chasing: the right data structure
        collapsing a problem by two orders of magnitude.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-white">What I work on</h2>
      <div className="mt-6 space-y-8 text-[15px] leading-relaxed text-zinc-400">
        <div>
          <h3 className="font-mono text-[12px] tracking-[0.18em] text-green-300">
            LICENSE INTELLIGENCE · LATEST
          </h3>
          <p className="mt-2">
            Companies pay SAP per user by access level, and overpay for
            dormant or over-privileged accounts. Most recently I built the
            inference engine that finds this waste over access data. Any
            number of accounts or identities, with dollar savings attached.
            It acts on what it finds, creating removal tasks with records
            that survive the nightly data refresh.{" "}
            <a
              className="text-green-300 underline"
              href="/blog/unused-permissions-priced-in-dollars"
            >
              Full story
            </a>
            .
          </p>
        </div>
        <div>
          <h3 className="font-mono text-[12px] tracking-[0.18em] text-green-300">
            EXPORT PIPELINE
          </h3>
          <p className="mt-2">
            Streams reports of any size. 15M+ rows proven. Formatted Excel
            inside ZIPs directly to S3. Memory stays flat at 7MB. Paginated reads → 50-row sliding window → S3 multipart →
            streaming ZIP. Full breakdown in{" "}
            <a
              className="text-green-300 underline"
              href="/blog/streaming-excel-to-s3"
            >
              this post
            </a>
            .
          </p>
        </div>
        <div>
          <h3 className="font-mono text-[12px] tracking-[0.18em] text-green-300">
            AGENT SAFETY
          </h3>
          <p className="mt-2">
            When AI assistants hold tools, data access, and credentials, and
            can call other assistants or share credentials with them,
            dangerous permission combinations reappear with no person in the
            loop. I looked for existing work on this problem, found none, and
            built the evaluation engine. Five risk patterns, deterministic
            checks, findings tracked to resolution.{" "}
            <a className="text-green-300 underline" href="/blog/sod-for-agents">
              Full model
            </a>
            {" · "}
            <a
              className="text-green-300 underline"
              href="/agent-sod-report.pdf"
              target="_blank"
            >
              Technical report (PDF)
            </a>
            .
          </p>
        </div>
        <div>
          <h3 className="font-mono text-[12px] tracking-[0.18em] text-green-300">
            AUTOMATED FRAUD REVIEW
          </h3>
          <p className="mt-2">
            Software agents that investigate emergency-administrator logs on
            their own, within strict budgets on steps and time. Every log
            entry cited as evidence is re-checked against the source data;
            uncertain findings go to a human reviewer. New fraud patterns ship
            as configuration, not code changes.
          </p>
        </div>
        <div>
          <h3 className="font-mono text-[12px] tracking-[0.18em] text-green-300">
            SECURITY INITIATIVES
          </h3>
          <p className="mt-2">
            Twice asked to join temporary company-wide security teams:
            categories of injection and access-control flaws across services,
            encrypted internal communication, test coverage from 30% to 80%.
          </p>
        </div>
        <div>
          <h3 className="font-mono text-[12px] tracking-[0.18em] text-green-300">
            AFTER HOURS · AI SYSTEMS
          </h3>
          <p className="mt-2">
            Nostos, a KV-cache-aware LLM router (radix-tree prefix affinity,{" "}
            <a
              className="text-green-300 underline"
              href="/blog/route-to-the-prefix"
            >
              write-up
            </a>
            ); ArinLM, a GPT built by hand with no model shortcuts; the same
            transformer in dependency-free C++ (
            <a
              className="text-green-300 underline"
              href="https://github.com/Arin016/gpt2-cpp"
              target="_blank"
            >
              gpt2-cpp
            </a>
            , tested); and again in raw CUDA (in progress).{" "}
            <a
              className="text-green-300 underline"
              href="/blog/gpt-from-scratch-thrice"
            >
              Why three times
            </a>
            .
          </p>
        </div>
      </div>

      <h2 className="mt-10 text-2xl font-bold text-white">
        How I got here without a CS degree
      </h2>
      <p className="mt-3 leading-relaxed text-zinc-400">
        My department&apos;s timetable left no room for Data Structures, OS,
        or Databases. So I trained in programming contests against students
        who had taken those courses, and stayed until my rankings matched
        theirs. Four years of evenings after naval architecture labs. Progress
        was slow and nonlinear.
      </p>
      <ul className="mt-4 space-y-2 font-mono text-sm">
        <li>
          <a
            className="text-green-300 underline"
            href={LINKS.leetcode}
            target="_blank"
          >
            LeetCode Guardian 2100+
          </a>{" "}
          <span className="text-zinc-600">
            — ranks 248, 617, 630, 880 / ~45K
          </span>
        </li>
        <li>
          <a
            className="text-green-300 underline"
            href={LINKS.codeforces}
            target="_blank"
          >
            Codeforces Expert 1602
          </a>{" "}
          <span className="text-zinc-600">— top 0.3% globally</span>
        </li>
        <li className="text-zinc-300">
          Meta Hacker Cup 2024 — Round 2{" "}
          <span className="text-zinc-600">(National 424, Global 1903)</span>
        </li>
      </ul>
      <p className="mt-4 leading-relaxed text-zinc-400">
        I learn the same way in ML: by rebuilding. A GPT by hand in PyTorch,
        then in dependency-free C++, then in raw GPU code; helmet detection with Faster R-CNN and
        YOLOv8; a Rubik&apos;s cube solver built on heuristic search with
        pattern databases.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-white">Beyond engineering</h2>
      <p className="mt-3 leading-relaxed text-zinc-400">
        <span className="text-white">Team Abhiyaan</span> (IITM autonomous
        vehicles). I led external relations, pitched directly to India&apos;s
        Commerce Minister, grew reach 125%. Athletics: football city runner-up,
        Villarreal CF Academy, district champion; chess district runner-up;
        cricket district all-rounder.
      </p>

      <h2 className="mt-10 text-2xl font-bold text-white">
        What I&apos;m working toward
      </h2>
      <p className="mt-3 leading-relaxed text-zinc-400">
        I can build systems that work under extreme constraints. I&apos;ve
        done it repeatedly at scale. But I&apos;ve done it by inferring
        principles from operating production systems under pressure. I know <em>that</em> my
        exactly-once pipeline is correct. I want the theory that explains{" "}
        <em>why</em> in the general case.
      </p>
      <p className="mt-4 leading-relaxed text-zinc-400">
        The current list (consensus, storage engines, verification, and
        serving intelligence cheaply) lives on the{" "}
        <a className="text-green-300 underline" href="/#questions">
          homepage
        </a>
        , next to the production experience behind each item.
      </p>

      <div className="mt-8 flex gap-3 font-mono text-sm">
        <a
          href={LINKS.github}
          target="_blank"
          className="rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-white hover:border-green-400/40 hover:bg-white/10"
        >
          github
        </a>
        <a
          href={LINKS.linkedin}
          target="_blank"
          className="rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-white hover:border-green-400/40 hover:bg-white/10"
        >
          linkedin
        </a>
        <a
          href={LINKS.email}
          className="rounded-md bg-green-400 px-4 py-2.5 font-bold text-black hover:bg-green-300"
        >
          email me
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          className="rounded-md border border-white/15 bg-white/5 px-4 py-2.5 text-white hover:border-green-400/40 hover:bg-white/10"
        >
          resume.pdf
        </a>
      </div>
    </div>
  );
}
