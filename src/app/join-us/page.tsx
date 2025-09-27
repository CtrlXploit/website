import GlitchText from "@/components/GlitchText";
import { Calendar, Users, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function JoinUs() {
  return (
    <div className="w-full max-w-6xl text-center flex flex-col items-center">
      {/* Join Us Section */}
      <div className="min-h-[80vh] flex flex-col justify-center items-center w-full relative overflow-hidden">
        <div className="relative z-10">
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="whitespace-nowrap"
          >
            Join Us
          </GlitchText>
          <div className="rounded-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-4">
              Winter of Code @ Cyberlabs
            </h2>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
              Winter of Code is a{" "}
              <span className="font-semibold">one-month long hackathon</span>{" "}
              held every December by Cyberlabs. It is{" "}
              <span className="font-semibold">
                exclusively for first-year students of IIT (ISM) Dhanbad
              </span>
              , providing the perfect opportunity to dive into open source,
              learn new skills, and work on exciting projects.
            </p>

            <p className="mt-6 text-foreground/80">
              Be part of the community and start your journey with us!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="https://woc.cyberlabs.club/"
                target="_blank"
                className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm hover:bg-primary/20 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                Winter of Code Website
              </Link>
              <Link
                href="https://discord.gg/sMtk8ePEJB"
                target="_blank"
                className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm hover:bg-primary/20 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Join our Discord
              </Link>
              <Link
                href="/"
                className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm hover:bg-primary/20 transition-colors"
              >
                <Users className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
