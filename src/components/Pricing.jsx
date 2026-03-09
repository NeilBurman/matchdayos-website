import { CheckIcon } from './Icons'

const tiers = [
  {
    name: 'Small Club',
    price: '45',
    description: 'For clubs with a small number of teams getting started with automation.',
    features: ['Fixture monitoring', 'Team notifications', 'Digital registration', 'Email support'],
  },
  {
    name: 'Medium Club',
    price: '60',
    description: 'For growing clubs that need more capacity and operational structure.',
    features: ['Everything in Small', 'More team capacity', 'Priority notifications', 'Priority support'],
    popular: true,
  },
  {
    name: 'Large Club',
    price: '75',
    description: 'For established clubs with many teams and complex operational needs.',
    features: ['Everything in Medium', 'Full team capacity', 'Advanced reporting', 'Dedicated support'],
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-surface">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-accent font-semibold text-[13px] uppercase tracking-widest">Pricing</p>
          <h2 className="mt-4 text-3xl sm:text-[2.5rem] font-bold text-navy leading-tight tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Pricing based on team count. No hidden fees. No long-term contracts.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-7 sm:p-8 transition-all card-hover ${
                tier.popular
                  ? 'bg-white border-2 border-accent/30 shadow-[0_4px_20px_rgba(67,176,71,0.08)]'
                  : 'bg-white border border-border'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="text-[15px] font-semibold text-navy">{tier.name}</h3>
              <p className="mt-1.5 text-[13px] text-gray-400 leading-relaxed">{tier.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-[2.5rem] font-extrabold text-navy tracking-tight">£{tier.price}</span>
                <span className="text-[13px] text-gray-400 font-medium">/month</span>
              </div>

              <div className="mt-6 pt-6 border-t border-border-subtle">
                <ul className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-[13px] text-gray-600">
                      <CheckIcon />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="/#early-access"
                className={`mt-8 block text-center text-[13px] font-semibold py-3 rounded-xl transition-all btn-press ${
                  tier.popular
                    ? 'bg-accent hover:bg-accent-dark text-white shadow-[0_1px_2px_rgba(67,176,71,0.3)]'
                    : 'border border-border hover:border-gray-300 hover:bg-gray-50 text-navy'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] text-gray-400">
          All plans include a 14-day free trial. No credit card required. All prices exclude VAT.
        </p>
      </div>
    </section>
  )
}
