import BrowserFrame from './BrowserFrame';

/**
 * A single project card: a compact browser-window mockup sits in the
 * top-right of a violet-tinted stage; the project name and a short
 * description anchor the bottom-left. The card is a real <button>, so
 * Enter/Space open the modal natively.
 */
export default function ProjectCard({ project, index, onOpen }) {
  return (
    <button
      type="button"
      data-card
      data-cursor="view"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group relative w-full max-w-[540px] shrink-0 text-left lg:w-[40vw] lg:max-w-[600px]"
    >
      {/* Accent glow on hover */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-[26px] bg-accent/25 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
        aria-hidden="true"
      />

      {/* Stage */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10 bg-ink-800 transition-colors duration-500 group-hover:border-accent/40">
        <div
          className="absolute inset-0 bg-[radial-gradient(120%_100%_at_85%_-10%,rgba(124,92,255,0.3),transparent_58%),radial-gradient(90%_80%_at_8%_110%,rgba(56,189,248,0.1),transparent_60%)]"
          aria-hidden="true"
        />

        {/* Index + live badge, top-left */}
        <div className="absolute left-6 top-5 flex items-center gap-2.5">
          <span
            className="font-display text-sm font-medium tracking-widest text-white/30"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          {project.liveUrl && (
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-ink/50 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] text-accent-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
              Live
            </span>
          )}
        </div>

        {/* Compact framed screenshot, top-right */}
        <BrowserFrame
          url={project.liveUrl}
          className="absolute right-5 top-5 h-[40%] w-[48%] transition-transform duration-[800ms] ease-out-expo group-hover:-translate-y-2 group-hover:scale-[1.02]"
        >
          <img
            src={project.thumbnail}
            alt={`${project.title} — ${project.category}`}
            loading="lazy"
            width="1200"
            height="900"
            className="h-full w-full object-cover object-top"
          />
        </BrowserFrame>

        {/* Name + short description, bottom-left */}
        <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-medium text-white transition-colors duration-300 group-hover:text-accent-soft md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-400">
              {project.shortDesc}
            </p>
          </div>
          <span
            className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-500 group-hover:border-accent group-hover:bg-accent"
            aria-hidden="true"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M7 17 17 7m0 0H8m9 0v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}
