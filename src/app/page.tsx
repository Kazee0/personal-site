"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100svh-80px)] flex-col items-center justify-center px-5 py-16 sm:px-6 lg:py-20">
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full flex-col items-center"
        >
          <span className="block pb-6 font-mono text-xs uppercase tracking-[0.4em] text-primary sm:pb-7">
            Portfolio v2.0
          </span>
          <h1 className="text-display text-balance text-[clamp(3.8rem,8.9vw,7.1rem)] leading-[1.06] tracking-normal text-foreground md:leading-[1.02]">
            <span className="block md:whitespace-nowrap">Building intelligent</span>
            <span className="block md:whitespace-nowrap">
              <span className="italic text-primary">systems</span> at the edge
            </span>
          </h1>
          <p className="mx-auto max-w-2xl pt-9 font-sans text-base font-medium leading-8 text-foreground/64 sm:pt-11 sm:text-lg md:text-xl md:leading-9">
            MSCS student at Northwestern, building AI-powered backends,
            distributed systems, and visceral digital experiences.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full flex-col items-center justify-center gap-4 pt-10 sm:w-auto sm:flex-row"
        >
          <Button
            render={<Link href="/resume" />}
            nativeButton={false}
            size="lg"
            className="group h-14 w-full max-w-80 rounded-full border border-white/20 bg-primary px-8 text-sm font-bold uppercase tracking-[0.22em] text-primary-foreground shadow-[0_18px_48px_oklch(0.7_0.15_250/0.28),inset_0_1px_0_oklch(1_0_0/0.32)] hover:bg-primary/92 sm:w-auto sm:min-w-44"
          >
            Resume
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>          
          <Button 
            render={<Link href="/creatives" />}
            nativeButton={false}
            variant="outline" 
            size="lg" 
            className="h-14 w-full max-w-80 rounded-full border-white/18 bg-white/[0.055] px-8 text-sm font-bold uppercase tracking-[0.22em] text-foreground/90 shadow-[inset_0_1px_0_oklch(1_0_0/0.12)] backdrop-blur-xl hover:border-white/28 hover:bg-white/[0.095] hover:text-foreground sm:w-auto sm:min-w-44"
          >
            Creative
          </Button>
        </motion.div>
      </div>

      {/* Footer Meta */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-10 text-xs font-mono tracking-[0.4em] hidden md:block"
      >
        EVOLUTION THROUGH CODE // 2026 EDITION
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 right-10 text-xs font-mono tracking-[0.4em] hidden md:block"
      >
        NORTHWESTERN UNIVERSITY // CHICAGO, IL
      </motion.div>
    </div>
  );
}
