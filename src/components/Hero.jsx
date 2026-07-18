import { profile } from '../data/content'
import BlurText from './effects/BlurText'
import Aurora from './effects/Aurora'
import AnimatedContent from './effects/AnimatedContent'

export default function Hero() {
  return (
    <section id="about" className="relative flex min-h-screen items-center section-pad pt-32">
      <Aurora />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2">
        <AnimatedContent className="order-2 md:order-1">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
            {profile.subtitle}
          </p>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            <BlurText text="Welcome to my" className="block" />
            <BlurText text="website." className="block accent-text" delay={0.08} />
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/70 sm:text-lg">{profile.intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="pill-btn bg-violet-500 px-6 py-3 text-white shadow-lg shadow-violet-500/30 hover:bg-violet-400"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="pill-btn border border-white/20 px-6 py-3 text-white hover:bg-white/10"
            >
              Get in Touch
            </a>
          </div>
        </AnimatedContent>

        <AnimatedContent className="order-1 flex justify-center md:order-2" delay={0.1}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-violet-500/40 to-cyan-400/30 blur-2xl" />
            <div
              className="relative overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl"
              style={{ animation: 'float-soft 6s ease-in-out infinite' }}
            >
              <img
                src={profile.photo}
                alt={profile.name}
                className="h-80 w-80 object-cover sm:h-96 sm:w-96"
              />
            </div>
          </div>
        </AnimatedContent>
      </div>
    </section>
  )
}
