import { useState } from 'react'

const faqs = [
  {
    question: 'What happens after I register my interest?',
    answer:
      'We\u2019ll get in touch within a few working days to learn more about your club and discuss how MatchdayOS can help. There\u2019s no commitment \u2014 it\u2019s a conversation to see if we\u2019re a good fit.',
  },
  {
    question: 'Do coaches and parents need technical skills?',
    answer:
      'Not at all. MatchdayOS is designed for volunteers, not IT professionals. Parents register through a simple online form, and coaches receive notifications automatically. If you can use email, you can use MatchdayOS.',
  },
  {
    question: 'How is player data kept safe?',
    answer:
      'All data is stored securely on Microsoft Azure with encryption at rest and in transit. Access is controlled so only authorised people can see sensitive information like medical details and emergency contacts. We\u2019re fully compliant with UK GDPR.',
  },
  {
    question: 'What does a "team" mean for pricing?',
    answer:
      'A team is one age group or squad \u2014 for example, your U10s, U12s or U16s. If your club runs 8 age groups, that\u2019s 8 teams. Mixed and girls\u2019 teams each count as one team.',
  },
  {
    question: 'Can I cancel at any time?',
    answer:
      'Yes. There are no long-term contracts. You can cancel your subscription at the end of any monthly billing period. We also offer a 14-day free trial so you can try MatchdayOS before paying anything.',
  },
  {
    question: 'What support do I get?',
    answer:
      'All plans include email support. Medium and Large plans include priority support with faster response times. During the pilot programme, every club gets direct access to the founding team for hands-on help with setup and onboarding.',
  },
]

function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-[15px] font-semibold text-navy group-hover:text-accent transition-colors">
          {faq.question}
        </span>
        <svg
          className={`w-5 h-5 shrink-0 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="pb-5 -mt-1">
          <p className="text-[14px] text-gray-500 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-accent font-semibold text-[13px] uppercase tracking-widest">FAQ</p>
          <h2 className="mt-4 text-3xl sm:text-[2.5rem] font-bold text-navy leading-tight tracking-tight">
            Common questions
          </h2>
          <p className="mt-4 text-gray-500 text-lg leading-relaxed">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="mt-14">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} faq={faq} />
          ))}
        </div>

        <p className="mt-10 text-center text-[14px] text-gray-500">
          Still have questions?{' '}
          <a href="mailto:hello@matchdayos.com" className="text-accent hover:underline font-medium">
            Get in touch
          </a>
        </p>
      </div>
    </section>
  )
}
