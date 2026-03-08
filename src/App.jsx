import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import Features from './components/Features'
import Pricing from './components/Pricing'
import EarlyAccess from './components/EarlyAccess'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'

function usePath() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return path
}

export default function App() {
  const path = usePath()
  const isPrivacy = path === '/privacy'

  useEffect(() => {
    const meta = {
      title: isPrivacy
        ? 'Privacy Policy – MatchdayOS'
        : 'MatchdayOS – The Operating System for Grassroots Football Clubs',
      description: isPrivacy
        ? 'How MatchdayOS collects, stores and processes your data. UK GDPR compliant.'
        : 'Automate fixtures, simplify registrations and reduce admin for volunteer-run youth football clubs. MatchdayOS is the all-in-one platform for grassroots football operations.',
      url: isPrivacy ? 'https://matchdayos.com/privacy' : 'https://matchdayos.com',
    }

    document.title = meta.title

    const updates = {
      'meta[name="description"]': { attr: 'content', value: meta.description },
      'link[rel="canonical"]': { attr: 'href', value: meta.url },
      'meta[property="og:title"]': { attr: 'content', value: meta.title },
      'meta[property="og:description"]': { attr: 'content', value: meta.description },
      'meta[property="og:url"]': { attr: 'content', value: meta.url },
      'meta[name="twitter:title"]': { attr: 'content', value: meta.title },
      'meta[name="twitter:description"]': { attr: 'content', value: meta.description },
    }

    for (const [selector, { attr, value }] of Object.entries(updates)) {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }
  }, [isPrivacy])

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60 focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="bg-white text-gray-900">
        {isPrivacy ? (
          <PrivacyPolicy />
        ) : (
          <>
            <Hero />
            <Problem />
            <Solution />
            <Features />
            <Pricing />
            <EarlyAccess />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
