import { useRef, useState } from 'react'

// React Bits-style SpotlightCard: a cursor-following glow inside the card.
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(124, 58, 237, 0.28)',
}) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), ${spotlightColor}, transparent 42%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
