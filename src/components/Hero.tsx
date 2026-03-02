import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import { STATS } from '../lib/data';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-glow-cyan/[0.03] rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-glow-violet/[0.04] rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={item} className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow-cyan/20 bg-glow-cyan/[0.05]">
              <Sparkles size={14} className="text-glow-cyan animate-pulse-glow" />
              <span className="text-xs font-medium text-glow-cyan tracking-wider uppercase font-[JetBrains_Mono]">Available for Q1 2025 Engagements</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-[Syne] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95] tracking-tight mb-8"
          >
            <span className="text-text-primary">Architecting</span>
            <br />
            <span className="shimmer-text">AI-Driven Systems</span>
            <br />
            <span className="text-text-primary">that Scale.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed mb-10"
          >
            I partner with enterprise teams and AI startups to design, build, and deploy
            production-grade AI systems — from RAG pipelines to autonomous agent platforms —
            that deliver measurable business impact.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4 mb-16">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-glow-cyan to-glow-blue text-void font-semibold text-base hover:shadow-[0_0_50px_rgba(0,240,255,0.25)] transition-all duration-500"
            >
              Book a Discovery Call
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#showcase"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl border border-void-border-light text-text-primary font-medium text-base hover:border-glow-violet/40 hover:bg-glow-violet/[0.05] transition-all duration-500"
            >
              Watch AI Demo
            </a>
          </motion.div>

          {/* Trust Signals */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-6 mb-16">
            <div className="flex items-center gap-2 text-text-muted">
              <Zap size={16} className="text-glow-amber" />
              <span className="text-sm">Enterprise-Grade</span>
            </div>
            <div className="w-px h-4 bg-void-border-light" />
            <div className="flex items-center gap-2 text-text-muted">
              <Shield size={16} className="text-glow-emerald" />
              <span className="text-sm">SOC 2 Compliant</span>
            </div>
            <div className="w-px h-4 bg-void-border-light" />
            <div className="flex items-center gap-2 text-text-muted">
              <Sparkles size={16} className="text-glow-violet" />
              <span className="text-sm">1+ Years AI/ML</span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-5 text-center hover:bg-white/[0.05] transition-colors duration-300"
              >
                <div className="font-[Syne] text-2xl sm:text-3xl font-bold text-text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-text-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
