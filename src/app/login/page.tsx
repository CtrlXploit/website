"use client";

import GlitchText from "@/components/GlitchText";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Login() {
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const fakeEmail = `${username}@infosec.org`;

    const { error } = await supabase.auth.signInWithPassword({
      email: fakeEmail,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = "/admin";
    }
  };

  return (
    <div className="w-full max-w-6xl text-center flex flex-col items-center">
      <div className="min-h-[80vh] flex flex-col justify-center items-center w-full relative overflow-hidden">
        <div className="relative z-10">
          <GlitchText
            speed={1}
            enableShadows={true}
            enableOnHover={true}
            className="whitespace-nowrap"
          >
            Login
          </GlitchText>

          <div className="rounded-xl p-8 max-w-md mx-auto bg-border backdrop-blur-sm shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-primary mb-6">
              Welcome Back
            </h2>

            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4 text-left"
            >
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-secondary bg-background focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full bg-primary/90 text-white py-2 rounded-lg font-semibold text-sm hover:bg-primary transition-colors disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            {error && (
              <p className="mt-4 text-sm text-red-500 font-medium">{error}</p>
            )}

            <div className="mt-6 text-sm text-foreground/70">
              <Link href="/" className="text-primary hover:underline">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
