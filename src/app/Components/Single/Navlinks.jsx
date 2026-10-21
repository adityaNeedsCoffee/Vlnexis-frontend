import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Key Services", href: "/services-provided" },
 

];

const Navlinks = () => {
  return (
    <nav className="hidden items-center gap-4 xl:flex 2xl:gap-7">
      {NAV_LINKS.map((item) => (
        <div key={item.label} className="group relative">
          <Link
            href={item.href}
            className="flex items-center gap-1 whitespace-nowrap py-3 text-[14px] font-medium transition-colors group-hover:text-nocturnal group-focus-within:text-nocturnal 2xl:text-[15px]"
          >
            {item.label}
            {item.children && (
              <ChevronDown
                size={16}
                className="shrink-0 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
              />
            )}
          </Link>

          {/* pt-5 = link aur panel ke beech gap (hover bhi isi se bridge hota hai) */}
          {item.children && (
            <div
              className="invisible absolute left-0 top-full z-50 origin-top-left translate-y-4 scale-95 pt-5 opacity-0
                         transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                         group-hover:visible group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100
                         group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100"
            >
              {/* Notch: pt-5 (20px) ke hisaab se top-[14px] */}
              <span className="absolute left-6 top-[14px] h-3 w-3 rotate-45 rounded-[2px] border-l border-t border-mystic bg-white" />

              <ul className="relative min-w-[220px] overflow-hidden rounded-lg border border-mystic bg-white py-2 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.18)]">
                {item.children.map((child, i) => (
                  <li key={child.label}>
                    <Link
                      href={child.href}
                      style={{ transitionDelay: `${i * 40}ms` }}
                      className="group/item relative flex items-center whitespace-nowrap px-5 py-2.5 text-sm text-gray-700 transition-all duration-200 hover:bg-arctic hover:pl-6 hover:text-nocturnal"
                    >
                      <span className="absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-r bg-nocturnal transition-all duration-200 group-hover/item:h-5" />
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Navlinks;