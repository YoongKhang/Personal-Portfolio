import { profile, navLinks, skillGroups } from '../data/content'

export default function Footer() {
  const skillList = [...new Set(skillGroups.flatMap((g) => g.items))]

  return (
    <footer className="relative mt-10 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/footer.jpg)` }}
      />
      <div aria-hidden className="absolute inset-0 bg-ink/70" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold text-white">{profile.name}</h3>
            <p className="mt-3 text-sm text-white/70">{profile.intro}</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/80">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/80">Skills</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {skillList.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/80">Contact Info</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <i className="bx bx-envelope mr-2" />
                {profile.email}
              </li>
              <li>
                <i className="bx bx-map mr-2" />
                {profile.location}
              </li>
              <li>
                <i className="bx bx-phone mr-2" />
                {profile.phone}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
