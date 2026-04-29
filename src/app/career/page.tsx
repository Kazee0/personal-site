"use client";

import { motion } from "framer-motion";
import { 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Cpu, 
  Globe, 
  Zap, 
  Database, 
  Cloud,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const experiences = [
  {
    company: "Carl Zeiss",
    role: "R&D Software Engineering Intern",
    period: "SUMMER 2024",
    location: "REMOTE · GERMANY",
    description: "Built CV pipelines for optical metrology. Optimized 3D scan processing algorithms.",
    highlight: "+40% processing speed",
    tags: ["PyTorch", "CV", "C++"],
    color: "oklch(0.7 0.15 250)"
  },
  {
    company: "Johnson & Johnson",
    role: "R&D Software Engineering Intern",
    period: "2023",
    location: "IRVINE, CA",
    description: "Cloud-native ingestion pipelines and real-time dashboards for medical telemetry.",
    highlight: "HIPAA Compliant",
    tags: ["AWS", "Node.js", "Python"],
    color: "oklch(0.7 0.15 280)"
  }
];

const skills = [
  { category: "Languages", items: ["Python", "C++", "TypeScript", "Go", "SQL"], icon: <Code2 className="w-4 h-4" /> },
  { category: "AI / ML", items: ["PyTorch", "LLMs", "LangChain", "RAG", "Transformers"], icon: <Cpu className="w-4 h-4" /> },
  { category: "Infrastructure", items: ["AWS", "Docker", "Kubernetes", "FastAPI", "gRPC"], icon: <Cloud className="w-4 h-4" /> },
];

const education = [
  { school: "Northwestern University", degree: "M.S. Computer Science", year: "2026" },
  { school: "UC Irvine", degree: "B.S. Computer Science", year: "2025" },
];

export default function CareerPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16"
      >
        <h2 className="text-display text-4xl md:text-6xl mb-4">Career Archive</h2>
        <p className="text-foreground/50 font-mono text-xs uppercase tracking-widest">
          Chronological logs & technical competencies
        </p>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">
        
        {/* Main Experience - Large Cell */}
        <Card className="md:col-span-8 md:row-span-3 glass-card overflow-hidden flex flex-col p-6 md:p-8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8 px-0">
            <CardTitle className="text-sm font-mono tracking-widest text-primary uppercase">Experience</CardTitle>
            <Briefcase className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent className="flex-1 px-0">
            <div className="space-y-12">
              {experiences.map((exp, i) => (
                <motion.div 
                  key={exp.company}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 border-l border-primary/20 group"
                >
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3">
                    <h3 className="text-2xl font-display">{exp.company}</h3>
                    <span className="text-[10px] font-mono text-foreground/40 mt-1 md:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-sm text-foreground/80 font-medium mb-4">{exp.role}</p>
                  <p className="text-sm text-foreground/50 leading-relaxed mb-6 max-w-2xl">{exp.description}</p>
                  <div className="flex flex-wrap gap-2 items-center">
                    {exp.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary border-primary/10 text-[10px] px-3 rounded-full">
                        {tag}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="text-[10px] border-primary/20 text-primary/80 italic ml-auto px-3">
                      {exp.highlight}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills - Tall Cell */}
        <Card className="md:col-span-4 md:row-span-4 glass-card flex flex-col p-6 md:p-8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8 px-0">
            <CardTitle className="text-sm font-mono tracking-widest text-primary uppercase">Stack</CardTitle>
            <Zap className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent className="flex-1 px-0 overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-10">
                {skills.map((group) => (
                  <div key={group.category}>
                    <div className="flex items-center gap-2 mb-5">
                      {group.icon}
                      <h4 className="text-xs font-mono uppercase tracking-wider text-foreground/60">{group.category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {group.items.map(skill => (
                        <div 
                          key={skill}
                          className="px-4 py-1.5 rounded-lg bg-secondary/50 border border-white/5 text-[11px] font-medium"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Education - Bottom Small Cell */}
        <Card className="md:col-span-4 md:row-span-2 glass-card p-6 md:p-8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-8 px-0">
            <CardTitle className="text-sm font-mono tracking-widest text-primary uppercase">Academic</CardTitle>
            <GraduationCap className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent className="px-0">
            <div className="space-y-6">
              {education.map(edu => (
                <div key={edu.school}>
                  <p className="text-xs font-mono text-primary mb-2">{edu.year}</p>
                  <h4 className="text-lg font-display leading-tight">{edu.school}</h4>
                  <p className="text-xs text-foreground/50 mt-1">{edu.degree}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Core Philosophy - Wide Bottom Cell */}
        <Card className="md:col-span-4 md:row-span-1 glass-card bg-primary/5 border-primary/20 flex items-center p-6 md:p-8">
          <CardContent className="p-0">
            <p className="text-sm italic leading-relaxed text-primary/80">
              "Building systems that are not only efficient but possess a visceral 
              understanding of the data they process."
            </p>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
