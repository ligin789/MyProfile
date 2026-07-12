/**
 * Minimal phone mockup for mobile-app project screenshots. A rounded dark
 * bezel around a portrait (9:19.5) screen. No overlaid notch — real captures
 * already include their own status bar. Size it with height/width utilities on
 * `className`; the aspect ratio fills in the other dimension.
 */
export default function PhoneFrame({ className = '', children }) {
  return (
    <div
      className={`overflow-hidden rounded-[2.2rem] border-[6px] border-ink-600 bg-ink-600 shadow-2xl shadow-black/60 ${className}`}
      style={{ aspectRatio: '9 / 19.5' }}
    >
      <div className="h-full w-full overflow-hidden rounded-[1.7rem] bg-black">
        {children}
      </div>
    </div>
  );
}
