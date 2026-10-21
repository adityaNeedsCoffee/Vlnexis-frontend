"use client";

import Link from "next/link";
import Reveal from "../../Reusable/Reveal";
import { getServiceError, useServiceSummaries } from "@/app/api/hooks/services/useService";


const themes = {
  // Blue card
  dark: {
    card: "bg-bluee text-grayy",
    desc: "text-grayy",
    tag: "bg-yelloww text-blackk",
    btn: "bg-white text-bluee",
  },
  // Gray card (pehle mint tha)
  mint: {
    card: "bg-grayy text-blackk",
    desc: "text-blackk/70",
    tag: "bg-white text-bluee",
    btn: "bg-white text-bluee",
  },
  // Yellow card
  yellow: {
    card: "bg-yelloww text-blackk",
    desc: "text-blackk/80",
    tag: "bg-white text-blackk",
    btn: "bg-white text-blackk",
  },
  // Black card (pehle saffron tha, naye palette me dusra yellow nahi hai)
  saffron: {
    card: "bg-blackk text-grayy",
    desc: "text-grayy/80",
    tag: "bg-yelloww text-blackk",
    btn: "bg-white text-blackk",
  },
  // White card with border
  light: {
    card: "bg-white text-blackk border border-grayy",
    desc: "text-blackk/70",
    tag: "bg-grayy text-bluee",
    btn: "bg-bluee text-white",
  },
};

// Bento layout ab data se nahi, position (index) se decide hota hai.
// API se jitne bhi services aayein, ye pattern unpar lagta hai.
const LAYOUT = [
  { theme: "dark", span: "md:col-span-6 md:row-span-2", big: true },
  { theme: "mint", span: "md:col-span-3" },
  { theme: "yellow", span: "md:col-span-3" },
  { theme: "light", span: "md:col-span-3" },
  { theme: "saffron", span: "md:col-span-3" },
  { theme: "mint", span: "md:col-span-3" },
  { theme: "yellow", span: "md:col-span-3" },
  { theme: "dark", span: "md:col-span-6" },
  { theme: "light", span: "md:col-span-6" },
  { theme: "saffron", span: "md:col-span-6" },
];

// 10 se zyada services hon to extra cards in themes mein ghoomte rahenge
const EXTRA_THEMES = ["mint", "yellow", "light", "saffron", "dark"];

function getLayout(index) {
  if (index < LAYOUT.length) return LAYOUT[index];
  return {
    theme: EXTRA_THEMES[(index - LAYOUT.length) % EXTRA_THEMES.length],
    span: "md:col-span-6",
  };
}

const gridClass =
  "mt-12 grid auto-rows-[minmax(210px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12 md:gap-5";

export default function ServicesBento() {
  const { data, isLoading, isError, error, refetch, isFetching } = useServiceSummaries();
  const services = Array.isArray(data) ? data : [];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto px-5 xl:px-8 2xl:px-12">
        {/* Heading */}
        <div className="max-w-3xl">
          <Reveal direction="up">
            <h2 className="text-3xl font-bold leading-tight text-blackk md:text-5xl">
              One partner for your entire{" "}
              <span className="text-bluee">Business journey</span>
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-yelloww" />
          </Reveal>

          <Reveal direction="up" delay={150}>
            <p className="mt-6 text-base leading-relaxed text-blackk md:text-lg">
              Whether you are opening a subsidiary, a partnership, a branch or a
              representative office, we take care of the regulations, taxes and
              paperwork so that you can focus on growing your business.
            </p>
          </Reveal>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className={gridClass} aria-busy="true" aria-label="Loading services">
            {LAYOUT.slice(0, 6).map((l, i) => (
              <div
                key={i}
                aria-hidden="true"
                className={`h-full min-h-[210px] animate-pulse rounded-2xl bg-grayy ${l.span}`}
              />
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div role="alert" className="mt-12 rounded-2xl bg-grayy p-8 text-center">
            <p className="text-lg font-semibold text-blackk">We could not load our services.</p>
            <p className="mt-2 text-blackk/80">{getServiceError(error)}</p>
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-6 rounded-full bg-bluee px-8 py-3 font-semibold text-white transition-colors hover:bg-blackk disabled:opacity-60"
            >
              {isFetching ? "Retrying..." : "Try again"}
            </button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && services.length === 0 && (
          <p className="mt-12 rounded-2xl bg-grayy p-8 text-center text-blackk">
            Our services will be listed here shortly.
          </p>
        )}

        {/* Bento grid */}
        {services.length > 0 && (
          <div className={gridClass}>
            {services.map((s, i) => {
              const { theme, span, big } = getLayout(i);
              const t = themes[theme];
              const no = String(s.number).padStart(2, "0");

              return (
                <Reveal
                  key={s.slug}
                  direction="up"
                  delay={(i % 4) * 100}
                  className={`h-full ${span}`}
                >
                  <Link
                    href={`/services-provided/${s.slug}`}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl md:p-7 ${t.card}`}
                  >
                    {/* Big ghost number (sirf bade card par) */}
                    {big && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute -bottom-10 -left-2 select-none text-[12rem] font-extrabold leading-none text-white/5 md:text-[16rem]"
                      >
                        {no}
                      </span>
                    )}

                    <span
                      className={`relative w-fit rounded-full px-3 py-1 text-sm font-semibold ${t.tag}`}
                    >
                      {no}
                    </span>

                    <h3
                      className={`relative mt-5 font-semibold leading-snug ${
                        big ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
                      }`}
                    >
                      {s.title}
                    </h3>

                    <p
                      className={`relative mt-3 text-sm leading-relaxed md:text-base ${t.desc} ${
                        big ? "max-w-md md:text-lg" : ""
                      }`}
                    >
                      {s.tagline}
                    </p>

                    {/* Arrow */}
                    <span
                      className={`relative mt-auto flex h-12 w-12 items-center justify-center self-end rounded-full shadow-md transition-transform duration-300 group-hover:translate-x-1 ${t.btn}`}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}