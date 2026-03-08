const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    label: 'Fixtures',
    title: 'Fixture Automation',
    description: 'Automatically monitor fixtures and notify relevant teams of changes. No more manually checking league websites every day.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
      </svg>
    ),
    label: 'Registration',
    title: 'Registration & Consent',
    description: 'Capture player registrations and consent digitally with structured data storage. Replace paper forms and spreadsheets permanently.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    label: 'Operations',
    title: 'Operational Clarity',
    description: 'Centralise key club information and reduce manual administration. Everyone has access to what they need — nothing more, nothing less.',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32 bg-navy overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-100 h-100 bg-accent/3 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent font-semibold text-[13px] uppercase tracking-widest">Features</p>
          <h2 className="mt-4 text-3xl sm:text-[2.5rem] font-bold text-white leading-tight tracking-tight">
            Built for how clubs actually work
          </h2>
          <p className="mt-4 text-gray-400 text-lg leading-relaxed">
            Purpose-built tools that address the real challenges of running a grassroots football club.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative bg-white/4 backdrop-blur-sm border border-white/6 rounded-2xl p-7 sm:p-8 hover:bg-white/[0.07] hover:border-white/12 transition-all card-hover"
            >
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-6 right-6 h-px bg-linear-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="w-11 h-11 bg-accent/10 text-accent rounded-xl flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                {feature.icon}
              </div>
              <div className="mt-1 mb-4">
                <span className="inline-block text-[11px] font-medium uppercase tracking-widest text-accent/60">
                  {feature.label}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-2.5 text-[14px] text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
