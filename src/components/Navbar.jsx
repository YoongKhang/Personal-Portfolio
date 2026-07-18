import { useEffect, useState } from 'react'
import { profile, navLinks } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-4 left-1/2 z-50 w-[92%] max-w-[900px] -translate-x-1/2 rounded-full transition-all duration-300 ${
        scrolled ? 'glass-strong shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-5 py-3">
        <a href="#top" className="text-base font-extrabold tracking-tight sm:text-lg">
          <span className="accent-text">{profile.name}</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm font-semibold md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-white/80 transition hover:text-white after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-violet-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="text-2xl text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <i className={`bx ${open ? 'bx-x' : 'bx-menu'}`} />
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 px-6 pb-4 text-sm font-semibold md:hidden">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-white/80 transition hover:bg-white/10"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
