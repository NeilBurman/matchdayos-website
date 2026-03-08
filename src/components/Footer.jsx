import logoIcon from '../assets/logo-icon.png'

export default function Footer() {
  return (
    <footer className="bg-navy-dark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Logo */}
          <div>
            <a href="#" className="flex items-center gap-2">
              <img src={logoIcon} alt="MatchdayOS" className="w-8 h-8 brightness-0 invert opacity-90" />
              <span className="text-white/90 font-semibold text-[15px] tracking-tight">
                Matchday<span className="text-accent">OS</span>
              </span>
            </a>
            <p className="mt-3 text-[13px] text-gray-500 max-w-xs leading-relaxed">
              The operating system for grassroots football clubs. Reducing admin, automating operations.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-[13px]">
            <a href="#features" className="text-gray-500 hover:text-gray-300 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-500 hover:text-gray-300 transition-colors">Pricing</a>
            <a href="#early-access" className="text-gray-500 hover:text-gray-300 transition-colors">Early Access</a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-gray-600">
            &copy; {new Date().getFullYear()} MatchdayOS. All rights reserved.
          </p>
          <a href="mailto:hello@matchdayos.com" className="text-[12px] text-gray-600 hover:text-gray-400 transition-colors">
            hello@matchdayos.com
          </a>
        </div>
      </div>
    </footer>
  )
}
