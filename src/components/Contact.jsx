import { useState } from 'react'
import { socials, profile } from '../data/content'
import AnimatedContent from './effects/AnimatedContent'
import Magnet from './effects/Magnet'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const [values, setValues] = useState({
    firstname: '',
    lastname: '',
    gender: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const [submitting, setSubmitting] = useState(false)

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (values.firstname.trim().length < 2) e.firstname = 'First name must be at least 2 characters'
    if (values.lastname.trim().length < 2) e.lastname = 'Last name must be at least 2 characters'
    if (!values.gender) e.gender = 'Please select a gender'
    if (!EMAIL_RE.test(values.email.trim())) e.email = 'Please enter a valid email address'
    if (values.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    if (submitting) return
    if (!validate()) {
      setStatus('error')
      return
    }
    setSubmitting(true)
    setStatus(null)
    // No backend on a static site — simulate an async send like the original form.
    setTimeout(() => {
      setSubmitting(false)
      setStatus('success')
      setValues({ firstname: '', lastname: '', gender: '', email: '', message: '' })
    }, 1200)
  }

  const inputCls = (name) =>
    `w-full rounded-xl border bg-white/5 px-4 py-3 text-white outline-none transition placeholder-white/30 focus:ring-2 focus:ring-violet-500/30 ${
      errors[name] ? 'border-red-400 focus:border-red-400' : 'border-white/15 focus:border-violet-400'
    }`

  return (
    <section id="contact" className="section-pad">
      <AnimatedContent>
        <h2 className="section-title mb-12 text-center">Contact Me</h2>
      </AnimatedContent>
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {/* Social column */}
        <AnimatedContent className="glass rounded-2xl p-7">
          <h3 className="mb-5 text-xl font-bold text-pop">Social Media</h3>
          <div className="flex flex-wrap gap-3">
            {socials.map((s) => (
              <Magnet key={s.name} strength={0.3}>
                <a
                  href={s.url}
                  target={s.url.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="flex h-12 w-12 items-center justify-center rounded-full text-white transition hover:scale-110"
                  style={{ backgroundColor: s.color }}
                >
                  <i className={`${s.iconClass} text-xl`} />
                </a>
              </Magnet>
            ))}
          </div>
          <div className="mt-6 space-y-2 text-sm text-white/60">
            <p>
              <i className="bx bx-envelope mr-2" />
              {profile.email}
            </p>
            <p>
              <i className="bx bx-map mr-2" />
              {profile.location}
            </p>
            <p>
              <i className="bx bx-phone mr-2" />
              {profile.phone}
            </p>
          </div>
        </AnimatedContent>

        {/* Form column */}
        <AnimatedContent delay={0.1} className="glass rounded-2xl p-7">
          {status === 'success' && (
            <div className="mb-4 rounded-xl border border-green-400/40 bg-green-400/10 px-4 py-3 text-sm text-green-300">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          {status === 'error' && (
            <div className="mb-4 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              Please correct the errors above before submitting.
            </div>
          )}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm text-white/70">First Name</label>
                <input
                  className={inputCls('firstname')}
                  value={values.firstname}
                  onChange={(e) => setField('firstname', e.target.value)}
                  placeholder="Your first name"
                />
                {errors.firstname && <p className="mt-1 text-xs text-red-400">{errors.firstname}</p>}
              </div>
              <div>
                <label className="mb-1 block text-sm text-white/70">Last Name</label>
                <input
                  className={inputCls('lastname')}
                  value={values.lastname}
                  onChange={(e) => setField('lastname', e.target.value)}
                  placeholder="Your last name"
                />
                {errors.lastname && <p className="mt-1 text-xs text-red-400">{errors.lastname}</p>}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm text-white/70">Gender</label>
              <div className="flex gap-3">
                {['Male', 'Female'].map((g) => (
                  <label
                    key={g}
                    className={`cursor-pointer rounded-full border px-5 py-2 text-sm transition ${
                      values.gender === g
                        ? 'border-violet-400 bg-violet-500/20 text-white'
                        : 'border-white/15 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={values.gender === g}
                      onChange={(e) => setField('gender', e.target.value)}
                      className="mr-2 accent-violet-500"
                    />
                    {g}
                  </label>
                ))}
              </div>
              {errors.gender && <p className="mt-1 text-xs text-red-400">{errors.gender}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm text-white/70">E-Mail</label>
              <input
                type="email"
                className={inputCls('email')}
                value={values.email}
                onChange={(e) => setField('email', e.target.value)}
                placeholder="name@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm text-white/70">Message</label>
              <textarea
                rows={4}
                className={inputCls('message')}
                value={values.message}
                onChange={(e) => setField('message', e.target.value)}
                placeholder="Write your message..."
              />
              {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="pill-btn w-full bg-violet-500 px-6 py-3 text-white shadow-lg shadow-violet-500/30 hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </AnimatedContent>
      </div>
    </section>
  )
}
