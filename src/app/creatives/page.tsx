"use client";

import { motion } from "framer-motion";
import { Camera, Book, Palette, Globe, Music, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const galleryItems = [
  { id: 1, title: "Pacific Twilight", type: "Photography", color: "from-blue-600/20 to-indigo-900/40", span: "md:col-span-2 md:row-span-2" },
  { id: 2, title: "Abstract Flow", type: "Digital Art", color: "from-purple-600/20 to-pink-900/40", span: "md:col-span-1 md:row-span-1" },
  { id: 3, title: "Urban Geometry", type: "Photography", color: "from-slate-600/20 to-slate-900/40", span: "md:col-span-1 md:row-span-2" },
  { id: 4, title: "Neon Nights", type: "Digital Art", color: "from-cyan-600/20 to-blue-900/40", span: "md:col-span-1 md:row-span-1" },
  { id: 5, title: "Mountain Echo", type: "Photography", color: "from-emerald-600/20 to-teal-900/40", span: "md:col-span-2 md:row-span-1" },
];

const interests = [
  { name: "Photography", icon: <Camera className="w-5 h-5" />, desc: "Capturing the interplay of light and architecture." },
  { name: "Reading", icon: <Book className="w-5 h-5" />, desc: "Focusing on sci-fi, philosophy, and technical deep-dives." },
  { name: "Traveling", icon: <Globe className="w-5 h-5" />, desc: "Exploring diverse cultures and urban landscapes." },
];

export default function CreativesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 text-center"
      >
        <h2 className="text-display text-4xl md:text-6xl mb-4">The Studio</h2>
        <p className="text-foreground/50 font-mono text-xs uppercase tracking-widest max-w-lg mx-auto">
          A curated collection of visual captures, digital experiments, and personal interests.
        </p>
      </motion.div>

      {/* Interests Horizontal Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {interests.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-3xl glass-card flex items-start gap-6"
          >
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              {item.icon}
            </div>
            <div className="pt-1">
              <h3 className="text-base font-display font-semibold mb-2">{item.name}</h3>
              <p className="text-xs text-foreground/50 leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Masonry-ish Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
        {galleryItems.map((item, i) => (
          <Dialog key={item.id}>
            <DialogTrigger 
              render={
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`group relative rounded-[2.5rem] overflow-hidden cursor-zoom-in glass-card ${item.span}`}
                />
              }
            >
              {/* Placeholder with Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} group-hover:scale-105 transition-transform duration-700`} />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 p-8 z-10 w-full">
                <Badge variant="outline" className="text-[10px] border-white/20 text-white/70 mb-3 rounded-full px-3">
                  {item.type}
                </Badge>
                <h4 className="text-white font-display text-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  {item.title}
                </h4>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-background/80 backdrop-blur-xl border-white/10 p-0 overflow-hidden">
               <div className={`w-full aspect-video bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <div className="text-center p-12">
                     <p className="text-white/40 font-mono text-xs uppercase tracking-[0.4em] mb-4">Perspective Preview</p>
                     <h2 className="text-white text-4xl md:text-6xl font-display">{item.title}</h2>
                     <p className="text-white/60 mt-6 max-w-md mx-auto italic text-sm">
                        "Visual storytelling through the lens of a software engineer, 
                        where composition meets computation."
                     </p>
                  </div>
               </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-20 pt-10 border-t border-white/5 text-center"
      >
        <p className="text-[10px] font-mono tracking-widest text-foreground/30 flex items-center justify-center gap-2">
          MADE WITH <Heart className="w-2 h-2 text-primary" /> BY KAZE // 2026
        </p>
      </motion.div>
    </div>
  );
}
