"use client";

import { useEffect, useRef, useState } from "react";

const hiddenStates = {
  up: "translate-y-10",
  down: "-translate-y-10",
  left: "-translate-x-10",
  right: "translate-x-10",
  zoom: "scale-90",
  none: "",
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  threshold = 0.2,
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // sirf ek baar chalega
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      className={`transition-all ease-out motion-reduce:transition-none ${
       visible
  ? "translate-x-0 translate-y-0 scale-100 opacity-100"
  : `opacity-0 ${hiddenStates[direction]}`
      } ${className}`}
    >
      {children}
    </div>
  );
}