import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Fira_Code } from "next/font/google";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  title: "Infosec",
  description: "Information Security division of Cyberlabs IIT (ISM) Dhanbad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Hubot+Sans:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${firaCode.variable} font-mono antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="relative flex flex-1 flex-col items-center justify-center p-4">
          {children}
        </main>
        <Footer />
        <Toaster />
	<Analytics />
	<SpeedInsights />
      </body>
    </html>
  );
}
