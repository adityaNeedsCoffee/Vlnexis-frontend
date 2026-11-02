export const metadata = {
  title: "Terms and Conditions | Nexis",
  description:
    "The terms that apply when you use the Nexis website and our consulting, tax, accounting and compliance services in India.",
};

// Apni real details yahan daal dijiye
const LAST_UPDATED = "22 October 2026";
const CONTACT_EMAIL = "support@yourdomain.com";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    paras: [
      "These terms and conditions apply to your use of the Nexis website and to any enquiry you make through it. By using the website, you confirm that you have read and agree to them. If you do not agree, please do not use the website.",
      "Work we carry out for you as a client is governed by a separate engagement letter or service agreement. If that agreement conflicts with these terms, the agreement prevails.",
    ],
  },
  {
    id: "our-services",
    title: "Our services",
    paras: [
      "Nexis provides consulting, tax, accounting, regulatory and compliance support to businesses operating or planning to operate in India. The descriptions on this website are general summaries and do not form an offer or a guarantee of any specific outcome.",
      "The scope, timelines and fees for any service are confirmed in writing before work begins.",
    ],
  },
  {
    id: "no-advice",
    title: "General information, not advice",
    paras: [
      "The content on this website is for general information only. Tax, company law and foreign exchange rules change often and apply differently to each business. Nothing here is professional advice for your specific situation.",
      "Sending us an enquiry or booking a consultation does not by itself create a client relationship. A client relationship starts only when we both sign an engagement letter or service agreement.",
    ],
  },
  {
    id: "your-responsibilities",
    title: "Your responsibilities as a client",
    paras: ["To deliver our services on time and accurately, we need your help. When you engage us, you agree to:"],
    list: [
      "give us complete, accurate and up-to-date information and documents;",
      "reply to our requests within the time we reasonably ask for;",
      "tell us promptly about any change that may affect our work, such as a change in ownership, directors, address or business activity;",
      "review the filings and documents we prepare before they are submitted and confirm that they are correct.",
    ],
    after:
      "We rely on the information you provide and are not responsible for errors or delays caused by incomplete or inaccurate information.",
  },
  {
    id: "fees",
    title: "Fees and payment",
    paras: [
      "Our fees are set out in the engagement letter or proposal. Unless stated otherwise, they do not include government fees, stamp duty, filing charges, travel costs or applicable taxes, which are billed separately.",
      "Invoices are payable within the period stated on the invoice. If payment is late, we may pause work until the amount is received. Fees already paid for work that has started are not refundable unless the agreement says so.",
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    paras: [
      "We treat the information you share with us as confidential and use it only to provide our services. We may share it with government authorities, banks or other parties where this is needed to complete your filings and applications, or where the law requires it.",
      "Our team members and any professionals we work with are bound by confidentiality obligations. Our handling of personal data is described in our Privacy Policy.",
    ],
  },
  {
    id: "website-use",
    title: "Using this website",
    paras: ["When you use this website, you agree not to:"],
    list: [
      "use it for any unlawful purpose or in a way that harms others;",
      "try to gain unauthorised access to our systems, or interfere with how the website works;",
      "send spam, malicious code or false enquiries through our forms;",
      "copy, scrape or resell content from the website without our written permission.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    paras: [
      "The text, design, logos, graphics and other material on this website belong to Nexis or its licensors and are protected by copyright and other laws. You may view and print pages for your own personal or internal business use. Any other use needs our written permission.",
      "Documents we prepare specifically for you become yours once all fees due for them are paid. We keep our rights in our general methods, templates and know-how.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-party links and services",
    paras: [
      "This website may link to government portals and other third-party websites. We do not control them and are not responsible for their content, availability or policies. You use them at your own risk.",
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    paras: [
      "We try to keep the information on this website accurate and current, but we do not promise that it is complete, error-free or up to date at all times. The website is provided on an \"as is\" and \"as available\" basis.",
      "Government decisions, approvals and processing times are outside our control. We cannot guarantee that any application, registration or approval will be granted or completed by a particular date.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    paras: [
      "To the fullest extent the law allows, Nexis is not liable for any indirect or consequential loss, or for loss of profit, revenue, business or goodwill, arising from your use of this website or our services.",
      "Where we are found liable to you, our total liability for a matter is limited to the fees you paid us for the specific service that gave rise to the claim, unless your engagement letter says otherwise. Nothing in these terms limits liability that cannot be limited by law.",
    ],
  },
  {
    id: "indemnity",
    title: "Indemnity",
    paras: [
      "You agree to compensate Nexis for any loss, claim or cost that arises from information you gave us that was false or misleading, or from your breach of these terms.",
    ],
  },
  {
    id: "termination",
    title: "Ending our services",
    paras: [
      "Either of us may end an engagement by giving written notice, as set out in the engagement letter. You remain responsible for fees for work done up to the date of ending. We may also stop acting for you if you do not pay on time, do not cooperate, or ask us to do something that is unlawful.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law and disputes",
    paras: [
      "These terms are governed by the laws of India. We will first try to settle any dispute through discussion. If that does not work, the courts of [City], India have exclusive jurisdiction.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    paras: [
      "We may update these terms from time to time. The date at the top of this page shows when they were last changed. Continuing to use the website after a change means you accept the updated terms.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paras: ["If you have any questions about these terms, please write to us at the address below."],
    contact: true,
  },
];

export default function TermsPage() {
  return (
    <main className="bg-grayy text-blackk">
      {/* Header */}
      <section className="px-5 pb-10 pt-14 md:pb-14 md:pt-20 xl:px-8 2xl:px-12">
        <div className="mx-auto max-w-7xl">
          <h1 className="max-w-3xl text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            Terms and conditions
          </h1>
          <div className="mt-6 h-1.5 w-16 rounded-full bg-yelloww" aria-hidden="true" />
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-blackk/70 md:text-lg">
            Please read these terms carefully. They explain how you may use our website and the basis on which we provide our services.
          </p>
          <p className="mt-3 text-sm text-blackk/60">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Body */}
      <section className="px-5 pb-20 xl:px-8 2xl:px-12">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Contents */}
          <aside className="lg:col-span-4">
            <nav
              aria-label="Terms contents"
              className="rounded-3xl bg-white p-6 lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
            >
              <p className="text-lg font-medium">On this page</p>
              <ol className="mt-4 space-y-1">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex gap-3 rounded-lg px-2 py-1.5 text-sm text-blackk/70 transition-colors hover:bg-grayy hover:text-bluee focus:outline-none focus-visible:ring-2 focus-visible:ring-bluee"
                    >
                      <span className="w-5 shrink-0 text-blackk/40">{i + 1}.</span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          {/* Terms */}
          <div className="rounded-3xl bg-white px-6 py-10 md:px-10 md:py-12 lg:col-span-8">
            <div className="space-y-12">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="text-2xl font-medium leading-snug md:text-3xl">
                    <span className="mr-2 text-bluee">{i + 1}.</span>
                    {s.title}
                  </h2>

                  <div className="mt-4 space-y-4">
                    {s.paras.map((p) => (
                      <p
                        key={p.slice(0, 30)}
                        className="max-w-[68ch] text-base leading-relaxed text-blackk/75 md:text-lg"
                      >
                        {p}
                      </p>
                    ))}

                    {s.list && (
                      <ul className="max-w-[68ch] space-y-2.5">
                        {s.list.map((item) => (
                          <li
                            key={item.slice(0, 30)}
                            className="flex gap-3 text-base leading-relaxed text-blackk/75 md:text-lg"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-bluee"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {s.after && (
                      <p className="max-w-[68ch] text-base leading-relaxed text-blackk/75 md:text-lg">
                        {s.after}
                      </p>
                    )}

                    {s.contact && (
                      <p className="text-base md:text-lg">
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="font-medium text-bluee underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </p>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}