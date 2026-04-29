"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Globe, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-20 items-start">
        
        {/* Left Side: Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.4em] text-primary mb-8">Journal // Profile</p>
          <h1 className="text-display text-5xl md:text-7xl mb-12 leading-[1.1]">
            Blending <span className="italic">logic</span> <br />
            with human <span className="text-primary/80">intuition.</span>
          </h1>

          <div className="space-y-8 text-foreground/70 text-lg leading-relaxed font-sans max-w-xl">
            <p>
              I am Li Jiadong (Kaze), a computer science student and software architect 
              currently pursuing my Master's at Northwestern University. My work lives 
              at the intersection of high-performance infrastructure and intelligent 
              systems.
            </p>
            <p>
              I believe that the best software is not just functional, but visceral. 
              Whether I'm optimizing a 3D scan processing pipeline or building 
              cloud-native telemetry systems, my focus is always on creating 
              meaningful connections between data and the people who use it.
            </p>
            <p>
              Beyond the terminal, I am an observer of light and form. Photography 
              and digital art are my ways of deconstructing the world, much like how 
              I deconstruct complex engineering problems.
            </p>
          </div>

          <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap gap-4">
             <Button render={<a href="mailto:contact@kaze.studio" />} nativeButton={false} variant="ghost" className="rounded-full group hover:bg-primary/5">
                <span className="flex items-center gap-2">
                   <Mail className="w-4 h-4" />
                   Email
                   <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </span>
             </Button>
             <Button render={<a href="https://github.com" target="_blank" />} nativeButton={false} variant="ghost" className="rounded-full group hover:bg-primary/5">
                <span className="flex items-center gap-2">
                   <Github className="w-4 h-4" />
                   GitHub
                   <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </span>
             </Button>
             <Button render={<a href="https://linkedin.com" target="_blank" />} nativeButton={false} variant="ghost" className="rounded-full group hover:bg-primary/5">
                <span className="flex items-center gap-2">
                   <Linkedin className="w-4 h-4" />
                   LinkedIn
                   <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                </span>
             </Button>
          </div>
        </motion.div>

        {/* Right Side: Visual Meta */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-32"
        >
          <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden glass-panel p-3">
             <div className="w-full h-full rounded-[3rem] overflow-hidden relative">
                {/* Simulated Profile Image Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent z-10" />
                <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <span className="text-display text-9xl opacity-10 select-none">K</span>
                </div>
                
                {/* Meta Info Overlay */}
                <div className="absolute bottom-12 left-12 z-20">
                   <p className="text-white font-display text-3xl mb-1">Li Jiadong</p>
                   <p className="text-white/60 font-mono text-[10px] uppercase tracking-[0.3em]">Architect // Researcher</p>
                </div>
             </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6">
             <div className="p-8 rounded-3xl glass-card text-center">
                <p className="text-3xl font-display text-primary mb-1">2026</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">Expected MSCS</p>
             </div>
             <div className="p-8 rounded-3xl glass-card text-center">
                <p className="text-3xl font-display text-primary mb-1">02+</p>
                <p className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">R&D Internships</p>
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
