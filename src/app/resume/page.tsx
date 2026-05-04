"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, animate } from "framer-motion";
import {
  X, MapPin, ArrowRight, FlaskConical, HeartPulse, Mic,
  Bot, FileText, BookOpen, GraduationCap, Briefcase, Layers, ChevronLeft, ChevronRight,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

type ResumeItem = {
  id: string;
  Icon: React.ElementType;
  year: string;
  title: string;
  company: string;
  location?: string;
  gpa?: string;
  type: string;
  description?: string;
  highlight?: string;
  highlightSub?: string;
  details?: string[];
  tags?: string[];
  featured?: boolean;
  logoSrc?: string;
  // true = wide banner logo (e.g. J&J 5.5:1), false/absent = square seal/wordmark
  logoWide?: boolean;
};

// ── Logo Image ─────────────────────────────────────────────────────────────────
// No white container. Uses CSS filter: invert(1) hue-rotate(180deg) which:
//   • Converts white backgrounds → near-black (blends with dark page)
//   • Approximately restores original hues of coloured elements
//     (invert flips hue by 180°, hue-rotate undoes it → hue preserved)
// logoWide: banner aspect ratio (J&J ≈ 5.51:1)
function LogoImg({ src, alt, wide = false, size = "md" }: {
  src: string; alt: string; wide?: boolean; size?: "sm" | "md" | "lg" | "xl";
}) {
  const h = { sm: 20, md: 64, lg: 88, xl: 120 }[size];
  // Wide banner logos (e.g. J&J 5.51:1): size by maxWidth so height follows aspect ratio naturally.
  // Square/seal logos: size by height so they're always a predictable height.
  const maxW = wide ? (size === "sm" ? 72 : 240) : h * 2.5;

  return (
    <Image
      src={src}
      alt={alt}
      width={wide ? 800 : 500}
      height={500}
      className="object-contain flex-shrink-0"
      style={{
        ...(wide
          ? { height: "auto", width: "auto", maxWidth: maxW }
          : { height: h, width: "auto", maxWidth: maxW }
        ),
        // invert(1) → white bg → black; hue-rotate(180deg) → restores colour hues
        filter: "invert(1) hue-rotate(180deg)",
        opacity: size === "xl" ? 0.94 : size === "lg" ? 0.92 : 0.82,
      }}
      priority={false}
    />
  );
}

// ── Animated Counter ───────────────────────────────────────────────────────────

function Counter({ to, decimals = 0, prefix = "", suffix = "" }: {
  to: number; decimals?: number; prefix?: string; suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState((0).toFixed(decimals));
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ctrl: ReturnType<typeof animate> | undefined;
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !fired.current) {
        fired.current = true;
        ctrl = animate(0, to, {
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => setDisplay(v.toFixed(decimals)),
        });
      }
    }, { threshold: 0.5 });
    ob.observe(el);
    return () => { ob.disconnect(); ctrl?.stop(); };
  }, [to, decimals]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

// ── Skill Bar ──────────────────────────────────────────────────────────────────

function SkillBar({ name, level, pct, delay = 0 }: {
  name: string; level: string; pct: number; delay?: number;
}) {
  return (
    <div className="group">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-sm text-white/70">{name}</span>
        <span className="text-[10px] font-mono text-white/28 uppercase tracking-[0.14em]">{level}</span>
      </div>
      <div className="relative h-[1.5px] rounded-full overflow-hidden" style={{ background: "oklch(1 0 0 / 0.07)" }}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "oklch(0.7 0.15 250)" }}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
        />
      </div>
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────────

const education: ResumeItem[] = [
  {
    id: "nu", Icon: GraduationCap, year: "SEP 2025 – DEC 2026",
    title: "M.S. in Computer Science",
    company: "Northwestern University", location: "Evanston, IL",
    gpa: "3.9", type: "Education",
    description: "Graduate research focus on AI systems, scalable architecture, and intelligent information systems.",
    details: ["Relevant coursework: Machine Learning, AI Programming, Networking, Scalable Software Architecture, Practicum Intelligent Info System, Introduction to AI"],
    tags: ["Machine Learning", "AI", "Networking", "Scalable Systems"],
    logoSrc: "/images/logos/northwestern.png",
  },
  {
    id: "uci", Icon: BookOpen, year: "SEP 2021 – MAR 2025",
    title: "B.S. in Computer Science",
    company: "UC Irvine", location: "Irvine, CA",
    gpa: "3.68", type: "Education",
    description: "Multiple Dean's Honor List. Strong foundation in algorithms, systems, AI and data mining.",
    details: ["Multiple Dean's Honor List", "Relevant coursework: Machine/Data Mining, Intro Artificial Intelligence, Program in C/C++"],
    tags: ["Algorithms", "Data Mining", "C/C++", "AI"],
    logoSrc: "/images/logos/uci.png",
  },
];

