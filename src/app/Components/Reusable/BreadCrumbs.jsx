"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ChevronRight } from "lucide-react";

/*
  Auto Breadcrumb

  - Home page ("/") pe kuch nahi dikhata
  - Baaki pages pe URL se breadcrumb banata hai
    Example: /services-provided/income-tax  ->  Home > Services Provided > Income Tax
  - Kisi segment ka naam badalna ho to LABEL_OVERRIDES me add karo
*/

// Step 1: Custom naam (optional). Key = URL segment, value = jo dikhana hai
const LABEL_OVERRIDES = {
  "services-provided": "Services",
  "about-us": "About Us",
  "contact-us": "Contact Us",
};

// Step 2: "income-tax" -> "Income Tax"
const prettify = (segment) =>
  LABEL_OVERRIDES[segment] ||
  decodeURIComponent(segment)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default function Breadcrumb() {
  const pathname = usePathname();

  // Step 3: Home page pe breadcrumb hide
  if (pathname === "/") return null;

  // Step 4: URL ko pieces me todo (khali pieces hata do)
  const segments = pathname.split("/").filter(Boolean);

  // Step 5: Har segment ke liye label + uska poora link banao
  const crumbs = segments.map((segment, index) => ({
    label: prettify(segment),
    href: "/" + segments.slice(0, index + 1).join("/"),
  }));

  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full border-b border-blackk/10 bg-grayy"
    >
      {/* Same horizontal padding jo baaki sections me use ho rahi hai */}
      <div className="mx-auto px-5 py-4 xl:px-8 2xl:px-12">
        {/* Mobile pe lamba path ho to scroll ho jaye, wrap na ho */}
        <ol className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm font-medium text-blackk/70">
          {/* Home link (hamesha first) */}
          <li className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-1.5 transition-colors hover:text-bluee"
            >
              <Home size={16} aria-hidden="true" />
              <span>Home</span>
            </Link>
          </li>

          {/* Baaki crumbs */}
          {crumbs.map((crumb, index) => {
            // Last item = current page
            const isCurrentPage = index === crumbs.length - 1;

            return (
              <li key={crumb.href} className="flex items-center gap-2">
                <ChevronRight
                  size={16}
                  aria-hidden="true"
                  className="shrink-0 text-yelloww"
                />

                {isCurrentPage ? (
                  // Current page: link nahi, bluee aur bold
                  <span aria-current="page" className="font-semibold text-bluee">
                    {crumb.label}
                  </span>
                ) : (
                  // Beech ke pages: clickable link
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-bluee"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>

    </nav>
  );
}