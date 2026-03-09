import { useState } from 'react'
import heroImage from '../assets/hero-image.webp'
import { ArrowRightIcon } from './Icons'

export default function Hero() {
  const [imgError, setImgError] = useState(false)
  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 glow-accent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text column */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/8 border border-accent/15 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[13px] font-medium text-navy/70">
                Now accepting clubs for the 2026/27 pilot
              </span>
            </div>

            <h1 className="text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] font-extrabold text-navy leading-[1.1] tracking-tight">
              The operating system for{' '}
              <span className="text-gradient">grassroots football</span>{' '}
              clubs
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Automate fixtures, simplify registrations and reduce admin — so volunteers can focus on what matters.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <a
                href="#early-access"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold px-7 py-3.5 rounded-xl text-[15px] transition-all btn-press shadow-[0_1px_2px_rgba(67,176,71,0.3),0_4px_12px_rgba(67,176,71,0.15)] hover:shadow-[0_1px_2px_rgba(67,176,71,0.4),0_8px_24px_rgba(67,176,71,0.2)]"
              >
                Join the Early Access Pilot
                <ArrowRightIcon />
              </a>
              <a
                href="#features"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border hover:border-gray-300 text-navy font-medium px-7 py-3.5 rounded-xl text-[15px] transition-all hover:bg-gray-50 btn-press"
              >
                See how it works
              </a>
            </div>
          </div>

          {/* Hero image column */}
          <div className="relative">
            {/* Glow behind image */}
            <div className="absolute -inset-4 bg-accent/6 rounded-3xl blur-2xl" />
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-[0_4px_16px_rgba(15,39,68,0.06),0_24px_64px_rgba(15,39,68,0.08)]">
              {imgError ? (
                <div className="w-full aspect-3/2 bg-navy/5 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Image unavailable</span>
                </div>
              ) : (
                <img
                  src={heroImage}
                  alt="Volunteer football coach using MatchdayOS on a tablet at a youth training session"
                  className="w-full h-auto object-cover"
                  width={900}
                  height={600}
                  loading="eager"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  onError={() => setImgError(true)}
                />
              )}
              {/* Subtle green gradient overlay at bottom */}
              <div className="absolute inset-0 bg-linear-to-t from-navy/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
