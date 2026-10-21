"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* Fades + slides children up from below when they scroll into view (plays once) */
const Reveal = ({ children, delay = 0, from = "translate-y-10", className = "" }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        shown ? "translate-y-0 opacity-100" : `${from} opacity-0`
      } ${className}`}
    >
      {children}
    </div>
  );
};

const HomeAboutSection = () => {
  return (
    <section className="relative isolate overflow-hidden bg-white py-16 md:py-24">
      {/* Soft yellow dotted pattern in the background (Golden #f9d601 ke rgb: 249,214,1) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(249,214,1,0.28) 1.6px, transparent 1.6px)",
          backgroundSize: "14px 14px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 40% 50%, black 0%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse at 40% 50%, black 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto grid w-full items-center gap-10 px-5 md:grid-cols-12 md:gap-12 xl:px-8 2xl:px-12">
        {/* Image: fixed height, cropped with object-cover, rises from below */}
        <Reveal from="translate-y-24" className="md:col-span-5">
          <div className="relative h-[320px] w-full overflow-hidden rounded-2xl shadow-xl sm:h-[400px] md:h-[500px] lg:h-[540px]">
            <Image
              src="/HomePageImages/Gemini_Generated_Image_x72gp0x72gp0x72g.png"
              alt="Nexis team in a meeting"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-[50%_65%]"
            />
            {/* subtle blue tint to blend with the theme */}
            <div className="absolute inset-0 bg-bluee/10" />
          </div>
        </Reveal>

        {/* Content */}
        <div className="md:col-span-7">
          <Reveal>
            <h2 className="text-4xl font-extrabold tracking-tight text-blackk md:text-5xl">
              About <span className="text-bluee">Nexis</span>
            </h2>
            <div className="mt-3 h-1 w-16 rounded-full bg-yelloww" />
          </Reveal>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-blackk sm:text-lg md:text-justify">
            <Reveal delay={150}>
              <p>
                With over three decades of distinguished expertise, we are one of
                India&apos;s fastest-growing consulting firms. Our expansive
                network spans major cities across India and five international
                locations, offering a comprehensive suite of 100+ specialized
                services.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p>
                These include essential business areas such as Risk Advisory,
                Taxation, Assurance, Corporate Insolvency and Bankruptcy, M&amp;A,
                Accounting, Secretarial and Regulatory, and more. We serve a
                broad range of industries, providing tailored solutions to tackle
                the distinct challenges of each sector.
              </p>
            </Reveal>
            <Reveal delay={450}>
              <p>
                We are unwavering in our commitment to our clients, serving as
                their &apos;One Trusted Advisor&apos; across all facets of their
                business.
              </p>
            </Reveal>
          </div>

          <Reveal delay={600} className="mt-8">
            <Link
              href="/about-us"
              className="group inline-flex items-center gap-2 rounded-full bg-bluee px-7 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-md transition hover:bg-blackk hover:shadow-lg"
            >
              Read more
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutSection;