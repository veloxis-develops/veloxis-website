import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { sampleHeadlines, type NewsInput } from '../lib/sentimentAnalyzer';

interface Props {
  onSelect: (input: NewsInput) => void;
}

export default function SampleHeadlines({ onSelect }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-surface border border-border rounded-2xl p-6 shadow-xl shadow-black/20"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-neutral/10 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-neutral" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Sample Headlines</h2>
          <p className="text-sm text-muted">Click to analyze</p>
        </div>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin pr-2">
        {sampleHeadlines.map((sample, index) => (
          <motion.button
            key={index}
            onClick={() => onSelect(sample)}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ x: 4 }}
            className="w-full text-left p-4 bg-surface-elevated hover:bg-border/30 border border-border hover:border-primary/30 rounded-xl transition-all group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {sample.headline}
                </p>
                <p className="text-xs text-muted mt-1 truncate">
                  {sample.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors flex-shrink-0 mt-0.5" />
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
