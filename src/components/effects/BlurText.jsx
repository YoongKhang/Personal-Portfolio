import { useEffect, useState } from 'react'

// React Bits-style word-by-word blur reveal.
export default function BlurText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0.05,
  duration = 0.8,
  ...props
}) {
  const words = String(text).split(' ')
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(t)
  }, [])

  return (
    <Tag className={className} {...props}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            filter: shown ? 'blur(0px)' : 'blur(10px)',
            opacity: shown ? 1 : 0,
            transform: shown ? 'translateY(0)' : 'translateY(12px)',
            transition: `filter ${duration}s ease, opacity ${duration}s ease, transform ${duration}s ease`,
            transitionDelay: `${i * delay}s`,
            marginRight: '0.28em',
          }}
        >
          {w}
        </span>
      ))}
    </Tag>
  )
}
