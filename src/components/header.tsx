"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NavMenu } from "@/components/NavMenu";

const navLinks = [
  { label: "ABOUT", href: "/about" },
  { label: "EVENTS", href: "/events" },
  { label: "BLOG", href: "/blog" },
  { label: "PROJECTS", href: "/projects" },
  { label: "RESOURCES", href: "/resources" },
  { label: "WARGAMES", href: "/wargames" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-24 flex items-start pt-8 justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 font-mono text-base font-medium tracking-[0.1em] text-foreground hover:opacity-70 transition-opacity duration-200"
          >
            {/* Minimalist Icon mimicking screenshot 1 */}
            <div className="flex flex-wrap w-[18px] h-[18px] gap-[2px]">
              <div className="w-[8px] h-[8px] bg-foreground" />
              <div className="w-[8px] h-[8px] bg-foreground" />
              <div className="w-[8px] h-[8px] bg-foreground" />
            </div>
            INFOSEC
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-col items-start gap-3 mt-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-mono uppercase tracking-widest transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:block">
            {/* Top Right Action icon, e.g. an arrow or login */}
            <Link href="/join-us" className="text-foreground hover:opacity-70">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center mt-1">
            <button
              className="p-1 text-foreground hover:opacity-70"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>
      </header>

      {isMenuOpen && <NavMenu onClose={() => setIsMenuOpen(false)} />}
    </>
  );
}
