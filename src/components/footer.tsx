import Link from "next/link";

const footerNav = [
  { label: "ABOUT", href: "/about" },
  { label: "EVENTS", href: "/events" },
  { label: "BLOG", href: "/blog" },
  { label: "PROJECTS", href: "/projects" },
  { label: "RESOURCES", href: "/resources" },
  { label: "ACHIEVEMENTS", href: "/achievements" },
  { label: "ANNOUNCEMENTS", href: "/announcements" },
  { label: "WARGAMES", href: "/wargames" },
];

export function Footer() {
  return (
    <footer className="w-full mt-32 pb-10">
      <div className="max-w-[90rem] mx-auto px-6 md:px-10">
        
        {/* Top links layout similar to screenshot 5 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 font-mono text-xs uppercase tracking-widest text-foreground/80">
          {footerNav.map((item) => (
             <Link key={item.href} href={item.href} className="hover:text-primary transition-colors duration-200">
               {item.label}
             </Link>
          ))}
        </div>

        {/* Huge bottom text & small secondary links */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
          <h1 className="font-mono text-[4rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] leading-none font-bold text-foreground tracking-tighter">
            Infosec
          </h1>
          
          <div className="flex md:flex-col items-end gap-6 font-mono text-xs uppercase tracking-widest text-foreground/80 mb-4 md:mb-12">
            <Link href="https://github.com/CyberLabs-Infosec/" className="hover:text-primary">GITHUB</Link>
            <Link href="https://discord.gg/sMtk8ePEJB" className="hover:text-primary">DISCORD</Link>
            <Link href="https://pearlctf.in/" className="hover:text-primary">PEARL CTF</Link>
            <span className="text-foreground/40 mt-4 md:mt-12">&copy;{new Date().getFullYear()}</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
