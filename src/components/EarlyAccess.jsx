import { useState } from 'react'

// ----------------------------------------------------------------
// ENDPOINT CONFIGURATION
// ----------------------------------------------------------------
// Replace this URL with your actual form endpoint:
//
// Formspree:    https://formspree.io/f/YOUR_FORM_ID
// Azure Func:   https://your-function-app.azurewebsites.net/api/early-access
// SendGrid:     https://api.sendgrid.com/v3/marketing/contacts (requires auth header)
//
// See README or bottom of this file for integration details.
// ----------------------------------------------------------------
const FORM_ENDPOINT = '/api/early-access'

const TEAM_OPTIONS = [
  { value: '', label: 'Select range' },
  { value: '1-5', label: '1 – 5 teams' },
  { value: '6-10', label: '6 – 10 teams' },
  { value: '11-20', label: '11 – 20 teams' },
  { value: '20+', label: '20+ teams' },
]

const initialForm = { name: '', clubName: '', email: '', teamCount: '', message: '' }

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required'
  if (!form.clubName.trim()) errors.clubName = 'Club name is required'
  if (!form.email.trim()) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!form.teamCount) errors.teamCount = 'Please select a range'
  return errors
}

export default function EarlyAccess() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const fieldErrors = validate(form)
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error(res.statusText)
      setStatus('success')
      setForm(initialForm)
    } catch {
      setStatus('error')
    }
  }

  const inputBase =
    'w-full bg-white/6 border text-white placeholder-gray-500 rounded-xl px-4 py-3 text-[14px] outline-none transition-colors focus:ring-2 focus:ring-accent/40'

  return (
    <section id="early-access" className="py-24 sm:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-navy rounded-3xl px-6 py-16 sm:px-16 sm:py-20">
          {/* Background orbs */}
          <div className="absolute top-0 right-0 w-100 h-100 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-75 h-75 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/6 border border-white/8 rounded-full px-4 py-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[12px] font-medium text-gray-300">Limited pilot places available</span>
              </div>
              <h2 className="text-3xl sm:text-[2.5rem] font-bold text-white leading-tight tracking-tight">
                Join the 2026/27 pilot programme
              </h2>
              <p className="mt-5 text-gray-400 text-base sm:text-lg leading-relaxed">
                We&rsquo;re running pilot deployments with a small number of grassroots football clubs.
                Register your interest and we&rsquo;ll be in touch.
              </p>
            </div>

            {/* Success state */}
            {status === 'success' ? (
              <div className="mt-12 text-center py-12 px-6 rounded-2xl bg-accent/10 border border-accent/20">
                <div className="w-14 h-14 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Thank you for your interest</h3>
                <p className="mt-2 text-gray-400 text-[15px]">
                  We&rsquo;ve received your details and will be in touch to discuss how MatchdayOS can help your club.
                </p>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} noValidate className="mt-12 space-y-5">
                {/* Name + Club name row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ea-name" className="block text-[13px] font-medium text-gray-300 mb-1.5">
                      Your name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="ea-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="e.g. Sarah Jones"
                      value={form.name}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.name ? 'border-red-400/60' : 'border-white/10 focus:border-accent/50'}`}
                    />
                    {errors.name && <p className="mt-1 text-[12px] text-red-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="ea-club" className="block text-[13px] font-medium text-gray-300 mb-1.5">
                      Club name <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="ea-club"
                      name="clubName"
                      type="text"
                      placeholder="e.g. Ringmer Rovers FC"
                      value={form.clubName}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.clubName ? 'border-red-400/60' : 'border-white/10 focus:border-accent/50'}`}
                    />
                    {errors.clubName && <p className="mt-1 text-[12px] text-red-400">{errors.clubName}</p>}
                  </div>
                </div>

                {/* Email + Teams row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="ea-email" className="block text-[13px] font-medium text-gray-300 mb-1.5">
                      Email address <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="ea-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@club.co.uk"
                      value={form.email}
                      onChange={handleChange}
                      className={`${inputBase} ${errors.email ? 'border-red-400/60' : 'border-white/10 focus:border-accent/50'}`}
                    />
                    {errors.email && <p className="mt-1 text-[12px] text-red-400">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="ea-teams" className="block text-[13px] font-medium text-gray-300 mb-1.5">
                      Number of teams <span className="text-red-400">*</span>
                    </label>
                    <select
                      id="ea-teams"
                      name="teamCount"
                      value={form.teamCount}
                      onChange={handleChange}
                      className={`${inputBase} ${!form.teamCount ? 'text-gray-500' : ''} ${errors.teamCount ? 'border-red-400/60' : 'border-white/10 focus:border-accent/50'}`}
                    >
                      {TEAM_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-navy text-white">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.teamCount && <p className="mt-1 text-[12px] text-red-400">{errors.teamCount}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="ea-message" className="block text-[13px] font-medium text-gray-300 mb-1.5">
                    Message <span className="text-gray-600">(optional)</span>
                  </label>
                  <textarea
                    id="ea-message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your club or any specific challenges you face..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputBase} border-white/10 focus:border-accent/50 resize-none`}
                  />
                </div>

                {/* Error banner */}
                {status === 'error' && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-400/20 text-red-300 text-[13px] rounded-xl px-4 py-3">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>
                    Something went wrong. Please try again or email{' '}
                    <a href="mailto:hello@matchdayos.com" className="underline">hello@matchdayos.com</a>.
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-3.5 rounded-xl text-[15px] transition-all btn-press shadow-[0_1px_2px_rgba(67,176,71,0.3),0_8px_24px_rgba(67,176,71,0.2)]"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Register Interest
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-[12px] text-gray-500">
                  No commitment required &middot; We&rsquo;ll be in touch to discuss your club&rsquo;s needs
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
