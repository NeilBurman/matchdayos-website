import { useState, useEffect } from 'react'
import logoIcon from '../assets/logo-icon.png'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Early Access', href: '#early-access' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_3px_rgba(15,39,68,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <img src={logoIcon} alt="MatchdayOS" className="w-9 h-9 group-hover:scale-105 transition-transform" />
            <span className="text-navy font-semibold text-[17px] tracking-tight">
              Matchday<span className="text-accent">OS</span>
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-gray-500 hover:text-navy px-3.5 py-2 rounded-lg hover:bg-gray-50 transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="ml-3 pl-3 border-l border-border">
              <a
                href="#early-access"
                className="bg-navy hover:bg-navy-light text-white text-[13px] font-medium px-4 py-2 rounded-lg transition-all btn-press inline-flex items-center gap-1.5"
              >
                Request Early Access
                <svg className="w-3.5 h-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 -mr-2 text-gray-500 hover:text-navy rounded-lg hover:bg-gray-50 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-5 pt-2 space-y-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 px-3 text-[15px] font-medium text-gray-600 hover:text-navy hover:bg-gray-50 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#early-access"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-navy hover:bg-navy-light text-white text-[15px] font-medium px-5 py-3 rounded-lg transition-all"
              >
                Request Early Access
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
