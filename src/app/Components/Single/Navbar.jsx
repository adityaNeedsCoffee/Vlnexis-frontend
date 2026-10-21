"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Menu, X, Mail, Phone } from "lucide-react";
import Navlinks, { NAV_LINKS } from "./Navlinks";
import Image from "next/image";
import SearchDrawer from "./SearchDrawer";

const LANGUAGES = ["EN"];

// Plain links on the right (plain on 2xl, inside "More" on xl)
// const SECONDARY_LINKS = [
//   { label: "Are You a SME", href: "/sme" },
//   { label: "Careers", href: "/careers" },
// ];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState(null);
  const [language, setLanguage] = useState("EN");
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMobileItem = (label) =>
    setOpenMobileItem((current) => (current === label ? null : label));

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenMobileItem(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white text-blackk shadow-sm">
      {/* Single row: logo + links on the left, utilities on the right */}
      <div className=" flex max-w-[1500px] items-center py-3 px-5 xl:px-8 2xl:px-12">
        {/* Logo (swap with <Image /> when you have the file) */}
        <Link
  href="/"
  className="flex shrink-0 items-center"
  onClick={closeMobileMenu}
>
  <Image
    src="/HomePageImages/vlnexisLogo.png"
    alt="Nexis"
    width={160}
    height={48}
    priority
    className="h-10 w-auto md:h-12"
  />
</Link>

        {/* Main links sit right next to the logo */}
        <div className="ml-8 xl:ml-10 2xl:ml-12">
          <Navlinks />
        </div>

        {/* Right cluster (pushed to the far right) */}
        <div className="ml-auto flex shrink-0 items-center gap-4 2xl:gap-6">
          {/* Secondary links: plain on 2xl */}
          {/* <div className="hidden items-center gap-6 2xl:flex">
            {SECONDARY_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="whitespace-nowrap text-[15px] transition-colors hover:text-bluee"
              >
                {link.label}
              </Link>
            ))}
          </div> */}

          {/* "More" dropdown: xl only (holds the secondary links) */}
          <div className="group relative hidden xl:block 2xl:hidden">
            <button
              type="button"
              className="flex items-center gap-1 whitespace-nowrap py-3 text-[14px]"
            >
              More
              <ChevronDown
                size={16}
                className="transition-transform duration-200 group-hover:rotate-180"
              />
            </button>
            <div className="invisible absolute right-0 top-full pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              {/* <ul className="min-w-[160px] rounded-md border border-grayy bg-white py-2 shadow-lg">
                {SECONDARY_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="block whitespace-nowrap px-4 py-2 text-sm transition-colors hover:bg-grayy hover:text-bluee"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul> */}
            </div>
          </div>

          {/* Language dropdown (desktop) */}
    

          {/* Search */}
          <button
        type="button"
        aria-label="Search"
        onClick={() => setSearchOpen(true)}
        className="transition-colors hover:text-bluee"
      >
        <Search size={20} />
      </button>

      <SearchDrawer open={searchOpen} onClose={() => setSearchOpen(false)} />
    

          {/* Contact button (desktop) - now bluee */}
          <Link
            href="/contact/"
            className="hidden whitespace-nowrap rounded-md bg-bluee px-5 py-3 text-[14px] font-medium text-white transition-colors hover:bg-blackk xl:inline-block 2xl:px-6 2xl:text-[15px]"
          >
            Contact us
          </Link>

          {/* Hamburger (below xl) */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
            className="xl:hidden"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="max-h-[80vh] overflow-y-auto border-t border-grayy bg-white px-5 pb-6 xl:hidden">
          <ul>
            {NAV_LINKS.map((item) => (
              <li key={item.label} className="border-b border-grayy">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleMobileItem(item.label)}
                      className="flex w-full items-center justify-between py-3.5 text-[15px]"
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          openMobileItem === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openMobileItem === item.label && (
                      <ul className="pb-3 pl-4">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={closeMobileMenu}
                              className="block py-2 text-sm text-blackk/80 hover:text-bluee"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="block py-3.5 text-[15px]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}

            {/* Secondary links */}
            {SECONDARY_LINKS.map((link) => (
              <li key={link.label} className="border-b border-grayy">
                <Link
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block py-3.5 text-[15px]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact button (mobile) - now bluee */}
          <Link
            href="/contact/"
            onClick={closeMobileMenu}
            className="mt-5 block rounded-md bg-bluee py-3 text-center text-[15px] font-medium text-white"
          >
            Contact us
          </Link>

          {/* Contact info + language */}
          <div className="mt-5 space-y-3 text-sm">
            <a href="mailto:info@nexis.in" className="flex items-center gap-2">
              <Mail size={16} />
              info@nexis.in
            </a>
            <a href="tel:+919999043311" className="flex items-center gap-2">
              <Phone size={16} />
              +91-99990 43311
            </a>
            <div className="flex gap-2 pt-1">
              {LANGUAGES.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLanguage(code)}
                  className={`rounded border px-3 py-1 text-xs font-semibold ${
                    language === code
                      ? "border-yelloww bg-yelloww text-blackk"
                      : "border-blackk/30"
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}