const experience: ResumeItem[] = [
  {
    id: "zeiss", Icon: FlaskConical, year: "APR 2025 – AUG 2025",
    title: "R&D Intern", company: "Carl Zeiss", location: "Shanghai, CN",
    type: "Experience",
    description: "Developed computer vision solutions for industrial X-ray inspection at one of Germany's most prestigious optics companies.",
    highlight: "50% faster labeling",
    highlightSub: "Custom PyQt tool vs legacy Java system",
    details: [
      "Developed X-ray-based defect detection algorithms for cylindrical batteries using computer vision techniques.",
      "Built a Python/PyQt tagging tool replacing legacy Java system, reducing labeling time by 50% with modular plugin support.",
      "Collaborated with cross-functional teams in Germany and China to deploy models via Zeiss cloud training platform.",
      "3D X-ray automatic flaw detection solution adopted by BMW in Germany.",
    ],
    tags: ["Computer Vision", "Python", "PyQt", "X-Ray", "Cloud Training"],
    logoSrc: "/images/logos/zeiss.png",
  },
  {
    id: "jj", Icon: HeartPulse, year: "JUN 2023 – SEP 2023",
    title: "R&D Intern", company: "Johnson & Johnson", location: "Shanghai, CN",
    type: "Experience",
    description: "Medical device software for skull surgery applications, focusing on data integrity and process automation.",
    highlight: "40 min → background",
    highlightSub: "File retrieval via C++ background process",
    details: [
      "Ensured data integrity and compliance in medical environments handling sensitive user data.",
      "Participated in development of a skull surgery appliance using an industry-leading 3D printer.",
      "Developed automatic file-system logging software in Python to track software usage.",
      "Built a C++ file retrieval system, reducing a 40-minute manual job to a background process.",
    ],
    tags: ["C++", "Python", "Data Integrity", "3D Printing"],
    logoSrc: "/images/logos/jj.png",
    logoWide: true,
  },
];

const projects: ResumeItem[] = [
  {
    id: "says", Icon: Mic, year: "JAN 2026 – Present",
    title: "Member & Leader", company: "SAYS", type: "AI Research",
    description: "Voice-first AI application integrating speech recognition, LLM dialogue, and TTS pipelines.",
    details: [
      "Defined core system architecture and feature roadmap for a voice-first AI application",
      "Led cross-team coordination between university researchers and external clients",
      "Designed and prototyped voice interaction integrating STT, LLM, and TTS",
    ],
    tags: ["AI", "LLM", "Voice Interaction", "System Architecture"],
    featured: true,
  },
  {
    id: "energaiz", Icon: Layers, year: "JAN 2025 – MAR 2025",
    title: "Member", company: "EnergAIz", type: "Research",
    description: "RL agent using PPO and SAC to minimize energy consumption in a CityLearn simulation.",
    details: [
      "Developed an RL agent using PPO and SAC algorithms to minimize energy consumption.",
      "Implemented and tuned reward functions for energy efficiency and battery usage.",
      "Analyzed PPO vs SAC performance differences for future CityLearn participants.",
    ],
    tags: ["Reinforcement Learning", "PPO / SAC", "Energy Efficiency"],
  },
  {
    id: "vex", Icon: Bot, year: "SEP 2020 – JAN 2021",
    title: "Team Leader", company: "Vex Robotics", type: "Competition",
    description: "Led a 5-member team to a gold medal finish in an international robotics competition.",
    details: [
      "Designed, built, and programmed a competitive robotics system — gold medal finish",
      "Coordinated team roles, timelines, and strategy across the build cycle",
      "Contributed to hardware design and control logic",
    ],
    tags: ["Robotics", "Control Logic", "Hardware"],
  },
  {
    id: "papergon", Icon: FileText, year: "MAY 2019 – MAY 2021",
    title: "Co-Founder", company: "Papergon", type: "Startup",
    description: "Paperless education startup deployed at Dulwich College with $15K in secured funding.",
    details: [
      "Co-founded a student team promoting paperless education at Dulwich College",
      "Secured $15,000 in funding and managed a 9-member cross-functional team",
    ],
    tags: ["Entrepreneurship", "Education", "Leadership"],
  },
];

