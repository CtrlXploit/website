import GlitchText from "@/components/GlitchText";
import { Shield, Users, School } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full max-w-6xl text-center flex flex-col items-center">
      {/* Hero Section */}
      <div className="min-h-[80vh] flex flex-col justify-center items-center w-full relative overflow-hidden">
        <div className="relative z-10">
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="whitespace-nowrap mb-8"
          >
            Infosec
          </GlitchText>
          <div className="rounded-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">
              @Cyberlabs IIT (ISM) Dhanbad
            </h2>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
              Information Security division of Cyberlabs IIT (ISM) Dhanbad. We
              organize workshops, host events, and participate in various CTF
              competitions to spread and enhance our skills and knowledge in the
              field of information security.
            </p>
            <p className="mt-6 text-foreground/80">Join us!</p>
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
    </div>
  );
}
