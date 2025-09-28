import GlitchText from "@/components/GlitchText";
import {
  Users,
  BookOpen,
  FolderOpen,
  FileText,
  Megaphone,
  Shield,
} from "lucide-react";
import Link from "next/link";

export default function Admin() {
  return (
    <div className="w-full max-w-6xl text-center flex flex-col items-center">
      {/* Admin Dashboard Section */}
      <div className="min-h-[80vh] flex flex-col justify-center items-center w-full relative overflow-hidden">
        <div className="relative z-10">
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="whitespace-nowrap"
          >
            Admin
          </GlitchText>
          <div className="rounded-xl p-4 max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8">
              Hi! Think twice before making any changes on here :(
            </p>

            {/* Admin Navigation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              <Link
                href="/admin/resources"
                className="flex flex-col items-center gap-3 bg-primary/10 text-primary p-6 rounded-xl hover:bg-primary/20 transition-colors group"
              >
                <BookOpen className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Resources</span>
              </Link>

              <Link
                href="/admin/projects"
                className="flex flex-col items-center gap-3 bg-primary/10 text-primary p-6 rounded-xl hover:bg-primary/20 transition-colors group"
              >
                <FolderOpen className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Projects</span>
              </Link>

              <Link
                href="/admin/blogs"
                className="flex flex-col items-center gap-3 bg-primary/10 text-primary p-6 rounded-xl hover:bg-primary/20 transition-colors group"
              >
                <FileText className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Blogs</span>
              </Link>

              <Link
                href="/admin/announcements"
                className="flex flex-col items-center gap-3 bg-primary/10 text-primary p-6 rounded-xl hover:bg-primary/20 transition-colors group"
              >
                <Megaphone className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Announcements</span>
              </Link>

              <Link
                href="/"
                className="flex flex-col items-center gap-3 bg-primary/10 text-primary p-6 rounded-xl hover:bg-primary/20 transition-colors group"
              >
                <Shield className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Back to Home</span>
              </Link>

              <Link
                href="/admin/members"
                className="flex flex-col items-center gap-3 bg-primary/10 text-primary p-6 rounded-xl hover:bg-primary/20 transition-colors group"
              >
                <Users className="w-8 h-8 group-hover:scale-110 transition-transform" />
                <span className="font-semibold">Members (superadmins)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
