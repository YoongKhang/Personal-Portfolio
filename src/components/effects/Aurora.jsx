// React Bits-style Aurora background: slow-moving blurred color blobs.
export default function Aurora({ className = '' }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute -top-1/3 left-0 h-[60%] w-[60%] rounded-full bg-violet-600/30 blur-3xl"
        style={{ animation: 'aurora-shift 18s ease-in-out infinite' }}
      />
      <div
        className="absolute top-1/4 right-0 h-[55%] w-[55%] rounded-full bg-cyan-400/20 blur-3xl"
        style={{ animation: 'aurora-shift 22s ease-in-out infinite reverse' }}
      />
      <div
        className="absolute bottom-0 left-1/4 h-[50%] w-[50%] rounded-full bg-fuchsia-500/20 blur-3xl"
        style={{ animation: 'aurora-shift 26s ease-in-out infinite' }}
      />
    </div>
  )
}
