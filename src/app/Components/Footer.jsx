"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "./Reusable/Button";
import Reveal from "./Reusable/Reveal";

/* ---------- Icons ---------- */
const Svg = ({ children, className = "h-5 w-5", fill = "currentColor" }) => (
  <svg viewBox="0 0 24 24" className={className} fill={fill} aria-hidden>
    {children}
  </svg>
);

const PinIcon = ({ className }) => (
  <Svg className={className}>
    <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
  </Svg>
);
const PhoneIcon = () => (
  <Svg>
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
  </Svg>
);
const MailIcon = () => (
  <Svg>
    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.2L4.5 7v.1L12 12.4 19.5 7.1V7L12 12.2z" />
  </Svg>
);
const ChevronIcon = () => (
  <Svg className="h-3.5 w-3.5" fill="none">
    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);
const XIcon = () => (
  <Svg>
    <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z" />
  </Svg>
);
const FacebookIcon = () => (
  <Svg>
    <path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.9.4-1.7 1.8-1.7h1.6V3.8s-1.4-.3-2.8-.3c-2.8 0-4.5 1.7-4.5 4.7v2.3H6.8v3.3h2.8V22h3.9z" />
  </Svg>
);
const InstagramIcon = () => (
  <Svg fill="none">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
  </Svg>
);
const LinkedinIcon = () => (
  <Svg>
    <path d="M4.5 9h3.6v11H4.5V9zm1.8-5.5a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2zM10 9h3.4v1.5h.1c.5-.9 1.7-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5V20h-3.6v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V20H10V9z" />
  </Svg>
);

/* ---------- Data (placeholders, replace with your own) ---------- */
const importantLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
  { label: "Career", href: "/career" },
  { label: "Contact Us", href: "/contact" },
];

const supportLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "FAQs", href: "/faqs" },
  { label: "Sitemap", href: "/sitemap" },
];

const serviceLinks = [
  { label: "Planning Your Entry into India", href: "/services/planning-entry" },
  { label: "Setting Up Your Business", href: "/services/setting-up-business" },
  { label: "Licences and Registrations", href: "/services/licences-registrations" },
  { label: "Income Tax", href: "/services/income-tax" },
  { label: "Goods and Services Tax (GST)", href: "/services/gst" },
  { label: "Company Law Compliance", href: "/services/company-law-compliance" },
  { label: "Accounting and Audit Support", href: "/services/accounting-audit" },
];

const socials = [
  { label: "X", href: "#", Icon: XIcon },
  { label: "Facebook", href: "#", Icon: FacebookIcon },
  { label: "Instagram", href: "#", Icon: InstagramIcon },
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
];

const cities = [
  "Delhi", "Mumbai", "Bengaluru", "Chennai", "Kolkata", "Hyderabad", "Pune", "Singapore", "Dubai",
];

/* ---------- Small pieces ---------- */
function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-grayy">{title}</h3>
      <div className="mt-2 h-0.5 w-10 rounded-full bg-yelloww" />
      <ul className="mt-6 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-2 text-grayy transition-colors hover:text-yelloww"
            >
              <span className="text-yelloww transition-transform group-hover:translate-x-0.5">
                <ChevronIcon />
              </span>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Newsletter() {
  const [done, setDone] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: add your API call here (name, email)
    setDone(true);
    e.currentTarget.reset();
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-grayy">Newsletter Subscription</h3>
      <div className="mt-2 h-0.5 w-10 rounded-full bg-yelloww" />

      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-3 rounded-2xl bg-white/10 p-5 ring-1 ring-white/10"
      >
        <input
          type="text"
          name="name"
          required
          placeholder="Your Name"
          className="w-full rounded-lg bg-white px-4 py-3 text-sm text-blackk placeholder:text-blackk/50 focus:outline-none focus:ring-2 focus:ring-yelloww"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Your Email"
          className="w-full rounded-lg bg-white px-4 py-3 text-sm text-blackk placeholder:text-blackk/50 focus:outline-none focus:ring-2 focus:ring-yelloww"
        />
        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="text-xs text-yelloww" aria-live="polite">
            {done ? "Thanks for subscribing!" : ""}
          </p>
          {/* variant="secondary" = yellow button (dark footer pe clearly dikhega) */}
          <Button type="submit" size="sm" variant="secondary" className="uppercase tracking-widest">
            Subscribe
          </Button>
        </div>
      </form>
    </div>
  );
}

/* ---------- Footer ---------- */
export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-blackk text-grayy">
      {/* Soft dotted texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.07) 1.4px, transparent 1.4px)",
          backgroundSize: "16px 16px",
          WebkitMaskImage:
            "radial-gradient(ellipse at 70% 50%, black 0%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse at 70% 50%, black 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-72 w-72 rounded-full bg-bluee/60 blur-3xl"
      />

      {/* Top bar */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid items-center gap-6 px-5 py-8 lg:grid-cols-[auto_1fr_auto_auto] lg:gap-0 xl:px-8 2xl:px-12">

          {/* Logo (made white for the dark background; remove brightness-0 invert if you have a light/colour logo) */}
          <Link href="/" className="flex shrink-0 items-center lg:pr-10">
            <Image
              src="/HomePageImages/VLNEXISLOGO.png"
              alt="Nexis"
              width={160}
              height={48}
              className="h-10 w-auto brightness-0 invert md:h-12"
            />
          </Link>

          {/* Offices */}
          <div className="space-y-2 text-sm lg:border-l lg:border-white/10 lg:px-8">
            <p className="flex items-start gap-2">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-yelloww" />
              <span>
                <span className="font-semibold text-yelloww">Corporate Office: </span>
                Your corporate address here
              </span>
            </p>
            <p className="flex items-start gap-2">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-yelloww" />
              <span>
                <span className="font-semibold text-yelloww">Registered Office: </span>
                Your registered address here
              </span>
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-2 text-sm lg:border-l lg:border-white/10 lg:px-8">
            <a href="tel:+910000000000" className="flex items-center gap-2 hover:text-yelloww">
              <span className="text-yelloww"><PhoneIcon /></span>
              +91-0000000000
            </a>
            <a href="mailto:info@yourdomain.com" className="flex items-center gap-2 hover:text-yelloww">
              <span className="text-yelloww"><MailIcon /></span>
              info@yourdomain.com
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3 lg:border-l lg:border-white/10 lg:pl-8">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full text-yelloww ring-1 ring-white/15 transition hover:-translate-y-0.5 hover:bg-yelloww hover:text-blackk"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="mx-auto px-5 py-14 xl:px-8 2xl:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <Reveal direction="up">
            <LinkColumn title="Important Links" links={importantLinks} />
          </Reveal>
          <Reveal direction="up" delay={100}>
            <LinkColumn title="Support" links={supportLinks} />
          </Reveal>
          <Reveal direction="up" delay={200}>
            <LinkColumn title="Our Services" links={serviceLinks} />
          </Reveal>
          <Reveal direction="up" delay={300}>
            <Newsletter />
          </Reveal>
        </div>
      </div>

      {/* Cities */}
      <div className="border-t border-white/10">
        <ul className="mx-auto flex flex-wrap items-center justify-center gap-x-7 gap-y-3 px-5 py-6 text-sm font-medium uppercase tracking-wide xl:px-8 2xl:px-12">
          {cities.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <PinIcon className="h-4 w-4 text-yelloww" />
              {c}
            </li>
          ))}
        </ul>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <p className="px-5 py-5 text-center text-sm text-grayy">
          Copyright © {new Date().getFullYear()} Nexis. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}