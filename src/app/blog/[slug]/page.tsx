import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ReadingProgress from "@/components/ReadingProgress";
import MemorySim from "@/components/blog/MemorySim";
import BitsetLab from "@/components/blog/BitsetLab";
import SavingsCalc from "@/components/blog/SavingsCalc";
import RouterSim from "@/components/blog/RouterSim";
import RiskTabs from "@/components/blog/RiskTabs";
import ParamCalc from "@/components/blog/ParamCalc";
import StateMachine from "@/components/blog/StateMachine";
import { getAllPosts, getPost } from "@/lib/blog";

const WIDGETS: Record<string, () => React.JSX.Element> = {
  memorysim: MemorySim,
  bitsetlab: BitsetLab,
  savingscalc: SavingsCalc,
  routersim: RouterSim,
  risktabs: RiskTabs,
  paramcalc: ParamCalc,
  statemachine: StateMachine,
};

function CodeBlock({ className, children, ...rest }: any) {
  const m = /language-widget-(\w+)/.exec(className || "");
  if (m && WIDGETS[m[1]]) {
    const C = WIDGETS[m[1]];
    return <C />;
  }
  return (
    <code className={className} {...rest}>
      {children}
    </code>
  );
}

function Pre({ node, children }: any) {
  const code = node?.children?.[0];
  const cls: string[] = code?.properties?.className ?? [];
  if (cls.some((c) => String(c).startsWith("language-widget-"))) {
    return <>{children}</>;
  }
  return <pre>{children}</pre>;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const { meta } = getPost(slug);
    return { title: `${meta.title} — Arin Mallanna Tumbagi` };
  } catch {
    return {};
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta, content } = getPost(slug);
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <ReadingProgress />
      <Link
        href="/blog"
        className="font-mono text-xs text-zinc-500 hover:text-green-300"
      >
        ← all posts
      </Link>
      <div className="mt-4 flex items-center gap-2 font-mono text-[11px]">
        <span className="rounded bg-green-400/10 px-2 py-1 text-green-200">
          {meta.tag}
        </span>
        <span className="text-zinc-600">
          {meta.date} · {meta.minutes} min
        </span>
      </div>
      <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
        {meta.title}
      </h1>
      <p className="mt-3 text-zinc-400">{meta.excerpt}</p>
      <div className="md-body mt-6">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{ code: CodeBlock, pre: Pre }}
        >
          {content}
        </ReactMarkdown>
      </div>
      <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.02] p-5 font-mono text-xs text-zinc-500">
        <span className="text-green-300">$</span> questions / corrections →{" "}
        <a
          className="text-zinc-200 underline"
          href="mailto:arin16tumbagi@gmail.com"
        >
          arin16tumbagi@gmail.com
        </a>
      </div>
    </div>
  );
}
