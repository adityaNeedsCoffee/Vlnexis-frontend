"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { assetPath } from "../../../../../libs/assetPath";
import Button from "../../Reusable/Button";

const hiddenStates = {
  up: "translate-y-10",
  left: "-translate-x-10",
  right: "translate-x-10",
};

function Reveal({ children, direction = "up", delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
   <div
  ref={ref}
  data-visible={visible}
  style={{ transitionDelay: `${delay}ms` }}
  className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
    visible
      ? "translate-x-0 translate-y-0 opacity-100"
      : `opacity-0 ${hiddenStates[direction]}`
  } ${className}`}
>
  {children}
</div>
  );
}

export default function PlanningEntry() {
  return (
    // "relative isolate" add kiya taaki dots section ke andar hi rahein
    <section className="relative isolate overflow-hidden bg-bluee py-16 md:py-24">
      {/* Dotted pattern in the background (white dots, halke se) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.28) 1.6px, transparent 1.6px)",
          backgroundSize: "14px 14px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 40% 50%, black 0%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse at 40% 50%, black 0%, transparent 75%)",
        }}
      />

      <div className="mx-auto grid items-center gap-10 px-5 md:grid-cols-2 md:gap-14 xl:px-8 2xl:px-12">

        {/* Left: text */}
        <div>
          <Reveal direction="left">
            <h2 className="text-3xl font-bold leading-tight text-grayy md:text-5xl">
              Planning Your Entry into{" "}
              <span className="text-yelloww">India</span>
           <span className="qmark-wobble ml-1 text-yelloww">?</span>
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-yelloww" />
          </Reveal>

          <Reveal direction="left" delay={150}>
            <p className="mt-6 text-base leading-relaxed text-grayy md:text-lg">
              From market research and compliance to entity setup, our experts
              guide every step of your entry into India. Lorem ipsum dolor sit
              amet consectetur, adipisicing elit. Tenetur, laboriosam quos
              numquam ad non saepe ratione voluptates eius voluptatibus!
            </p>
          </Reveal>

          <Reveal direction="up" delay={300}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {/* variant="secondary" = yellow button (blue bg pe clearly dikhega) */}
              <Button href="/contact" size="lg" variant="secondary">
                Plan Your Entry
              </Button>
             
            </div>
            <p className="mt-4 text-sm text-grayy/70">
              No obligation. We reply within 24 hours.
            </p>
          </Reveal>
        </div>

        {/* Right: image */}
        <Reveal direction="right" delay={200}>
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={assetPath("/HomePageImages/IndiaHomePage.png")}
              alt="Planning your entry into India"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}