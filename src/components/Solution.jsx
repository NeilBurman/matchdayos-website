const solutions = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.651a3.75 3.75 0 010-5.303m5.304 0a3.75 3.75 0 010 5.303m-7.425 2.122a6.75 6.75 0 010-9.546m9.546 0a6.75 6.75 0 010 9.546M5.106 18.894c-3.808-3.808-3.808-9.98 0-13.788m13.788 0c3.808 3.808 3.808 9.98 0 13.788M12 12h.008v.008H12V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    title: 'Automated Fixture Monitoring',
    description: 'Continuously monitors fixture schedules and detects changes automatically — no more manual checking.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0018 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
    title: 'Structured Notifications',
    description: 'The right people get the right information at the right time. Replace noisy group chats with clarity.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
      </svg>
    ),
    title: 'Digital Player Registration',
    description: 'Parents register through a simple digital form. Data captured cleanly, stored securely, accessible instantly.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: 'Compliance-Friendly Data',
    description: 'Consent records, medical information and emergency contacts stored with proper access controls and audit trails.',
  },
]

export default function Solution() {
  return (
    <section className="relative py-24 sm:py-32 bg-white">
      <div className="absolute inset-0 glow-navy" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent font-semibold text-[13px] uppercase tracking-widest">The Solution</p>
          <h2 className="mt-4 text-3xl sm:text-[2.5rem] font-bold text-navy leading-tight tracking-tight">
            One platform to run your club
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Replace scattered tools and manual processes with a single, purpose-built system.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 gap-4 sm:gap-5">
          {solutions.map((item) => (
            <div
              key={item.title}
              className="group relative bg-surface rounded-xl p-6 sm:p-7 border border-border border-glow card-hover"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-9 h-9 bg-accent/10 text-accent rounded-lg flex items-center justify-center group-hover:bg-accent/15 transition-colors">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-navy">{item.title}</h3>
                  <p className="mt-1.5 text-[14px] text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
