import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Newspaper, FileText, Loader2 } from 'lucide-react';
import type { NewsInput as NewsInputType } from '../lib/sentimentAnalyzer';

interface Props {
  onAnalyze: (input: NewsInputType) => void;
  isAnalyzing: boolean;
}

export default function NewsInput({ onAnalyze, isAnalyzing }: Props) {
  const [headline, setHeadline] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headline.trim()) {
      onAnalyze({ headline: headline.trim(), description: description.trim() });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-surface border border-border rounded-2xl p-6 shadow-xl shadow-black/20"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Newspaper className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">News Analysis</h2>
          <p className="text-sm text-muted">Enter a headline to analyze market sentiment</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-muted mb-2">
            <Newspaper className="w-4 h-4" />
            Headline
          </label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            placeholder="e.g., Apple Reports Record Q4 Earnings..."
            className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-muted mb-2">
            <FileText className="w-4 h-4" />
            Description (Optional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Additional context about the news..."
            rows={3}
            className="w-full px-4 py-3 bg-surface-elevated border border-border rounded-xl text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
          />
        </div>

        <motion.button
          type="submit"
          disabled={!headline.trim() || isAnalyzing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-primary to-primary-dim text-background font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-primary/25"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Analyze Sentiment
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
