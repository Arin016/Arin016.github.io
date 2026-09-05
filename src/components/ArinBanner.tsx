export default function ArinBanner() {
  return (
    <div className="px-5 pt-5">
      <pre
        aria-hidden
        className="overflow-x-auto font-mono text-[10px] leading-[1.15] sm:text-[11px]"
        style={{
          color: "#4ade80",
          textShadow: "0 0 22px rgba(74,222,128,0.45)",
        }}
      >
{` █████╗ ██████╗ ██╗███╗   ██╗
██╔══██╗██╔══██╗██║████╗  ██║
███████║██████╔╝██║██╔██╗ ██║
██╔══██║██╔══██╗██║██║╚██╗██║
██║  ██║██║  ██║██║██║ ╚████║
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝`}
      </pre>
      <span className="sr-only">ARIN</span>
    </div>
  );
}
