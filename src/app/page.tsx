import GlitchText from "@/components/GlitchText";
import { AnimatedText } from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Users,
  Code,
  Trophy,
  Calendar,
  MessageCircle,
  Star,
  School,
} from "lucide-react";

export default function Home() {
  return (
    <div className="w-full max-w-6xl text-center flex flex-col items-center">
      {/* Hero Section */}
      <div className="h-screen flex flex-col justify-center items-center w-full relative overflow-hidden">
        <div className="relative z-10">
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="whitespace-nowrap mb-8"
          >
            Infosec
          </GlitchText>
          <div className="glass rounded-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">
              @Cyberlabs IIT (ISM) Dhanbad
            </h2>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
              Information Security division of Cyberlabs IIT (ISM) Dhanbad. We
              are a team of passionate individuals dedicated to exploring the
              realms of cybersecurity.
              <br />
              <br />
              Join us as we delve into the world of vulnerabilities, exploits,
              and digital defense strategies, fostering a culture of security
              awareness and innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm glass-subtle">
                <Shield className="w-4 h-4" />
                Information Security
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm glass-subtle">
                <Users className="w-4 h-4" />
                Cyberlabs
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm glass-subtle">
                <School className="w-4 h-4" />
                IIT (ISM) Dhanbad
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      {/* <div className="min-h-screen flex flex-col justify-center items-center w-full py-16 px-8">
        <div className="glass rounded-xl p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">About Us</h2>
          <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
            We are the Information Security Division of CyberLabs, dedicated to mastering the art and science of cybersecurity. Our team actively participates in Capture The Flag (CTF) competitions and bug bounty programs, where we learn, exploit, and defend systems. Beyond competing, we focus on both offensive and defensive security practices—hacking ethically to understand vulnerabilities and protecting systems to safeguard digital assets. Every year, we also host a global CTF, fostering collaboration and knowledge sharing within the cybersecurity community.
          </p>
        </div>
      </div> */}
    </div>
  );
}
