const problems = [
  {
    number: '01',
    title: 'Fixture Monitoring',
    description: 'Constantly checking league websites for fixture changes, cancellations and rescheduled matches. Hours lost every week.',
  },
  {
    number: '02',
    title: 'WhatsApp Chaos',
    description: 'Critical information buried in group chats. No structure, no accountability, no way to find what you need.',
  },
  {
    number: '03',
    title: 'Manual Registrations',
    description: 'Paper forms, scattered spreadsheets and missing consent records that create compliance risk every season.',
  },
  {
    number: '04',
    title: 'Volunteer Burnout',
    description: 'A handful of volunteers carry the entire administrative burden — leading to burnout and people walking away.',
  },
]

export default function Problem() {
  return (
    <section className="relative py-24 sm:py-32 bg-surface">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl">
          <p className="text-accent font-semibold text-[13px] uppercase tracking-widest">The Problem</p>
          <h2 className="mt-4 text-3xl sm:text-[2.5rem] font-bold text-navy leading-tight tracking-tight">
            Running a youth football club shouldn&rsquo;t feel like a second job
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Volunteer administrators spend hours every week on repetitive tasks that should be automated.
          </p>
        </div>

        {/* Problem cards — numbered list style */}
        <div className="mt-14 grid sm:grid-cols-2 gap-4 sm:gap-5">
          {problems.map((item) => (
            <div
              key={item.number}
              className="group relative bg-white rounded-xl p-6 sm:p-7 border border-border hover:border-red-200 transition-all card-hover"
            >
              <div className="flex items-start gap-4">
                <span className="shrink-0 text-[13px] font-mono font-semibold text-red-400/70 bg-red-50 w-8 h-8 rounded-lg flex items-center justify-center">
                  {item.number}
                </span>
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
