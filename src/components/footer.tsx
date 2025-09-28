import Link from "next/link";
import { Github } from "lucide-react";
import { LiaDiscord } from "react-icons/lia";

export function Footer() {
  return (
    <footer className="w-full mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 px-4 py-8">
        <p className="text-muted-foreground text-sm">
          &copy; {new Date().getFullYear()} Infosec@Cyberlabs.
        </p>
        <div className="flex gap-6">
          <Link
            href="/announcements"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Announcements
          </Link>
          <Link
            href="https://github.com/CyberLabs-Infosec/"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://discord.gg/sMtk8ePEJB"
            className="text-muted-foreground"
          >
            <LiaDiscord className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            <span className="sr-only">Discord</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
