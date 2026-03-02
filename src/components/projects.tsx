import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { PROJECTS } from '../lib/data';
import { Link } from 'react-router-dom';

function ProjectCard({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="group glass-card rounded-2xl overflow-hidden glow-border"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />

        {/* Metric Badge */}
        <div className="absolute bottom-4 left-5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-glow-emerald/10 border border-glow-emerald/20">
            <TrendingUp size={14} className="text-glow-emerald" />
            <span className="text-sm font-bold text-glow-emerald font-[JetBrains_Mono]">
              {project.metric}
            </span>
            <span className="text-xs text-glow-emerald/70">{project.metricLabel}</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="absolute top-4 right-4 p-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ArrowUpRight size={16} className="text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-[Syne] text-xl font-bold text-text-primary mb-3 group-hover:text-glow-cyan transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs font-medium rounded-lg bg-void-elevated border border-void-border text-text-muted font-[JetBrains_Mono]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Result */}
        <div className="pt-4 border-t border-void-border">
          <div className="flex items-start gap-2">
            <span className="text-xs text-text-muted uppercase tracking-wider mt-0.5">Result:</span>
            <span className="text-sm text-glow-emerald font-medium">{project.result}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" ref={ref} className="relative py-24 lg:py-32">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-glow-emerald/[0.02] rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-glow-emerald/20 bg-glow-emerald/[0.05] text-xs font-medium text-glow-emerald tracking-wider uppercase font-[JetBrains_Mono] mb-6">
            Selected Work
          </span>
          <h2 className="font-[Syne] text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Engineered for Impact
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Every system I build is measured by one thing: business outcomes.
            Here's proof of what's possible.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <Link 
              to={project.link}
              key={project.title}
            >
              <ProjectCard project={project} index={i} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
