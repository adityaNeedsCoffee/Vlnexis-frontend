import Image from "next/image";
import { Anton, Mrs_Saint_Delafield } from "next/font/google";
import Reveal from "../../Reusable/Reveal";
import Button from "../../Reusable/Button";

const display = Anton({ subsets: ["latin"], weight: "400" });
const script = Mrs_Saint_Delafield({ subsets: ["latin"], weight: "400" });

const chips = [
  "Planning Your Entry",
  "Business Set-up",
  "Licences & Registrations",
  "Foreign Investment Reporting",
  "Income Tax",
  "GST",
  "Accounting & Audit",
  "Company Law",
  "Acquisitions & Restructuring",
  "Repatriation & Exit",
];

const paragraph =
  "One partner for your entire Indian journey. We take care of the regulations, taxes and paperwork so you can focus on growing your business.";

export default function BoldHero() {
  return (
    <section className="relative isolate overflow-hidden bg-grayy px-5 xl:px-8 2xl:px-12">
      {/* Soft yellow dotted pattern (Golden #f9d601 ke rgb: 249,214,1) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(249,214,1,0.28) 1.6px, transparent 1.6px)",
          backgroundSize: "14px 14px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 0%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 0%, transparent 70%)",
        }}
      />

      {/* Vertical side label */}
      <span
        aria-hidden
        className="absolute left-2 top-1/2 hidden -translate-y-1/2 rotate-180 text-xs font-medium tracking-[0.25em] text-blackk/60 [writing-mode:vertical-rl] xl:block 2xl:left-4"
      >
        One Trusted Advisor
      </span>

      {/* Stage */}
      <div className="relative mx-auto min-h-[560px] px-5 md:min-h-[680px] lg:min-h-[760px] xl:px-8 2xl:px-12">

        {/* Giant headline */}
        <h1
          className={`${display.className} relative z-0 pt-8 text-[19vw] uppercase leading-[0.85] text-blackk sm:text-[17vw] md:pt-14 md:text-[13vw]`}
        >
          <span className="flex flex-wrap items-start gap-x-[0.25em] md:flex-nowrap md:justify-between md:px-[3vw]">
            <Reveal direction="left">
              <span className="block">Your</span>
            </Reveal>
            <Reveal direction="right" delay={150}>
              <span className="block">India</span>
            </Reveal>
          </span>

          <Reveal direction="up" delay={300} className="md:ml-[10vw]">
            <span className="block text-bluee">Gateway</span>
          </Reveal>
        </h1>

        {/* Person cutout (transparent PNG) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[72%] justify-center md:h-[92%]">
          <Reveal direction="up" delay={200} duration={1000} className="h-full">
            <Image
              src="/HomePageImages/Professional Man in Navy Suit.png"
              alt="Nexis advisor"
              width={800}
              height={1000}
              priority
              className="h-full w-auto object-contain object-bottom"
            />
          </Reveal>
        </div>

        {/* Script overlay */}
        <div className="pointer-events-none absolute left-1/2 top-[40%] z-20 -translate-x-1/2 -rotate-[10deg] md:top-[42%]">
          <Reveal direction="none">
            <span
              className={`${script.className} script-write block whitespace-nowrap text-[22vw] leading-none text-yelloww drop-shadow-md md:text-[10vw]`}
            >
              Nexis
            </span>
          </Reveal>
        </div>

        {/* Right paragraph + CTA (desktop) */}
        <div className="absolute bottom-10 right-5 z-20 hidden max-w-[19rem] text-right md:block xl:right-8 2xl:right-12">
          <Reveal direction="up" delay={400}>
            <p className="text-xs uppercase leading-relaxed tracking-wide text-blackk">
              {paragraph}
            </p>
            <Button href="/contact" size="md" className="mt-5">
              Book a Free Consultation
            </Button>
          </Reveal>
        </div>
      </div>

      {/* Paragraph + CTA (mobile) */}
      <div className="px-5 pb-10 md:hidden">
        <p className="text-xs uppercase leading-relaxed tracking-wide text-blackk">
          {paragraph}
        </p>
        <Button href="/contact" size="md" className="mt-5">
          Book a Free Consultation
        </Button>
      </div>

      {/* Chips marquee */}
      <div className="marquee relative overflow-hidden border-t border-blackk/10 bg-white py-4 ">
        <div className="marquee-track flex w-max ">
          {[...chips, ...chips].map((chip, i) => (
            <span
              key={i}
              aria-hidden={i >= chips.length}
              className="mr-3 shrink-0 rounded-xl bg-bluee px-6 py-3 text-sm font-semibold text-white"
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}