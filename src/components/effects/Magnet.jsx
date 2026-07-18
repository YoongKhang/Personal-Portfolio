import { useRef } from 'react'

// React Bits-style Magnet: element drifts toward the cursor while hovered.
export default function Magnet({ children, className = '', strength = 0.4 }) {
  const ref = useRef(null)

  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  const reset = () => {
    const el = ref.current
    if (el) el.style.transform = 'translate(0px, 0px)'
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-flex transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  )
}
