import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ModernBackground } from "@/components/ModernBackground";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "KAZE — AI & Software Engineer",
  description: "MSCS student at Northwestern University focused on AI, backend systems, and cloud applications.",
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />
      </head>
      <body className="noise-bg min-h-screen">
        <TooltipProvider>
          <ModernBackground />
          <Navbar />
          <main className="relative z-10 pt-20">
            {children}
          </main>
        </TooltipProvider>
        <Analytics />
      </body>
    </html>
  );
}
