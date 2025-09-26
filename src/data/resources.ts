export interface Resource {
  title: string;
  description: string;
  link: string;
  category: string;
  //   color?: string; // optional Tailwind color for category
}

export const resources: Resource[] = [
  {
    title: "Introduction to Ethical Hacking/Pentesting",
    description: "Getting started with cybersecurity.",
    link: "https://resources.cyberlabs.club/security",
    category: "Guide",
    //     color: "text-rose-400",
  },
  {
    title: "OverTheWire Bandit",
    description: "Wargame for beginners to learn Linux and security concepts.",
    link: "https://overthewire.org/wargames/bandit/",
    category: "Wargame",
    //     color: "text-emerald-400",
  },
  {
    title: "picoCTF",
    description:
      "Beginner-friendly CTF platform by Carnegie Mellon University.",
    link: "https://play.picoctf.org/practice",
    category: "CTF",
    //     color: "text-purple-400",
  },
  {
    title: "TryHackMe",
    description:
      "Online platform to learn cyber security through hands-on labs and exercises",
    link: "https://tryhackme.com/",
    category: "CTF",
    //     color: "text-amber-400",
  },
  {
    title: "CTF Handboook",
    description: "Comprehensive guide to Capture The Flag (CTF) competitions.",
    link: "https://ctf101.org/",
    category: "Guide",
    //     color: "text-sky-400",
  },
];
