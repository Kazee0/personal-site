"use client";

import DotField from "@/components/DotField";

export function ModernBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-18%,oklch(0.35_0.08_220/0.46),transparent_48%),linear-gradient(180deg,oklch(0.06_0.012_235)_0%,oklch(0.035_0.006_245)_58%,oklch(0.025_0.004_250)_100%)]" />

      <div className="absolute inset-[-2%] opacity-[0.82]">
        <DotField
          dotRadius={2}
          dotSpacing={16}
          cursorRadius={360}
          bulgeStrength={54}
          glowRadius={220}
          sparkle
          waveAmplitude={0.35}
          gradientFrom="oklch(0.86 0.045 220 / 0.56)"
          gradientTo="oklch(0.68 0.11 250 / 0.36)"
          glowColor="oklch(0.7 0.13 215 / 0.26)"
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_0%,transparent_52%,oklch(0.01_0_0/0.72)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,oklch(0_0_0/0.1)_0_1px,transparent_1px_5px)] opacity-[0.18]" />
      <div className="absolute inset-0 noise-bg opacity-[0.08] mix-blend-screen" />
    </div>
  );
}
