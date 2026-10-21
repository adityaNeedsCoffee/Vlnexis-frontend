// app/services/page.jsx  (server component, isliye metadata yahan rakh sakte hain)
import Link from "next/link";

import ServicesGrid from "./ServicesGrid";
import Reveal from "../Components/Reusable/Reveal";


export const metadata = {
  title: "Our Services | ASC Group",
  description:
    "One partner for your entire Indian journey. Entry planning, company set-up, licences, tax, GST, accounting, compliance, acquisitions and exit support.",
};

export default function ServicesPage() {
  return (
    <main className="bg-grayy">
      {/* Hero */}
      <section className="bg-bluee text-grayy">
        <div className="mx-auto max-w-screen-2xl px-5 py-14 xl:px-8 xl:py-20 2xl:px-12">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wide text-yelloww">
              Our services at a glance
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold md:text-5xl">
              One partner for your entire Indian journey
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-4 max-w-2xl text-lg text-grayy">
              Whether you are opening a subsidiary, a partnership, a branch or a
              representative office, we take care of the regulations, taxes and
              paperwork so that you can focus on growing your business.
            </p>
          </Reveal>
          <Reveal delay={300}>
            {/* Blue hero pe yellow button (secondary jaisa) */}
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-full bg-yelloww px-8 py-3 font-semibold text-blackk transition-colors hover:bg-grayy"
            >
              Talk to our team
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Services grid (API se) */}
      <section className="mx-auto max-w-screen-2xl px-5 py-10 xl:px-8 xl:py-16 2xl:px-12">
        <ServicesGrid />
      </section>

      {/* CTA */}
      <section className="bg-blackk text-grayy">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-start gap-6 px-5 py-12 xl:flex-row xl:items-center xl:justify-between xl:px-8 xl:py-16 2xl:px-12">
          <Reveal direction="left">
            <h2 className="text-2xl font-semibold md:text-3xl">
              Not sure where to start?
            </h2>
            <p className="mt-2 text-grayy">
              Tell us about your plans and we will point you to the right
              service.
            </p>
          </Reveal>
          <Reveal direction="right" delay={150}>
            <Link
              href="/contact"
              className="inline-block rounded-full bg-yelloww px-8 py-3 font-semibold text-blackk transition-colors hover:bg-grayy"
            >
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}