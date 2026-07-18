import { projects } from '../data/content'
import TiltedCard from './effects/TiltedCard'
import AnimatedContent from './effects/AnimatedContent'
import Magnet from './effects/Magnet'

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <AnimatedContent>
        <h2 className="section-title mb-12 text-center">Projects Showcases</h2>
      </AnimatedContent>
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <AnimatedContent key={p.title} delay={i * 0.08}>
            <TiltedCard className="glass h-full rounded-2xl p-5">
              <div className="overflow-hidden rounded-xl bg-white/5">
                <img src={import.meta.env.BASE_URL + p.image} alt={p.title} className="h-52 w-full object-cover" loading="lazy" />
              </div>
              <h3 className="mt-4 text-lg font-bold text-pop">{p.title}</h3>
              <p className="mt-2 min-h-[3rem] text-sm text-white/60">{p.description}</p>
              <div className="mt-4 flex gap-3">
                <Magnet>
                  <a
                    href={p.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="pill-btn border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10"
                  >
                    View Project
                  </a>
                </Magnet>
                <Magnet>
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="pill-btn bg-violet-500 px-4 py-2 text-sm text-white hover:bg-violet-400"
                  >
                    View Demo
                  </a>
                </Magnet>
              </div>
            </TiltedCard>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
