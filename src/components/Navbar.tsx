"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { motion } from "framer-motion";
import GlassSurface from "@/components/GlassSurface";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Career", href: "/career" },
  { name: "Creatives", href: "/creatives" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 py-4 pointer-events-none sm:p-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto"
      >
        <GlassSurface
          width="auto"
          height="auto"
          borderRadius={999}
          borderWidth={0.08}
          brightness={58}
          opacity={0.84}
          blur={8}
          backgroundOpacity={0.08}
          saturation={1.75}
          distortionScale={-72}
          redOffset={0}
          greenOffset={7}
          blueOffset={14}
          className="max-w-[calc(100vw-1.5rem)]"
        >
          <div className="flex max-w-full items-center gap-2 rounded-full px-1 sm:gap-6 sm:px-3">
            <Link href="/" className="mr-1 flex items-center gap-3 group sm:mr-6">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display text-base shadow-[inset_0_1px_0_oklch(1_0_0/0.28)] group-hover:scale-110 transition-transform">
                K
              </div>
              <span className="text-sm font-display tracking-tight hidden sm:block">KAZE.STUDIO</span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList className="gap-1 sm:gap-2">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      render={<Link href={item.href} />}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "h-9 rounded-full bg-transparent px-2.5 text-xs transition-all hover:bg-white/8 hover:text-foreground sm:px-4",
                        pathname === item.href ? "text-primary font-semibold" : "text-foreground/60"
                      )}
                    >
                      {item.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </GlassSurface>
      </motion.div>
    </header>
  );
}
