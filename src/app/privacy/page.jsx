import React from 'react'

export const metadata = {
  title: 'Privacy Policy | VL Nexis',
  description: 'Learn how VL Nexis collects, uses and protects your information.',
}

const lastUpdated = '26 October 2026'

const sections = [
  {
    title: '1. Information We Collect',
    body: [
      'We collect basic details you share with us when you place an order, create an account or contact us, such as your name, email address, phone number and delivery address.',
      'We also collect limited technical data like your device type, browser and pages visited to help us improve the website.',
    ],
  },
  {
    title: '2. How We Use Your Information',
    list: [
      'To process and deliver your orders',
      'To send order updates and support replies',
      'To improve our products, website and services',
      'To share offers and news, only if you have opted in',
    ],
  },
  {
    title: '3. Sharing of Information',
    body: [
      'VL Nexis does not sell your personal data. We only share it with trusted partners such as payment gateways and delivery services, strictly to complete your order.',
    ],
  },
  {
    title: '4. Cookies',
    body: [
      'We use cookies to remember your preferences and keep your cart saved. You can disable cookies in your browser settings, though some features may not work properly.',
    ],
  },
  {
    title: '5. Data Security',
    body: [
      'We use industry-standard safeguards to protect your information. However, no online method is 100% secure, so we cannot guarantee absolute security.',
    ],
  },
  {
    title: '6. Your Rights',
    list: [
      'Request a copy of the data we hold about you',
      'Ask us to correct or delete your data',
      'Unsubscribe from marketing messages at any time',
    ],
  },
  {
    title: '7. Changes to This Policy',
    body: [
      'We may update this policy from time to time. Any changes will be posted on this page with a new "last updated" date.',
    ],
  },
]

const page = () => {
  return (
    <main className="bg-white text-blackk">
      {/* Hero */}
      <section className="bg-yelloww">
        <div className="mx-auto max-w-4xl px-5 xl:px-8 2xl:px-12 py-14 md:py-20">
          <p className="text-sm font-medium uppercase tracking-widest">Legal</p>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold">Privacy Policy</h1>
          <p className="mt-3 text-sm md:text-base text-blackk/70">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-5 xl:px-8 2xl:px-12 py-10 md:py-14">
        <p className="text-base md:text-lg leading-relaxed text-blackk/80">
          At VL Nexis, your privacy matters to us. This policy explains what
          information we collect, how we use it and the choices you have.
        </p>

        <div className="mt-8 space-y-5">
          {sections.map((s) => (
            <div key={s.title} className="rounded-2xl bg-grayy p-5 md:p-7">
              <h2 className="text-xl md:text-2xl font-semibold">{s.title}</h2>

              {s.body?.map((p, i) => (
                <p key={i} className="mt-3 leading-relaxed text-blackk/80">
                  {p}
                </p>
              ))}

              {s.list && (
                <ul className="mt-3 space-y-2">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 text-blackk/80">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-bluee" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-10 rounded-2xl bg-blackk p-6 md:p-8 text-white">
          <h2 className="text-xl md:text-2xl font-semibold">Questions?</h2>
          <p className="mt-2 text-white/70">
            Write to us at{' '}
            <a href="mailto:privacy@vlnexis.com" className="text-yelloww underline">
              privacy@vlnexis.com
            </a>{' '}
            or call +91 98765 43210.
          </p>
        </div>
      </section>
    </main>
  )
}

export default page