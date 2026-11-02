"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Menu, X, Mail, Phone } from "lucide-react";
import Navlinks, { NAV_LINKS } from "./Navlinks";
import Image from "next/image";
import SearchDrawer from "./SearchDrawer";
import { assetPath } from "../../../../libs/assetPath";
import MobileDrawer from "./MobileDrawer"; // NEW: slide-in mobile menu (adjust the path if the file lives elsewhere)

const LANGUAGES = ["EN"];



export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileItem, setOpenMobileItem] = useState(null);
  const [language, setLanguage] = useState("EN");
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleMobileItem = (label) =>
    setOpenMobileItem((current) => (current === label ? null : label));

  // useCallback keeps this function the same between renders. MobileDrawer has it in a useEffect
  // dependency list, so without this the drawer's focus / scroll-lock effect would re-run on every Navbar render.
  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    setOpenMobileItem(null);
  }, []);

  return (
    <>
    <header className="md:sticky top-0 z-50 w-full bg-white text-blackk shadow-sm">
      {/* Single row: logo + links on the left, utilities on the right */}
      <div className=" flex items-center py-3 px-5 xl:px-8 2xl:px-12">
        {/* Logo (swap with <Image /> when you have the file) */}
        <Link
  href="/"
  className="flex shrink-0 items-center"
  onClick={closeMobileMenu}
>
  <Image
  src={assetPath("/HomePageImages/vlnexisLogo.png")}
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

          {/* Hamburger (below xl): opens the drawer. The drawer has its own close button. */}
          <button
            type="button"
            aria-label="Open menu"
            aria-controls="mobile-drawer"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
            className="xl:hidden"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>
    </header>

    {/* Mobile drawer: placed outside <header> so the sticky header can never trap it inside its own stacking layer */}
    <MobileDrawer open={mobileOpen} onClose={closeMobileMenu} />
    </>
  );
}