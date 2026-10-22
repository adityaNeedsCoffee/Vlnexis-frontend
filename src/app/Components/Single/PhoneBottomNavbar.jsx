"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const ITEMS = [
  {
    label: "Home",
    href: "/",
    icon: <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />,
  },
  {
    label: "Services",
    href: "/services-provided",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
      </>
    ),
  },
  {
    label: "About",
    href: "/about-us",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
  },
  {
    label: "Contact",
    href: "/contact",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
  },
];

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function PhoneBottomNavbar() {
  const pathname = usePathname();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] md:hidden">
      <nav
        aria-label="Main"
        className="pointer-events-auto relative flex w-full max-w-sm items-center justify-between gap-1 overflow-hidden rounded-full bg-blackk p-2 shadow-xl shadow-blackk/30"
      >
        {ITEMS.map(({ label, href, icon }) => {
          const active = isActive(pathname, href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`relative flex h-12 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-yelloww motion-reduce:transition-none ${
                active
                  ? "px-5 text-yelloww"
                  : "w-14 justify-center text-grayy/50 active:bg-white/10"
              }`}
            >
              {/* Spotlight: upar ki chamakti patti + neeche aati roshni */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -top-2 inset-x-0 h-[calc(100%+1rem)] transition-opacity duration-300 motion-reduce:transition-none ${
                  active ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  clipPath: "polygon(14% 0, 86% 0, 100% 100%, 0 100%)",
                  background:
                    "linear-gradient(to bottom, rgba(249,214,1,0.5), rgba(249,214,1,0) 90%)",
                }}
              />
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -top-2 left-1/2 h-1 w-3/5 -translate-x-1/2 rounded-b-full bg-yelloww shadow-[0_0_14px_2px_rgba(249,214,1,0.65)] transition-[opacity,transform] duration-300 motion-reduce:transition-none ${
                  active ? "scale-x-100 opacity-100" : "scale-x-50 opacity-0"
                }`}
              />

              <svg viewBox="0 0 24 24" className="relative h-6 w-6 shrink-0" aria-hidden="true" {...stroke}>
                {icon}
              </svg>

              {/* Label: active par smooth khulta hai, baaki par screen-reader ke liye rehta hai */}
              <span
                className={`relative grid transition-[grid-template-columns] duration-300 motion-reduce:transition-none ${
                  active ? "grid-cols-[1fr]" : "grid-cols-[0fr]"
                }`}
              >
                <span
                  className={`overflow-hidden whitespace-nowrap text-sm font-semibold transition-[margin,opacity] duration-300 motion-reduce:transition-none ${
                    active ? "ml-2 opacity-100" : "ml-0 opacity-0"
                  }`}
                >
                  {label}
                </span>
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}