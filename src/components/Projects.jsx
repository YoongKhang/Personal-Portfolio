import { projects } from '../data/content'
import CardSwap, { Card } from './effects/CardSwap'
import AnimatedContent from './effects/AnimatedContent'
import Magnet from './effects/Magnet'

function ProjectCard({ project }) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="h-44 w-full overflow-hidden bg-white/5">
        <img
          src={import.meta.env.BASE_URL + project.image}
          alt={project.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-pop">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm text-white/65">{project.description}</p>
        <div className="mt-4 flex gap-3">
          <Magnet>
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="pill-btn border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10"
            >
              View Project
            </a>
          </Magnet>
          <Magnet>
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="pill-btn bg-violet-500 px-4 py-2 text-sm text-white hover:bg-violet-400"
            >
              View Demo
            </a>
          </Magnet>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <AnimatedContent>
        <h2 className="section-title mb-3 text-center">Projects Showcases</h2>
        <p className="mb-8 text-center text-white/50">
          Hover a card to make it jump, and click it to flip to the next project.
        </p>
      </AnimatedContent>

      <AnimatedContent className="flex justify-center" delay={0.1}>
        <div className="relative mx-auto mt-16 flex h-[660px] w-full items-center justify-center">
          <CardSwap
            width="min(440px, 86vw)"
            height={400}
            cardDistance={48}
            verticalDistance={45}
            delay={5000}
            auto={false}
            easing="elastic"
          >
            {projects.map((p) => (
              <Card key={p.title}>
                <ProjectCard project={p} />
              </Card>
            ))}
            <Card>
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-8 text-center">
                <h3 className="text-2xl font-extrabold accent-text">More on the way</h3>
                <p className="text-sm text-white/65">
                  New projects are in the works. Follow my work or get in touch.
                </p>
                <Magnet>
                  <a
                    href="#contact"
                    className="pill-btn bg-violet-500 px-5 py-3 text-white hover:bg-violet-400"
                  >
                    Contact Me
                  </a>
                </Magnet>
              </div>
            </Card>
          </CardSwap>
        </div>
      </AnimatedContent>
    </section>
  )
}
