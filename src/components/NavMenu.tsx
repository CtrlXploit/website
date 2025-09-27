"use client";

import Link from "next/link";
import { useEffect } from "react";

interface navProps {
  onClose: () => void;
}

const mainNav = [
  { label: "About", href: "/about" },
  { label: "Join Us", href: "#" },
  { label: "Events", href: "/events" },
  { label: "Achievements", href: "#" },
];

const secondaryNav = [
  { label: "Projects", href: "/projects" },
  { label: "Wargames", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "#" },
];

export function NavMenu({ onClose }: navProps) {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 animate-in fade-in-0 backdrop-blur-md"
      style={
        {
          "--bg-color": "#000000",
          "--text-color-primary": "#ffffff",
          "--text-color-secondary": "#b9bbbe",
          "--accent-color": "#5865f2",
          "--border-color": "#202225",
          "--font-main-right":
            '"Hubot Sans", "Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
          "--font-main-left":
            '"Blimone", "Hubot Sans", "Mona Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        } as React.CSSProperties
      }
    >
      <div className="hidden md:block absolute top-0 left-10 h-full w-px bg-[var(--border-color)] z-[2]" />
      <div className="h-full w-full grid grid-rows-[auto_1fr_auto] text-[var(--text-color-primary)] bg-black/80 backdrop-blur-xl">
        <header className="grid-cols-full flex justify-between items-center py-5 px-10 md:px-16 border-b border-[var(--border-color)]">
          <Link
            href="/"
            onClick={onClose}
            className="text-lg sm:text-xl relative pl-4 font-medium transition-transform duration-300 ease-in-out hover:scale-105 group"
            style={{ fontFamily: "var(--font-main-right)" }}
          >
            {/* <sup className="text-2xl sm:text-3xl md:text-4xl font-thin absolute -top-3 left-0 text-[var(--text-color-secondary)] transition-colors duration-300 ease-in-out group-hover:text-[var(--accent-color)]"></sup> */}
            CtrlXploit
          </Link>
          <button
            onClick={onClose}
            className="text-2xl sm:text-3xl md:text-4xl font-thin text-[var(--text-color-secondary)] transition-colors duration-300 ease-in-out hover:text-[var(--accent-color)] hover:rotate-90"
          >
            X
          </button>
        </header>

        <div className="flex-1 grid md:grid-cols-[1.2fr_1fr] grid-cols-1 overflow-y-auto relative">
          {/* Horizontal line across both sections on desktop */}
          <div className="hidden md:block absolute top-[6.5rem] left-0 right-0 h-[1px] bg-[var(--border-color)] z-10"></div>

          <main className="md:border-r border-b md:border-b-0 border-[var(--border-color)] py-14 px-10 md:px-16 flex flex-col transition-colors duration-300">
            <h2 className="text-xs font-medium text-[var(--text-color-secondary)] tracking-[0.12em] uppercase mb-16 relative after:content-[''] after:absolute after:bottom-[-1rem] after:left-0 after:w-[50px] after:h-[2px] after:bg-[var(--accent-color)] hover:after:w-[100px] after:transition-all after:duration-300">
              Main
            </h2>
            <nav>
              <ul className="group">
                {mainNav.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="inline-block relative mb-5 pb-2 text-[32px] sm:text-[40px] md:text-[52px] font-normal uppercase tracking-tighter leading-tight text-white opacity-90 transition-all duration-300 group-hover:opacity-30 hover:!opacity-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[var(--accent-color)] after:transition-all after:duration-300 hover:after:w-full"
                      style={{
                        fontFamily: "var(--font-main-left)",
                        fontFeatureSettings: '"liga", "ss02"',
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </main>
          <aside className="py-14 px-10 md:px-16 transition-colors duration-300">
            <header className="flex justify-between items-center mb-8">
              <h2 className="text-xs font-medium text-[var(--text-color-secondary)] tracking-[0.12em] uppercase relative after:content-[''] after:absolute after:bottom-[-1rem] after:left-0 after:w-[50px] after:h-[2px] after:bg-[var(--accent-color)] hover:after:w-[100px] after:transition-all after:duration-300">
                More
              </h2>
            </header>
            <nav>
              <ul className="relative group">
                {secondaryNav.map((topic) => (
                  <li
                    key={topic.label}
                    className="relative after:content-[''] after:absolute after:bottom-0 after:left-[-2.5rem] md:after:left-[-4rem] after:right-[-2.5rem] md:after:right-[-4rem] after:h-[1px] after:bg-[var(--border-color)] last:after:hidden"
                  >
                    <Link
                      href={topic.href}
                      onClick={onClose}
                      className="block py-7 text-lg sm:text-xl md:text-2xl font-normal text-[var(--text-color-primary)] opacity-90 transition-all duration-300 group-hover:opacity-30 hover:!opacity-100"
                    >
                      {topic.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>

        <footer className="flex items-center gap-5 py-5 px-10 md:px-16 border-t border-[var(--border-color)] text-xs tracking-[0.12em] text-[var(--text-color-secondary)] font-medium uppercase" />
      </div>
    </div>
  );
}
