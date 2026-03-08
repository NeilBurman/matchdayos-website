export default function PrivacyPolicy() {
  return (
    <section className="pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-navy transition-colors mb-8"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to home
        </a>

        <h1 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight">Privacy Policy</h1>
        <p className="mt-3 text-gray-500 text-sm">Last updated: 8 March 2026</p>

        <div className="mt-10 space-y-8 text-[15px] text-gray-600 leading-relaxed">
          <div>
            <h2 className="text-lg font-semibold text-navy mb-2">1. Who we are</h2>
            <p>
              MatchdayOS (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) provides software for grassroots football
              club administration. Our contact email is{' '}
              <a href="mailto:hello@matchdayos.com" className="text-accent hover:underline">hello@matchdayos.com</a>.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-2">2. What data we collect</h2>
            <p>When you submit the early access registration form, we collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Your name</li>
              <li>Club name</li>
              <li>Email address</li>
              <li>Number of teams at your club</li>
              <li>Any message you choose to include (optional)</li>
            </ul>
            <p className="mt-2">
              We do not use cookies, analytics trackers, or any third-party tracking scripts on this website.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-2">3. Why we collect it</h2>
            <p>We process your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>To contact you about the MatchdayOS early access pilot programme</li>
              <li>To understand the size and needs of clubs interested in MatchdayOS</li>
            </ul>
            <p className="mt-2">
              Our lawful basis for processing this data under UK GDPR is <strong>consent</strong> (Article 6(1)(a)),
              which you provide by ticking the checkbox on the registration form.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-2">4. How we store it</h2>
            <p>
              Your data is stored securely in Microsoft Azure Table Storage, hosted in the UK.
              Access is restricted to authorised MatchdayOS team members only. Data is transmitted
              over HTTPS and encrypted at rest.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-2">5. Who we share it with</h2>
            <p>
              We do not sell, rent, or share your personal data with third parties.
              We use Microsoft Azure infrastructure to store data and send email notifications.
              Microsoft acts as a data processor on our behalf under their standard data processing agreements.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-2">6. How long we keep it</h2>
            <p>
              We retain your early access registration data for up to 24 months from the date of submission,
              or until you request its deletion, whichever comes first.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-2">7. Your rights</h2>
            <p>Under UK GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw your consent at any time</li>
              <li>Lodge a complaint with the Information Commissioner&rsquo;s Office (ICO)</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, email us at{' '}
              <a href="mailto:hello@matchdayos.com" className="text-accent hover:underline">hello@matchdayos.com</a>.
              We will respond within 30 days.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-navy mb-2">8. Changes to this policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be posted on this page
              with an updated &ldquo;Last updated&rdquo; date.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
