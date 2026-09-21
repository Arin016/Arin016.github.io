import Reveal from "@/components/Reveal";

export default function PageHeader({
  cmd,
  title,
  lede,
  right,
  children,
}: {
  cmd: string;
  title: string;
  lede?: React.ReactNode;
  right?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="pt-14 sm:pt-20">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="font-mono text-[12px] text-green-300">
              <span className="text-zinc-500">$</span> {cmd}
            </div>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold tracking-[-0.02em] text-white sm:text-6xl sm:leading-[1.05]">
              {title}
            </h1>
            {lede && (
              <div className="mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
                {lede}
              </div>
            )}
          </div>
          {right}
        </div>
        {children}
      </Reveal>
    </header>
  );
}
