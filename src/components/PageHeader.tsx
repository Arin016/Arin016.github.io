export default function PageHeader({
  cmd,
  title,
  lede,
  children,
}: {
  cmd: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-10 border-b border-white/10 pb-8">
      <div className="font-mono text-[12px] text-green-300">
        <span className="text-zinc-600">$</span> {cmd}
      </div>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {title}
      </h1>
      {lede && (
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
          {lede}
        </p>
      )}
      {children}
    </header>
  );
}
