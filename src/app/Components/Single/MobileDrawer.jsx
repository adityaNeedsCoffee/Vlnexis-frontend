"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useServices } from "@/app/api/hooks/services/useService";
// Services data (get all). Path apne project ke hisaab se adjust karo.


// Services page ka base path (accordion ka "All services" link aur har service ka link isi se bante hain)
const SERVICES_HREF = "/services-provided";

// Links aur details yahan se badlo
// accordion: true wale item par click karne se neeche services ki list khulti hai
const LINKS = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about-us" },
  { label: "Services", href: SERVICES_HREF, accordion: true },
  { label: "Contact", href: "/contact" },
];

const EXTRA_LINKS = [{ label: "Terms and conditions", href: "/terms-and-conditions" }];

const EMAIL = "info@nexis.in";
const PHONE = { label: "+91-99990 43311", href: "tel:+919999043311" };

// ---- Service data ka shape: API ke field names alag hon to sirf yahan badlo ----
// getAll kabhi seedha array deta hai, kabhi { data: [...] } me; dono chalte hain
const getServiceList = (data) => (Array.isArray(data) ? data : data?.data || data?.services || []);
const getServiceName = (service) => service.title || service.name || service.categoryName || service.slug;
const getServiceKey = (service) => service.slug || service._id || service.id;
const getServiceHref = (service) => `${SERVICES_HREF}/${service.slug}`;

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileDrawer({ open, onClose }) {
  const pathname = usePathname();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const lastFocused = useRef(null);
  const [servicesOpen, setServicesOpen] = useState(false);

  const { data: servicesData, isLoading, isError, error, refetch } = useServices();
  const services = getServiceList(servicesData);
  useEffect(() => {
    onClose?.();
  }, [pathname]);

  useEffect(() => {
    if (open) setServicesOpen(isActive(pathname, SERVICES_HREF));
  }, [open, pathname]);

  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      lastFocused.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] xl:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-blackk/50 transition-opacity duration-300 motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col rounded-l-3xl bg-white shadow-2xl transition-[transform,visibility] duration-300 motion-reduce:transition-none ${
          open ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 pt-6">
          <span className="text-lg font-semibold text-blackk">Menu</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-grayy text-blackk transition-colors hover:bg-blackk hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-bluee"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pb-4">
          <ul className="space-y-1">
            {LINKS.map(({ label, href, accordion }) => {
              const active = isActive(pathname, href);
              const rowClass = `flex w-full items-center justify-between rounded-2xl px-4 py-4 text-2xl font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-bluee ${
                active ? "bg-yelloww text-blackk" : "text-blackk hover:bg-grayy"
              }`;

              // Services: click karne par accordion khulta hai (page nahi khulta)
              if (accordion) {
                return (
                  <li key={href}>
                    <button
                      type="button"
                      onClick={() => setServicesOpen((current) => !current)}
                      aria-expanded={servicesOpen}
                      aria-controls="mobile-services-panel"
                      className={rowClass}
                    >
                      {label}
                      <svg
                        viewBox="0 0 24 24"
                        className={`h-5 w-5 opacity-50 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {servicesOpen && (
                      <ul id="mobile-services-panel" className="mt-1 space-y-0.5 pb-2 pl-4">
                        {/* Pehla item: poori services page */}
                        <li>
                          <Link
                            href={href}
                            className="block rounded-xl px-4 py-2.5 text-base font-medium text-bluee transition-colors hover:bg-grayy focus:outline-none focus-visible:ring-2 focus-visible:ring-bluee"
                          >
                            All services
                          </Link>
                        </li>

                        {isLoading && (
                          <li className="px-4 py-2.5 text-sm text-blackk/60">Loading services…</li>
                        )}

                        {isError && (
                          <li className="px-4 py-2.5 text-sm text-blackk/70">
                            {getServiceError(error)}{" "}
                            <button
                              type="button"
                              onClick={() => refetch()}
                              className="font-medium text-bluee underline underline-offset-4"
                            >
                              Try again
                            </button>
                          </li>
                        )}

                        {services.map((service) => {
                          const serviceHref = getServiceHref(service);
                          const serviceActive = isActive(pathname, serviceHref);
                          return (
                            <li key={getServiceKey(service)}>
                              <Link
                                href={serviceHref}
                                aria-current={serviceActive ? "page" : undefined}
                                className={`block rounded-xl px-4 py-2.5 text-base transition-colors hover:bg-grayy hover:text-bluee focus:outline-none focus-visible:ring-2 focus-visible:ring-bluee ${
                                  serviceActive ? "font-medium text-bluee" : "text-blackk/80"
                                }`}
                              >
                                {getServiceName(service)}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              }

              // Baaki sab normal links
              return (
                <li key={href}>
                  <Link href={href} aria-current={active ? "page" : undefined} className={rowClass}>
                    {label}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m9 6 6 6-6 6" />
                    </svg>
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="mt-4 space-y-1 border-t border-blackk/10 pt-4">
            {EXTRA_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="block rounded-xl px-4 py-2.5 text-base text-blackk/70 transition-colors hover:bg-grayy hover:text-bluee focus:outline-none focus-visible:ring-2 focus-visible:ring-bluee"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer: CTA + contact */}
        <div className="space-y-4 border-t border-blackk/10 px-6 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] pt-5">
          <Link
            href="/contact"
            className="flex w-full items-center justify-center rounded-full bg-bluee px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blackk focus:outline-none focus-visible:ring-2 focus-visible:ring-yelloww focus-visible:ring-offset-2"
          >
            Book a free consultation
          </Link>

          <div className="space-y-1 text-sm text-blackk/70">
            <a
              href={`mailto:${EMAIL}`}
              className="block underline-offset-4 hover:text-bluee hover:underline focus:outline-none focus-visible:underline"
            >
              {EMAIL}
            </a>
            <a
              href={PHONE.href}
              className="block underline-offset-4 hover:text-bluee hover:underline focus:outline-none focus-visible:underline"
            >
              {PHONE.label}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}