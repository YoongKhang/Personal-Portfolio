import { skillGroups } from '../data/content'
import SpotlightCard from './effects/SpotlightCard'
import AnimatedContent from './effects/AnimatedContent'

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <AnimatedContent>
        <h2 className="section-title mb-12 text-center">Technical Skills</h2>
      </AnimatedContent>
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {skillGroups.map((g, i) => (
          <AnimatedContent key={g.title} delay={i * 0.08}>
            <SpotlightCard className="glass h-full rounded-2xl p-7" spotlightColor="rgba(34,211,238,0.22)">
              <h3 className="mb-4 border-b border-white/10 pb-3 text-lg font-bold text-white">{g.title}</h3>
              <ul className="space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    {it}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
