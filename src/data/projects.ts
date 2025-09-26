export interface Project {
  id: number;
  name: string;
  shortDetail: string;
  imageUrl: string;
  githubUrl: string;
  liveDemo?: string;
  technologies: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    name: "CtrlXploit Security Platform",
    shortDetail: "A comprehensive cybersecurity platform for vulnerability assessment and penetration testing with advanced reporting capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    githubUrl: "https://github.com/CtrlXploit/security-platform",
    liveDemo: "https://security-platform.ctrlxploit.com",
    technologies: ["React", "Node.js", "MongoDB", "Docker"],
  },
  {
    id: 2,
    name: "Web Vulnerability Scanner",
    shortDetail: "An automated web application security scanner that identifies OWASP Top 10 vulnerabilities and provides detailed remediation guidance.",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2134&q=80",
    githubUrl: "https://github.com/CtrlXploit/web-scanner",
    liveDemo: "https://scanner.ctrlxploit.com",
    technologies: ["Python", "Flask", "SQLite", "BeautifulSoup"],
  },
  {
    id: 3,
    name: "CTF Challenge Framework",
    shortDetail: "A dynamic platform for creating, hosting, and managing Capture The Flag competitions with real-time scoring and leaderboards.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    githubUrl: "https://github.com/CtrlXploit/ctf-framework",
    technologies: ["Next.js", "PostgreSQL", "Redis", "Docker"]
  },
  {
    id: 4,
    name: "Network Security Toolkit",
    shortDetail: "Command-line tools for network reconnaissance, port scanning, and traffic analysis with customizable reporting features.",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2125&q=80",
    githubUrl: "https://github.com/CtrlXploit/network-toolkit",
    technologies: ["Go", "Bash", "Wireshark", "Nmap"]
  },
  {
    id: 5,
    name: "Cryptographic Hash Analyzer",
    shortDetail: "A tool for analyzing and cracking various hash algorithms with dictionary and brute-force attack capabilities.",
    imageUrl: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    githubUrl: "https://github.com/CtrlXploit/hash-analyzer",
    liveDemo: "https://hash-analyzer.ctrlxploit.com",
    technologies: ["C++", "OpenSSL", "Qt", "CMake"]
  },
  {
    id: 6,
    name: "Social Engineering Toolkit",
    shortDetail: "Educational platform demonstrating social engineering techniques and helping organizations train their employees against such attacks.",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    githubUrl: "https://github.com/CtrlXploit/social-eng-toolkit",
    technologies: ["Python", "Django", "JavaScript", "Bootstrap"]
  }
];