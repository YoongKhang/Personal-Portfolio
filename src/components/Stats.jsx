import { stats } from '../data/content'
import { useAge } from '../hooks/useAge'
import AnimatedContent from './effects/AnimatedContent'

const pad = (n) => String(n).padStart(2, '0')

function AgeDisplay({ age }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-base font-semibold text-cyan-300">
        {age.years} yrs {age.months} mo {age.days} d
      </span>
      <span className="font-mono text-sm tabular-nums text-white/70">
        {pad(age.hours)}:{pad(age.minutes)}:{pad(age.seconds)}
      </span>
    </div>
  )
}

export default function Stats() {
  const age = useAge()
  return (
    <section className="section-pad">
      <AnimatedContent>
        <h2 className="section-title mb-3 text-center">More On Myself</h2>
        <p className="mb-12 text-center text-white/50">A few quick facts about me.</p>
      </AnimatedContent>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <AnimatedContent key={s.label}>
            <div className="glass h-full rounded-2xl p-6 text-center">
              <div className="text-xs uppercase tracking-widest text-white/50">{s.label}</div>
              <div className="mt-3 text-xl font-bold text-white">
                {s.value === 'live' ? <AgeDisplay age={age} /> : s.value}
              </div>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
