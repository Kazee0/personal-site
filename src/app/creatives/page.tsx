"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import TiltedCard from "@/components/TiltedCard";

const galleryItems = [
  { id: 1, title: "Pacific Twilight", type: "Photography", color: "from-blue-600/20 to-indigo-900/40", span: "md:col-span-2 md:row-span-2", image: "/images/hero.png" },
  { id: 0, title: "Identity", type: "Portrait", color: "from-primary/20 to-primary/40", span: "md:col-span-1 md:row-span-1", image: "/images/profile.png" },
  { id: 2, title: "Abstract Flow", type: "Digital Art", color: "from-purple-600/20 to-pink-900/40", span: "md:col-span-1 md:row-span-1" },
  { id: 3, title: "Urban Geometry", type: "Photography", color: "from-slate-600/20 to-slate-900/40", span: "md:col-span-1 md:row-span-2" },
  { id: 4, title: "Neon Nights", type: "Digital Art", color: "from-cyan-600/20 to-blue-900/40", span: "md:col-span-1 md:row-span-1" },
  { id: 5, title: "Mountain Echo", type: "Photography", color: "from-emerald-600/20 to-teal-900/40", span: "md:col-span-2 md:row-span-1" },
];

export default function CreativesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 pb-32">
      {/* Refined Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-24 text-left border-l-2 border-primary/20 pl-8"
      >
        <h2 className="text-display text-4xl md:text-7xl mb-4 text-primary">The Studio</h2>
        <p className="text-foreground/50 font-mono text-sm uppercase tracking-[0.2em] max-w-xl">
          Visual Archive // Selective works in photography and digital experimentation.
        </p>
      </motion.div>

      {/* Simplified Masonry Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 auto-rows-[350px]">
        {galleryItems.map((item, i) => (
          <Dialog key={item.id}>
            <DialogTrigger 
              render={
                <button
                  type="button"
                  className={`group relative rounded-[2rem] overflow-hidden border-none bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${item.span}`}
                />
              }
            >
              <TiltedCard
                imageSrc={item.image || `https://placehold.co/1200x800/1a1a1a/ffffff?text=${item.title}`}
                altText={item.title}
                captionText={item.title}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                scaleOnHover={1.03}
                rotateAmplitude={8}
                showTooltip={false}
                showMobileWarning={false}
                displayOverlayContent={true}
                overlayContent={
                  <div className="p-10 text-left w-full h-full flex flex-col justify-end pointer-events-none">
                    <Badge variant="outline" className="w-fit text-[10px] border-white/30 text-white bg-black/40 backdrop-blur-md mb-4 rounded-full px-4 py-1 uppercase tracking-widest">
                      {item.type}
                    </Badge>
                    <h4 className="text-white font-display text-2xl drop-shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 font-bold">
                      {item.title}
                    </h4>
                  </div>
                }
              />
            </DialogTrigger>
            
            <DialogContent 
              showCloseButton={false}
              className="max-w-[100vw] w-screen h-screen m-0 border-none bg-black/98 backdrop-blur-3xl p-0 z-[100] rounded-none outline-none ring-0 shadow-none overflow-hidden"
            >
              {/* Ultra-Minimal Toolbar - Floating */}
              <div className="absolute top-0 left-0 right-0 h-20 px-8 flex items-center justify-between z-[110] pointer-events-none">
                 <div className="flex flex-col bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/5 pointer-events-auto">
                    <h3 className="text-white font-display text-base font-bold flex items-center gap-3">
                       {item.title} 
                       <span className="text-white/20 font-mono text-[9px] uppercase tracking-[0.2em] border-l border-white/10 pl-3">Archive #{item.id}</span>
                    </h3>
                 </div>
                 
                 <div className="pointer-events-auto">
                    <DialogClose render={<button className="p-3 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 transition-all group/close focus:outline-none" />}>
                       <X className="w-5 h-5 text-white/70 group-hover/close:text-white transition-all" />
                    </DialogClose>
                 </div>
              </div>

              {/* High-Fidelity Viewer - Zero Padding to Maximize Space */}
              <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black/40">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-full h-full flex items-center justify-center p-2 md:p-4"
                  >
                    {item.image ? (
                      <img 
                        src={item.image} 
                        className="max-w-full max-h-full object-contain cursor-default select-none shadow-[0_0_120px_rgba(0,0,0,0.5)]" 
                        alt={item.title}
                        draggable={false}
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                        <h2 className="text-white text-4xl md:text-8xl font-display font-bold opacity-10 uppercase tracking-tighter">{item.title}</h2>
                      </div>
                    )}
                  </motion.div>
              </div>

              {/* Interaction Hint */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-20">
                 <p className="text-white font-mono text-[8px] uppercase tracking-[0.6em]">Full Fidelity Mode // View selective pixels</p>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-48 pt-12 border-t border-white/5 text-center"
      >
        <p className="text-xs font-mono tracking-[0.4em] text-foreground/20">
          KAZE ARCHIVE // 2026 EDITION
        </p>
      </motion.div>
    </div>
  );
}
