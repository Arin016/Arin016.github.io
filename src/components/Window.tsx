import { GithubIcon } from "@/components/Icons";

export default function Window({
  title = "guest@arin: ~",
  badge,
  children,
  className = "",
  glow = false,
  actions,
}: {
  title?: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  actions?: React.ReactNode;
}) {
  return (
    <div
      className={`win overflow-hidden ${className}`}
      style={glow ? { boxShadow: "0 0 90px -30px var(--c-win-shadow)" } : undefined}
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-zinc-700 transition group-hover/win:bg-zinc-600" />
        <span className="size-2.5 rounded-full bg-zinc-700 transition group-hover/win:bg-zinc-600" />
        <span className="size-2.5 rounded-full bg-zinc-700 transition group-hover/win:bg-zinc-600" />
        <span className="ml-3 truncate font-mono text-xs text-zinc-500">
          {title}
        </span>
        {actions}
        {badge && (
          <span className="ml-auto shrink-0 rounded border border-green-400/30 bg-green-400/10 px-2 py-0.5 font-mono text-[10px] text-green-200">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export function WindowLinkChrome({
  title,
  href,
  badge,
}: {
  title: string;
  href: string;
  badge?: string;
}) {
  return (
    <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.02] px-4 py-2.5">
      <span className="size-2.5 rounded-full bg-zinc-700" />
      <span className="size-2.5 rounded-full bg-zinc-700" />
      <span className="size-2.5 rounded-full bg-zinc-700" />
      <span className="ml-3 truncate font-mono text-xs text-zinc-500">
        {title}
      </span>
      <a
        href={href}
        target="_blank"
        className="ml-auto flex shrink-0 items-center gap-1 rounded p-1 text-zinc-600 transition hover:bg-white/5 hover:text-green-200"
        aria-label="open on GitHub"
      >
        <GithubIcon size={13} />
      </a>
      {badge && (
        <span className="shrink-0 rounded border border-green-400/30 bg-green-400/10 px-2 py-0.5 font-mono text-[10px] text-green-200">
          {badge}
        </span>
      )}
    </div>
  );
}
