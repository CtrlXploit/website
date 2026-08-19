"use client";

import Link from "next/link";
import { useEffect } from "react";

interface navProps {
  onClose: () => void;
}

const mainNav = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Join Us", href: "/join-us" },
];

const secondaryNav = [
  { label: "Projects", href: "/projects" },
  { label: "Wargames", href: "/wargames" },
  { label: "Resources", href: "/resources" },
  { label: "Achievements", href: "/achievements" },
  { label: "Announcements", href: "/announcements" },
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
    <div className="fixed inset-0 z-50 bg-[hsl(240_6%_4%/0.95)] backdrop-blur-xl animate-fade-in">
      <div className="h-full w-full grid grid-rows-[auto_1fr_auto] text-foreground">
        {/* Header */}
        <header className="flex justify-between items-center py-5 px-6 md:px-10 border-b border-border">
          <Link
            href="/"
            onClick={onClose}
            className="font-mono text-sm font-medium tracking-[0.15em] uppercase hover:text-primary transition-colors duration-200"
          >
            INFOSEC
          </Link>
          <button
            onClick={onClose}
            className="text-2xl font-light text-muted-foreground transition-all duration-300 hover:text-primary hover:rotate-90"
            aria-label="Close menu"
          >
            ✕
          </button>
        </header>

        {/* Navigation */}
        <div className="flex-1 grid md:grid-cols-[1.2fr_1fr] grid-cols-1 overflow-y-auto">
          {/* Main Nav */}
          <main className="md:border-r border-b md:border-b-0 border-border py-14 px-6 md:px-10 flex flex-col">
            <h2 className="eyebrow mb-12 relative after:content-[''] after:absolute after:bottom-[-0.75rem] after:left-0 after:w-[40px] after:h-[1px] after:bg-primary">
              Navigate
            </h2>
            <nav>
              <ul className="group">
                {mainNav.map((item) => (
                  <li key={typeof item.label === 'string' ? item.label : 'nav'}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="inline-block relative mb-4 pb-2 text-[32px] sm:text-[40px] md:text-[52px] font-display italic leading-tight text-foreground opacity-90 transition-all duration-300 group-hover:opacity-30 hover:!opacity-100 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </main>

          {/* Secondary Nav */}
          <aside className="py-14 px-6 md:px-10">
            <h2 className="eyebrow mb-8 relative after:content-[''] after:absolute after:bottom-[-0.75rem] after:left-0 after:w-[40px] after:h-[1px] after:bg-primary">
              More
            </h2>
            <nav>
              <ul className="group">
                {secondaryNav.map((topic) => (
                  <li
                    key={topic.label}
                    className="border-b border-border last:border-b-0"
                  >
                    <Link
                      href={topic.href}
                      onClick={onClose}
                      className="block py-5 text-lg sm:text-xl md:text-2xl font-sans text-foreground opacity-90 transition-all duration-300 group-hover:opacity-30 hover:!opacity-100 hover:text-primary"
                    >
                      {topic.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>

        {/* Footer */}
        <footer className="flex items-center gap-5 py-4 px-6 md:px-10 border-t border-border">
          <span className="font-mono text-xs text-muted-foreground tracking-wider">
            Cyberlabs, IIT (ISM) Dhanbad
          </span>
        </footer>
      </div>
    </div>
  );
}
