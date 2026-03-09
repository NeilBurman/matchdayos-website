import { useState, useEffect, lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import Features from './components/Features'
import Pricing from './components/Pricing'
import EarlyAccess from './components/EarlyAccess'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'))

function usePath() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return path
}

function NotFound() {
  return (
    <section className="pt-28 pb-16 sm:pt-36 sm:pb-24 text-center">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-6xl font-extrabold text-navy">404</h1>
        <p className="mt-4 text-lg text-gray-500">Page not found</p>
        <a
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-navy hover:bg-navy-light text-white font-semibold px-6 py-3 rounded-xl text-[15px] transition-all btn-press"
        >
          Back to home
        </a>
      </div>
    </section>
  )
}

function matchRoute(path) {
  const normalised = path.replace(/\/+$/, '').toLowerCase() || '/'
  if (normalised === '/') return 'home'
  if (normalised === '/privacy') return 'privacy'
  return 'notFound'
}

export default function App() {
  const path = usePath()
  const route = matchRoute(path)

  useEffect(() => {
    const pageMeta = {
      home: {
        title: 'MatchdayOS – The Operating System for Grassroots Football Clubs',
        description: 'Automate fixtures, simplify registrations and reduce admin for volunteer-run youth football clubs. MatchdayOS is the all-in-one platform for grassroots football operations.',
        url: 'https://matchdayos.com',
      },
      privacy: {
        title: 'Privacy Policy – MatchdayOS',
        description: 'How MatchdayOS collects, stores and processes your data. UK GDPR compliant.',
        url: 'https://matchdayos.com/privacy',
      },
      notFound: {
        title: 'Page Not Found – MatchdayOS',
        description: 'The page you were looking for does not exist.',
        url: 'https://matchdayos.com',
      },
    }

    const meta = pageMeta[route] || pageMeta.notFound

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

    const robotsMeta = document.querySelector('meta[name="robots"]')
    if (robotsMeta) {
      robotsMeta.setAttribute('content', route === 'notFound' ? 'noindex' : 'index, follow')
    }
  }, [route])

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-60 focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium">
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className="bg-white text-gray-900">
        {route === 'privacy' ? (
          <Suspense fallback={<div className="pt-28 pb-16 text-center text-gray-400">Loading...</div>}>
            <PrivacyPolicy />
          </Suspense>
        ) : route === 'notFound' ? (
          <NotFound />
        ) : (
          <>
            <Hero />
            <Problem />
            <Solution />
            <Features />
            <Pricing />
            <FAQ />
            <EarlyAccess />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
