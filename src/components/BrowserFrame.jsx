/**
 * Minimal browser-window chrome around a screenshot — traffic lights and a
 * URL pill. Makes raw site captures sit naturally on dark surfaces.
 */
export default function BrowserFrame({ url = '', className = '', children }) {
  let host = '';
  try {
    host = url ? new URL(url).hostname.replace(/^www\./, '') : '';
  } catch {
    host = '';
  }

  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-700 shadow-2xl shadow-black/50 ${className}`}
    >
      <div className="flex shrink-0 items-center gap-1.5 border-b border-white/5 bg-ink-600/70 px-3.5 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" aria-hidden="true" />
        {host && (
          <span className="ml-3 truncate rounded-full bg-ink/70 px-3 py-0.5 text-[10px] tracking-wide text-zinc-500">
            {host}
          </span>
        )}
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