const languages = [
  { name: "Chinese",  level: "Native",   pct: 100 },
  { name: "English",  level: "Fluent",   pct: 95  },
  { name: "Japanese", level: "Fluent",   pct: 85  },
  { name: "German",   level: "Beginner", pct: 20  },
];

const techStack = [
  { cat: "Languages",     skills: ["C++", "Python", "JavaScript", "SQL", "Lisp"] },
  { cat: "AI / ML",       skills: ["PyTorch", "Computer Vision", "Machine Learning", "Reinforcement Learning"] },
  { cat: "Tools & Cloud", skills: ["AWS", "Docker", "Git", "Pytest", "PyQt"] },
];

// ── Section Label ──────────────────────────────────────────────────────────────

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="mb-14 md:mb-16"
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-[10px] text-primary/70 tracking-[0.4em]">{n}</span>
        <motion.div
          className="flex-1 h-px"
          style={{ background: "oklch(1 0 0 / 0.08)" }}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />
      </div>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white/88 leading-none">
        {title}
      </h2>
    </motion.div>
  );
}

// ── Detail Modal ───────────────────────────────────────────────────────────────

function DetailModal({ item, onClose }: { item: ResumeItem | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [item, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {item && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-10"
          style={{ zIndex: 200, background: "oklch(0 0 0 / 0.75)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)" }}
          onClick={onClose}
        >
          <motion.article
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: "spring", damping: 28, stiffness: 340, mass: 0.72 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full flex flex-col overflow-hidden"
            style={{
              maxWidth: 620,
              maxHeight: "min(86svh, 740px)",
              backgroundColor: "oklch(0.08 0.01 250)",
              border: "1px solid oklch(1 0 0 / 0.10)",
              borderRadius: "1.25rem",
              boxShadow: "0 40px 100px oklch(0 0 0 / 0.65), 0 0 0 1px oklch(1 0 0 / 0.04) inset",
            }}
          >
            {/* Inset top shine */}
            <div
              className="absolute top-0 left-10 right-10 h-px pointer-events-none"
              style={{ background: "linear-gradient(to right, transparent, oklch(1 0 0 / 0.13), transparent)" }}
            />

            {/* Header */}
            <div
              className="flex items-center justify-between px-6 pt-5 pb-4 flex-shrink-0"
              style={{ borderBottom: "1px solid oklch(1 0 0 / 0.07)" }}
            >
              <div className="flex items-center gap-3">
                {item.logoSrc ? (
                  <LogoImg src={item.logoSrc} alt={item.company} wide={item.logoWide} size="sm" />
                ) : (
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "oklch(1 0 0 / 0.07)", border: "1px solid oklch(1 0 0 / 0.09)" }}>
                    <item.Icon className="w-3.5 h-3.5 text-white/45" />
                  </div>
                )}
                <div>
                  <p className="text-[9px] font-mono uppercase tracking-[0.35em] text-primary/65">{item.type}</p>
                  <p className="text-[11px] font-mono text-white/28">{item.year}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 420, damping: 20 }}
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: "oklch(1 0 0 / 0.06)", border: "1px solid oklch(1 0 0 / 0.08)" }}
                aria-label="Close"
              >
                <X className="w-3.5 h-3.5 text-white/45" />
              </motion.button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              <div className="px-6 py-6 space-y-5 pb-8">
                {/* Title */}
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <h2 className="font-display text-[1.6rem] sm:text-[1.9rem] leading-tight pb-[0.12em] mb-2 text-white/90">
                    {item.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm text-white/40">
                    <span className="text-white/65 font-medium">{item.company}</span>
                    {item.location && (
                      <><span className="text-white/15">·</span>
                        <span className="flex items-center gap-1 text-xs"><MapPin className="w-3 h-3" />{item.location}</span></>
                    )}
                    {item.gpa && (
                      <><span className="text-white/15">·</span>
                        <span className="font-mono text-primary text-sm">GPA {item.gpa}</span></>
                    )}
                  </div>
                </motion.div>

                {/* Metric */}
                {(item.highlight || item.gpa) && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="px-5 py-4 rounded-xl"
                    style={{ background: "oklch(1 0 0 / 0.04)", border: "1px solid oklch(1 0 0 / 0.08)" }}
                  >
                    <p className="font-display text-2xl sm:text-3xl text-primary mb-0.5">
                      {item.highlight ?? `GPA ${item.gpa}`}
                    </p>
                    {item.highlightSub && <p className="text-xs text-white/32 font-mono">{item.highlightSub}</p>}
                    {!item.highlight && item.gpa && <p className="text-xs text-white/28">Grade Point Average</p>}
                  </motion.div>
                )}

                {/* Description */}
                {item.description && (
                  <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="text-sm sm:text-base text-white/55 leading-relaxed">
                    {item.description}
                  </motion.p>
                )}

                {/* Details */}
                {item.details && item.details.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }} className="space-y-3">
                    <p className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/22">Key Contributions</p>
                    <ul className="space-y-2.5">
                      {item.details.map((d, i) => (
                        <motion.li key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.27 + i * 0.055 }}
                          className="flex gap-3 text-sm text-white/55 leading-relaxed">
                          <span className="mt-[0.4rem] w-1 h-1 rounded-full flex-shrink-0 bg-primary/55" />
                          {d}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.44 }}
                    className="pt-4 space-y-2.5" style={{ borderTop: "1px solid oklch(1 0 0 / 0.07)" }}>
                    <p className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/22">Stack & Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, i) => (
                        <motion.span key={tag} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.47 + i * 0.04 }}
                          className="px-2.5 py-1 rounded-md text-xs text-white/50"
                          style={{ background: "oklch(1 0 0 / 0.05)", border: "1px solid oklch(1 0 0 / 0.08)" }}>
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function ResumePage() {
  const [selected, setSelected] = useState<ResumeItem | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  // Hero parallax
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 360], [0, -40]);
  const heroOpacity = useTransform(scrollY, [0, 280], [1, 0.15]);

  const scrollProjects = (dir: "left" | "right") => {
    const el = projectsRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pb-32">
      <DetailModal item={selected} onClose={() => setSelected(null)} />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <motion.section
        style={{ y: heroY, opacity: heroOpacity }}
        className="pt-10 sm:pt-14 pb-24 sm:pb-32"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/25 mb-7"
        >
          Curriculum Vitae
        </motion.p>

        {/* Name — pb-[0.18em] prevents bg-clip-text from clipping descenders (g, j, y) */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="font-display leading-[1.05] pb-[0.18em] mb-8 sm:mb-10"
          style={{
            fontSize: "clamp(3.2rem, 9.5vw, 7.5rem)",
            background: "linear-gradient(150deg, oklch(0.97 0 0) 0%, oklch(0.6 0 0) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Jiadong Li
        </motion.h1>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row sm:items-start gap-8 sm:gap-16"
        >
          <p className="text-sm sm:text-base text-white/48 leading-relaxed max-w-md"
            style={{ borderLeft: "1.5px solid oklch(1 0 0 / 0.10)", paddingLeft: "1.25rem" }}>
            Master&apos;s student at Northwestern University with experience in backend systems,
            cloud services, and applied machine learning.
          </p>

          {/* Inline stats */}
          <div className="flex gap-8 sm:gap-12 flex-shrink-0">
            {[
              { label: "NU GPA",     to: 3.9,  dec: 1 },
              { label: "UCI GPA",    to: 3.68, dec: 2 },
              { label: "Speed gain", to: 50,   suf: "%" },
              { label: "Funded",     to: 15,   pre: "$", suf: "K" },
            ].map(({ label, to, dec, pre, suf }) => (
              <div key={label}>
                <p className="font-display text-2xl sm:text-3xl text-primary leading-none mb-1">
                  <Counter to={to} decimals={dec} prefix={pre} suffix={suf} />
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/28">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.section>

      {/* ── Experience ───────────────────────────────────────────────────── */}
      <section className="mb-28 sm:mb-36">
        <SectionLabel n="01" title="Experience" />

        <div>
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
            >
              {/* Animated rule */}
              <motion.div
                className="w-full"
                style={{ height: "1px", background: "oklch(1 0 0 / 0.08)", transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-6 md:gap-14 py-10 md:py-12">
                {/* Left — meta */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="space-y-3 md:pt-1"
                >
                  {/* Logo or fallback company name */}
                  {exp.logoSrc ? (
                    <LogoImg src={exp.logoSrc} alt={exp.company} wide={exp.logoWide} size="md" />
                  ) : (
                    <p className="font-display text-lg text-white/72">{exp.company}</p>
                  )}
                  <div className="space-y-1">
                    <p className="font-mono text-[10px] text-white/28 tracking-[0.18em] uppercase">{exp.year}</p>
                    {exp.location && (
                      <p className="text-xs text-white/32 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{exp.location}
                      </p>
                    )}
                  </div>
                </motion.div>

                {/* Right — content */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                >
                  <h3 className="font-display text-2xl sm:text-3xl text-white/88 mb-4 leading-snug">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-white/52 leading-relaxed mb-5">{exp.description}</p>

                  {exp.highlight && (
                    <p className="font-mono text-xs text-primary/70 mb-5 flex items-center gap-2">
                      <span className="w-5 h-px bg-primary/40 inline-block flex-shrink-0" />
                      {exp.highlight}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {exp.tags?.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-md text-xs text-white/40 font-mono"
                        style={{ background: "oklch(1 0 0 / 0.04)", border: "1px solid oklch(1 0 0 / 0.08)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelected(exp)}
                    className="flex items-center gap-2 text-xs font-mono text-white/35 hover:text-white/65 transition-colors group cursor-pointer"
                  >
                    View details
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Closing rule */}
          <div className="w-full h-px" style={{ background: "oklch(1 0 0 / 0.08)" }} />
        </div>
      </section>

      {/* ── Education ────────────────────────────────────────────────────── */}
      <section className="mb-28 sm:mb-36">
        <SectionLabel n="02" title="Education" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {education.map((edu, i) => (
            <motion.button
              key={edu.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onClick={() => setSelected(edu)}
              className="text-left group cursor-pointer rounded-xl overflow-hidden relative"
              style={{ background: "oklch(1 0 0 / 0.03)", border: "1px solid oklch(1 0 0 / 0.08)" }}
              whileHover={{ y: -2 }}
            >
              {/* Top rule that grows on hover */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden">
                <motion.div
                  className="h-full w-full bg-primary/40"
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Logo zone — image-focused, centered, dominant */}
              <div className="flex items-center justify-center py-12 sm:py-16 px-6">
                {edu.logoSrc ? (
                  <LogoImg src={edu.logoSrc} alt={edu.company} size="xl" />
                ) : (
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{ background: "oklch(1 0 0 / 0.06)", border: "1px solid oklch(1 0 0 / 0.08)" }}>
                    <edu.Icon className="w-8 h-8 text-white/40" />
                  </div>
                )}
              </div>

              {/* Separator */}
              <div className="h-px mx-6" style={{ background: "oklch(1 0 0 / 0.07)" }} />

              {/* Text section */}
              <div className="px-6 sm:px-8 pt-5 pb-6 sm:pb-8">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="font-display text-xl sm:text-2xl text-white/85 leading-snug">{edu.title}</h4>
                  <p className="font-mono text-[10px] text-white/22 text-right flex-shrink-0 mt-1 leading-relaxed">{edu.year}</p>
                </div>
                <p className="text-sm text-white/38 mb-6 flex items-center gap-1.5">
                  {edu.company} <span className="text-white/15">·</span>
                  <MapPin className="w-3 h-3" />{edu.location}
                </p>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/20 mb-1.5">GPA</p>
                    <p className="font-display text-4xl sm:text-5xl text-primary leading-none">{edu.gpa}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/18 group-hover:text-white/45 group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <section className="mb-28 sm:mb-36">
        <SectionLabel n="03" title="Skills" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,1.4fr] gap-14 lg:gap-20">

          {/* Language proficiency bars */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.38em] text-white/25 mb-7">
              Language Proficiency
            </p>
            <div className="space-y-6">
              {languages.map((l, i) => (
                <SkillBar key={l.name} {...l} delay={i * 0.08} />
              ))}
            </div>
          </div>

          {/* Technical stack */}
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.38em] text-white/25 mb-7">
              Technical Stack
            </p>
            <div className="space-y-7">
              {techStack.map(({ cat, skills }, ci) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ci * 0.09 }}
                >
                  <p className="font-mono text-[9px] text-white/28 uppercase tracking-[0.22em] mb-3">{cat}</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s, si) => (
                      <motion.span
                        key={s}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: ci * 0.08 + si * 0.05 }}
                        className="px-3 py-1.5 rounded-lg text-xs text-white/58 hover:text-white/80 transition-colors cursor-default"
                        style={{ background: "oklch(1 0 0 / 0.04)", border: "1px solid oklch(1 0 0 / 0.08)" }}
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects — horizontal scroll ──────────────────────────────────── */}
      <section>
        <div className="flex items-end justify-between mb-14 md:mb-16">
          <SectionLabel n="04" title="Projects" />

          {/* Scroll arrows (desktop) */}
          <div className="hidden sm:flex items-center gap-2 mb-14 md:mb-16 flex-shrink-0">
            <button
              onClick={() => scrollProjects("left")}
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors"
              style={{ background: "oklch(1 0 0 / 0.05)", border: "1px solid oklch(1 0 0 / 0.09)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "oklch(1 0 0 / 0.09)")}
              onMouseLeave={e => (e.currentTarget.style.background = "oklch(1 0 0 / 0.05)")}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-white/45" />
            </button>
            <button
              onClick={() => scrollProjects("right")}
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors"
              style={{ background: "oklch(1 0 0 / 0.05)", border: "1px solid oklch(1 0 0 / 0.09)" }}
              onMouseEnter={e => (e.currentTarget.style.background = "oklch(1 0 0 / 0.09)")}
              onMouseLeave={e => (e.currentTarget.style.background = "oklch(1 0 0 / 0.05)")}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-white/45" />
            </button>
          </div>
        </div>

        {/* Scroll container — bleeds to right edge */}
        <div
          ref={projectsRef}
          className="overflow-x-auto hide-scrollbar -mx-4 sm:-mx-6 lg:-mx-10 px-4 sm:px-6 lg:px-10"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="flex gap-4 pb-2" style={{ width: "max-content" }}>
            {projects.map((proj, i) => (
              <motion.button
                key={proj.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                onClick={() => setSelected(proj)}
                className="flex flex-col text-left cursor-pointer rounded-xl overflow-hidden group flex-shrink-0"
                style={{
                  width: "clamp(260px, 30vw, 320px)",
                  scrollSnapAlign: "start",
                  background: "oklch(1 0 0 / 0.03)",
                  border: "1px solid oklch(1 0 0 / 0.08)",
                  minHeight: 240,
                }}
                whileHover={{ y: -3 }}
              >
                <div className="p-5 sm:p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "oklch(1 0 0 / 0.07)", border: "1px solid oklch(1 0 0 / 0.09)" }}>
                      <proj.Icon className="w-3.5 h-3.5 text-white/40" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">{proj.type}</span>
                  </div>

                  <p className="font-mono text-[10px] text-white/22 mb-1.5">{proj.year}</p>
                  <h4 className="font-display text-lg text-white/82 leading-snug mb-1">{proj.title}</h4>
                  <p className="text-sm text-white/42 font-medium mb-3">{proj.company}</p>
                  <p className="text-xs text-white/32 leading-relaxed flex-1">{proj.description}</p>

                  <div className="mt-5 flex items-center gap-1.5 font-mono text-[10px] text-white/22 group-hover:text-white/50 transition-colors">
                    View details <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.button>
            ))}

            {/* Trailing spacer so last card doesn't hug the edge */}
            <div className="flex-shrink-0 w-4 sm:w-6 lg:w-10" />
          </div>
        </div>
      </section>

    </div>
  );
}
