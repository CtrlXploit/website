import Link from "next/link";
import { Github } from "lucide-react";
import { LiaDiscord } from "react-icons/lia";

const footerNav = [
  { label: "About", href: "/about" },
  { label: "Events", href: "/events" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Resources", href: "/resources" },
  { label: "Achievements", href: "/achievements" },
  { label: "Join Us", href: "/join-us" },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {/* Column 1: Wordmark + Tagline */}
        <div>
          <Link
            href="/"
            className="font-mono text-sm font-medium tracking-[0.15em] uppercase text-foreground"
          >
            INFOSEC
          </Link>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
            Information Security division of Cyberlabs, IIT&nbsp;(ISM)
            Dhanbad. We break things to understand&nbsp;them.
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Navigate
          </h4>
          <ul className="space-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/60 hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Connect */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
            Connect
          </h4>
          <div className="flex flex-col gap-3">
            <Link
              href="https://github.com/CyberLabs-Infosec/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors duration-200"
            >
              <Github className="h-4 w-4" />
              GitHub
            </Link>
            <Link
              href="https://discord.gg/sMtk8ePEJB"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors duration-200"
            >
              <LiaDiscord className="h-4 w-4" />
              Discord
            </Link>
            <Link
              href="https://pearlctf.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors duration-200"
            >
              <span className="font-mono text-xs">CTF</span>
              Pearl CTF
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} Infosec @ Cyberlabs
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            IIT (ISM) Dhanbad
          </p>
        </div>
      </div>
    </footer>
  );
}
