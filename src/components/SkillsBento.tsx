import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Brain, Code2, Cloud } from 'lucide-react';
import { SKILLS } from '../lib/data';

const iconMap: Record<string, React.ReactNode> = {
  'AI / LLMs': <Brain size={20} />,
  'Full Stack': <Code2 size={20} />,
  'DevOps': <Cloud size={20} />,
};

const colorMap: Record<string, { text: string; bg: string; border: string; bar: string }> = {
  cyan: {
    text: 'text-glow-cyan',
    bg: 'bg-glow-cyan/[0.05]',
    border: 'border-glow-cyan/20',
    bar: 'bg-gradient-to-r from-glow-cyan to-glow-blue',
  },
  blue: {
    text: 'text-glow-blue',
    bg: 'bg-glow-blue/[0.05]',
    border: 'border-glow-blue/20',
    bar: 'bg-gradient-to-r from-glow-blue to-glow-violet',
  },
  violet: {
    text: 'text-glow-violet',
    bg: 'bg-glow-violet/[0.05]',
    border: 'border-glow-violet/20',
    bar: 'bg-gradient-to-r from-glow-violet to-glow-cyan',
  },
};

function SkillCard({
  category,
  delay,
}: {
  category: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const data = SKILLS[category as keyof typeof SKILLS];
  const colors = colorMap[data.color];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className="glass-card rounded-2xl p-6 lg:p-8 glow-border group"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text} border ${colors.border}`}>
          {iconMap[category]}
        </div>
        <h3 className="font-[Syne] text-lg font-bold text-text-primary">{category}</h3>
      </div>

      {/* Skills */}
      <div className="space-y-4">
        {data.items.map((skill, i) => (
          <div key={skill.name}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-text-secondary font-medium">{skill.name}</span>
              <span className="text-xs text-text-muted font-[JetBrains_Mono]">{skill.level}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-void-border overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${skill.level}%` } : {}}
                transition={{ duration: 1, delay: delay + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-full ${colors.bar}`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function SkillsBento() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" ref={ref} className="relative py-24 lg:py-32">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-blue/[0.03] rounded-full blur-[150px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-glow-cyan/20 bg-glow-cyan/[0.05] text-xs font-medium text-glow-cyan tracking-wider uppercase font-[JetBrains_Mono] mb-6">
            Technical Expertise
          </span>
          <h2 className="font-[Syne] text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Deep Stack Proficiency
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            From model fine-tuning to production deployment — end-to-end ownership
            of the entire AI engineering lifecycle.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.keys(SKILLS).map((category, i) => (
            <SkillCard key={category} category={category} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
}
