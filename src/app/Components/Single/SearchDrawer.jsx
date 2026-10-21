"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";

// Replace with your real popular searches / pages
const QUICK_LINKS = [
  { label: "Key Services", href: "/key-services" },
  { label: "Manufacturing", href: "/industries/manufacturing" },
  { label: "Case Studies", href: "/blog/case-studies" },
  { label: "About Us", href: "/about-us" },
];

const SearchDrawer = ({ open, onClose }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const router = useRouter();

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock body scroll + focus input when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = "";
      };
    }
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[90] bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[100] flex h-full w-full max-w-[420px] flex-col bg-white shadow-[-12px_0_40px_-8px_rgba(0,0,0,0.25)]
                    transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      open ? "translate-x-0" : "translate-x-full"
                    }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-mystic px-6 py-5">
          <h2 className="text-lg font-semibold text-nocturnal">Search</h2>
          <button
            onClick={onClose}
            aria-label="Close search"
            className="rounded-full p-2 text-gray-600 transition-colors hover:bg-arctic hover:text-nocturnal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search input */}
        <form onSubmit={handleSubmit} className="px-6 pt-6">
          <div className="flex items-center gap-3 rounded-lg border border-mystic px-4 py-3 transition-colors focus-within:border-nocturnal focus-within:ring-2 focus-within:ring-arctic">
            <Search size={18} className="shrink-0 text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, industries, blogs..."
              className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear"
                className="shrink-0 text-gray-400 transition-colors hover:text-nocturnal"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!query.trim()}
            className="mt-4 w-full rounded-lg bg-nocturnal py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Search
          </button>
        </form>

        {/* Quick links */}
        <div className="mt-8 flex-1 overflow-y-auto px-6 pb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Quick Links
          </p>
          <ul>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => {
                    router.push(link.href);
                    onClose();
                  }}
                  className="group flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-arctic hover:text-nocturnal"
                >
                  {link.label}
                  <ArrowRight
                    size={16}
                    className="-translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SearchDrawer;