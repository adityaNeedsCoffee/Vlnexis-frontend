"use client";

import { useEffect, useRef, useState } from "react";

/* ---------- Icons ---------- */
const iconProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "h-9 w-9",
};

const FlagIcon = () => (
  <svg {...iconProps}>
    <circle cx="14" cy="12" r="4" />
    <path d="M8 44V28a6 6 0 0 1 12 0v16" />
    <path d="M20 28V6l18 6-18 6" />
  </svg>
);

const GlobeIcon = () => (
  <svg {...iconProps}>
    <circle cx="24" cy="24" r="18" />
    <ellipse cx="24" cy="24" rx="8" ry="18" />
    <path d="M6 24h36M9 14h30M9 34h30" />
  </svg>
);

const PresenterIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="4" />
    <path d="M6 44V28a6 6 0 0 1 12 0v16" />
    <rect x="22" y="8" width="22" height="16" rx="1" />
    <path d="M26 20l5-5 4 3 6-6" />
  </svg>
);

const TeamIcon = () => (
  <svg {...iconProps}>
    <circle cx="24" cy="12" r="4" />
    <path d="M17 44V28a7 7 0 0 1 14 0v16" />
    <circle cx="9" cy="20" r="3" />
    <path d="M3 44V33a6 6 0 0 1 8-5" />
    <circle cx="39" cy="20" r="3" />
    <path d="M45 44V33a6 6 0 0 0-8-5" />
  </svg>
);

const ClientsIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="4" />
    <path d="M6 44V28a6 6 0 0 1 12 0v16" />
    <circle cx="36" cy="12" r="4" />
    <path d="M30 44V28a6 6 0 0 1 12 0v16" />
    <path d="M19 32h10M23 29l-4 3 4 3M25 29l4 3-4 3" />
  </svg>
);

/* ---------- Data ---------- */
const stats = [
  { icon: FlagIcon, end: 30, label: "Years of Experience" },
  { icon: GlobeIcon, end: 100, label: "Services We Offer" },
  { icon: PresenterIcon, end: 15, label: "Countries of Operation" },
  { icon: TeamIcon, end: 150, label: "Professionals" },
  { icon: ClientsIcon, end: 3500, label: "Happy Clients" },
];

/* Chart points (x%, y%) — y jitna kam, utna upar */
const points = [
  [0, 72],
  [20, 54],
  [40, 45],
  [60, 33],
  [80, 21],
  [100, 8],
];
const linePoints = points.map(([x, y]) => `${x},${y}`).join(" ");
const areaPoints = `${linePoints} 100,100 0,100`;
const nodes = points.slice(1, -1);

/* ---------- Hooks / helpers ---------- */
function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function CountUp({ end, run, delay = 0, duration = 2200 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(end);
      return;
    }

    let frame;
    const t0 = performance.now() + delay;
    const tick = (now) => {
      const p = Math.min(Math.max((now - t0) / duration, 0), 1);
      const eased = 1 - Math.pow(1 - p, 4); // ease-out
      setValue(Math.round(end * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, end, delay, duration]);

  return <span className="tabular-nums">{value}</span>;
}

/* ---------- Section ---------- */
export default function StatsStrip() {
  const [ref, inView] = useInView();

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="mx-auto px-5 xl:px-8 2xl:px-12">
        {/* Gradient: bluee se blackk (dark blue-to-black, yellow chart yahan sabse sharp dikhta hai) */}
        <div
          ref={ref}
          className="relative isolate overflow-hidden rounded-3xl bg-linear-to-br from-bluee to-blackk shadow-2xl shadow-bluee/25"
        >
          {/* Dotted texture */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.08) 1.4px, transparent 1.4px)",
              backgroundSize: "16px 16px",
              WebkitMaskImage:
                "radial-gradient(ellipse at 30% 40%, black 0%, transparent 70%)",
              maskImage:
                "radial-gradient(ellipse at 30% 40%, black 0%, transparent 70%)",
            }}
          />

          {/* Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-yelloww/10 blur-3xl"
          />

          {/* Rising chart (sirf desktop) - glow rgba Golden (249,214,1) */}
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full text-yelloww drop-shadow-[0_0_8px_rgba(249,214,1,0.45)]"
              style={{
                clipPath: inView ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
                transition: "clip-path 1800ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <defs>
                <linearGradient id="statsFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="currentColor" stopOpacity="0.28" />
                  <stop offset="1" stopColor="currentColor" stopOpacity="0.02" />
                </linearGradient>
              </defs>
              <polygon points={areaPoints} fill="url(#statsFill)" />
              <polyline
                points={linePoints}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {nodes.map(([x, y]) => (
              <span
                key={x}
                className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                  inView ? "scale-100 opacity-100" : "scale-0 opacity-0"
                }`}
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transitionDelay: `${x * 15}ms`,
                }}
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-yelloww/50 motion-reduce:animate-none" />
                <span className="relative block h-4 w-4 rounded-full border-[3px] border-yelloww bg-blackk" />
              </span>
            ))}
          </div>

          {/* Heading (placeholder text, badal sakte ho) */}
          <div
            className={`relative p-6 transition-all duration-700 md:p-10 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
          
            <h2 className="mt-4 max-w-md text-3xl font-bold leading-tight text-grayy md:text-4xl">
              Three decades of trust, built on{" "}
              <span className="text-yelloww">results</span>
            </h2>
          </div>

          {/* Stats */}
          <div className="relative grid grid-cols-2 gap-3 p-5 pt-0 md:mt-0 md:grid-cols-5 md:gap-0 md:p-0 md:pt-44">
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  style={{ transitionDelay: `${i * 120}ms` }}
                  className={`group flex flex-col items-center rounded-2xl bg-white/5 px-3 py-8 text-center transition-all duration-700 last:col-span-2 hover:bg-white/[0.07] md:rounded-none md:bg-transparent md:py-12 md:last:col-span-1 ${
                    i > 0 ? "md:border-l md:border-white/10" : ""
                  } ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-yelloww ring-1 ring-white/15 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110">
                    <Icon />
                  </span>

                  <p className="mt-5 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
                    <CountUp end={s.end} run={inView} delay={i * 120} />
                    <span className="text-yelloww">+</span>
                  </p>

                  <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-grayy md:text-sm">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}