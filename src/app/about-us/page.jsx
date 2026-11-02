import Image from "next/image";
import { assetPath } from "../../../libs/assetPath";

const stats = [
  { value: "30+", label: "Years of experience in Indian tax, accounting and compliance" },
  { value: "15+", label: "Countries our clients come from" },
  { value: "150+", label: "Professionals working under one roof" },
  { value: "3500+", label: "Clients we have supported" },
];

const story = [
  {
    title: "Built for businesses entering India",
    paras: [
      "India offers real opportunity to foreign businesses, but the rules are layered. Company law, income tax, GST, foreign exchange regulations and licensing each have their own forms, deadlines and authorities. A missed filing in one area often causes trouble in another.",
      "Nexis was built to take that weight off your shoulders. We act as your Indian team, so you can focus on your customers, your product and your people while we keep the paperwork and the regulators in order.",
    ],
  },
  {
    title: "One team, one point of contact",
    paras: [
      "Most clients start with a simple question: how do we set up in India? From there, the work usually touches many areas. Instead of handing you from one specialist to the next, we give you a single point of contact who coordinates everything behind the scenes.",
      "That means one person to call, one place where your records are kept and one team that already knows your business when a new question comes up.",
    ],
  },
  {
    title: "What we take care of",
    paras: [
      "We support you from the first plan to the day you take profits home. That includes planning your entry, company incorporation and registrations, licences, foreign investment reporting to the Reserve Bank of India, income tax, GST, accounting and audit support, and ongoing company law compliance.",
      "When your business grows or changes, we also help with acquisitions, restructuring, bringing money back to your home country and, if the time comes, exiting India in an orderly way.",
    ],
  },
  {
    title: "How we work",
    paras: [
      "We explain things in plain language and tell you what is needed, by when and why. Deadlines are tracked on our side, and you hear from us before they arrive, not after.",
      "Where your business also works with lawyers, bankers or auditors, we work alongside them so that advice stays consistent and nothing falls between the gaps.",
    ],
  },
  {
    title: "Where we are headed",
    paras: [
      "Our aim is simple: to be the partner that foreign businesses trust with their Indian operations for the long term. We measure our work by how calm your compliance calendar looks, and by how many of our clients stay with us as they grow.",
    ],
  },
];

export default function AboutPage() {
  return (
    <main className="bg-grayy text-blackk">
      {/* Banner + stats */}
      <section className="px-5 pb-16 xl:px-8 2xl:px-12">
        <div>
          {/* Banner image */}
          <div className="relative mt-2 aspect-[16/9] overflow-hidden rounded-3xl bg-blackk">
            <Image
              src={assetPath("/images/about/about-banner.jpg")}
              alt="The Nexis team at work"
              fill
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Stats */}
          <dl className="relative z-10 mx-2 -mt-6 grid grid-cols-2 gap-x-6 gap-y-8 rounded-3xl bg-white px-6 py-8 md:mx-6 md:px-10 lg:grid-cols-4 lg:gap-0">
            {stats.map((s, i) => (
              <div
                key={s.value}
                className={`lg:px-8 ${
                  i > 0 ? "lg:border-l lg:border-blackk/10" : "lg:pl-0"
                }`}
              >
                <dt className="text-4xl font-medium tracking-tight md:text-5xl">
                  {s.value}
                </dt>
                <dd className="mt-2 max-w-[22ch] text-sm leading-snug text-blackk/60">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Long text */}
      <section className="border-t border-blackk/10 px-5 py-16 md:py-24 xl:px-8 2xl:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="text-3xl font-medium leading-tight tracking-tight md:text-4xl">
                Who we are and how we work
              </h2>
              <span
                aria-hidden="true"
                className="mt-6 block h-1.5 w-16 rounded-full bg-yelloww"
              />
            </div>
          </div>

          <div className="space-y-12 lg:col-span-8">
            {story.map((block) => (
              <article key={block.title}>
                <h3 className="text-xl font-medium md:text-2xl">{block.title}</h3>
                <div className="mt-4 space-y-4">
                  {block.paras.map((p) => (
                    <p
                      key={p.slice(0, 24)}
                      className="max-w-[68ch] text-base leading-relaxed text-blackk/75 md:text-lg"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}