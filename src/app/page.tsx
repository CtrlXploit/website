import GlitchText from "@/components/GlitchText";
import { AnimatedText } from "@/components/AnimatedText";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Shield, Users, Code, Trophy, Calendar, MessageCircle, Star } from "lucide-react";

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
            INFOSEC ISM
          </GlitchText>
          <div className="glass rounded-xl p-8 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
              The official cybersecurity division of <span className="text-primary font-semibold">Cyberlabs</span>, 
              the Data and Software Technology club of <span className="text-primary font-semibold">IIT (ISM) Dhanbad</span>.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm glass-subtle">
                <Shield className="w-4 h-4" />
                Cybersecurity
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm glass-subtle">
                <Users className="w-4 h-4" />
                Elite Team
              </div>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm glass-subtle">
                <Code className="w-4 h-4" />
                CTF Masters
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full space-y-24">
        {/* Discord-style Status Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-lg p-6 hover:glass-strong transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium text-sm">ACTIVE</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">30+ Members</h3>
            <p className="text-muted-foreground">Passionate cybersecurity enthusiasts</p>
          </div>
          
          <div className="glass rounded-lg p-6 hover:glass-strong transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <span className="text-yellow-400 font-medium text-sm">COMPETING</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Top 10 Ranking</h3>
            <p className="text-muted-foreground">National CTF competitions</p>
          </div>
          
          <div className="glass rounded-lg p-6 hover:glass-strong transition-all duration-300 hover:scale-105">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-primary font-medium text-sm">ONLINE</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">24/7 Learning</h3>
            <p className="text-muted-foreground">Continuous skill development</p>
          </div>
        </section>

        {/* About Section */}
        <section className="text-center">
          <AnimatedText as="h2" className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Who We Are
          </AnimatedText>
          <div className="glass rounded-xl p-8">
            <p className="text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto leading-relaxed">
              Infosec ISM is a collective of passionate cybersecurity enthusiasts dedicated to exploring the depths of digital security. 
              We are <span className="text-primary font-semibold">hackers</span>, <span className="text-primary font-semibold">researchers</span>, and <span className="text-primary font-semibold">builders</span>, 
              united by a common goal: to push the boundaries of knowledge and secure the digital world.
            </p>
          </div>
        </section>

        {/* Achievements Section */}
        <section>
          <AnimatedText as="h2" className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Our Achievements
          </AnimatedText>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="glass rounded-xl p-6 hover:glass-strong transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-8 h-8 text-yellow-400 group-hover:animate-bounce" />
                <h3 className="text-2xl font-bold">CTF Wins</h3>
              </div>
              <p className="text-muted-foreground">Consistently ranked among the top teams in national and international Capture The Flag competitions.</p>
              <div className="flex items-center gap-2 mt-4">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-primary font-medium">25+ Competitions Won</span>
              </div>
            </div>
            
            <div className="glass rounded-xl p-6 hover:glass-strong transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-primary group-hover:animate-pulse" />
                <h3 className="text-2xl font-bold">Security Research</h3>
              </div>
              <p className="text-muted-foreground">Published research on novel vulnerabilities and contributed to open-source security tools.</p>
              <div className="flex items-center gap-2 mt-4">
                <Code className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">10+ Research Papers</span>
              </div>
            </div>
            
            <div className="glass rounded-xl p-6 hover:glass-strong transition-all duration-300 hover:scale-105 group">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-green-400 group-hover:animate-pulse" />
                <h3 className="text-2xl font-bold">Industry Collaborations</h3>
              </div>
              <p className="text-muted-foreground">Partnered with leading tech companies to conduct security audits and workshops.</p>
              <div className="flex items-center gap-2 mt-4">
                <MessageCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-primary font-medium">50+ Partnerships</span>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events - Discord Channel Style */}
        <section>
          <AnimatedText as="h2" className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Upcoming Events
          </AnimatedText>
          <div className="glass rounded-xl p-8 max-w-4xl mx-auto hover:glass-strong transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-400 rounded-xl flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-3xl font-bold">Cyber O-Week</h3>
                    <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">LIVE</div>
                  </div>
                  <p className="text-muted-foreground text-lg">Our annual flagship event with workshops, talks and a 24-hr CTF competition.</p>
                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1 text-primary">
                      <Users className="w-4 h-4" />
                      200+ Participants
                    </span>
                    <span className="flex items-center gap-1 text-green-400">
                      <Shield className="w-4 h-4" />
                      24h Duration
                    </span>
                  </div>
                </div>
              </div>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="#" className="flex items-center gap-2">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Explore More - Discord Server Channels Style */}
        <section className="pb-24">
          <AnimatedText as="h2" className="text-4xl md:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Explore More
          </AnimatedText>
          <div className="glass-subtle rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Link href="#" className="group flex flex-col items-center gap-3 p-4 rounded-lg hover:glass transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform glass-subtle">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-medium text-foreground group-hover:text-primary transition-colors"># projects</span>
              </Link>
              
              <Link href="#" className="group flex flex-col items-center gap-3 p-4 rounded-lg hover:glass transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform glass-subtle">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-medium text-foreground group-hover:text-primary transition-colors"># wargames</span>
              </Link>
              
              <Link href="#" className="group flex flex-col items-center gap-3 p-4 rounded-lg hover:glass transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform glass-subtle">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-medium text-foreground group-hover:text-primary transition-colors"># blog</span>
              </Link>
              
              <Link href="#" className="group flex flex-col items-center gap-3 p-4 rounded-lg hover:glass transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform glass-subtle">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-medium text-foreground group-hover:text-primary transition-colors"># join-us</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
