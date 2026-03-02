import { motion, AnimatePresence } from 'framer-motion';
import { History, TrendingUp, TrendingDown, Minus, Trash2 } from 'lucide-react';
import type { SentimentResult } from '../lib/sentimentAnalyzer';

interface HistoryItem {
  result: SentimentResult;
  headline: string;
  timestamp: Date;
}

interface Props {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onClear: () => void;
}

export default function AnalysisHistory({ history, onSelect, onClear }: Props) {
  if (history.length === 0) return null;

  const sentimentIcons = {
    Bullish: TrendingUp,
    Bearish: TrendingDown,
    Neutral: Minus
  };

  const sentimentColors = {
    Bullish: 'text-bullish',
    Bearish: 'text-bearish',
    Neutral: 'text-neutral'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-surface border border-border rounded-2xl p-6 shadow-xl shadow-black/20"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <History className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Analysis History</h2>
            <p className="text-sm text-muted">{history.length} analyses</p>
          </div>
        </div>
        
        <motion.button
          onClick={onClear}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-lg bg-surface-elevated border border-border hover:border-bearish/50 hover:text-bearish transition-all"
          title="Clear history"
        >
          <Trash2 className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin pr-2">
        <AnimatePresence>
          {history.map((item, index) => {
            const Icon = sentimentIcons[item.result.sentiment];
            return (
              <motion.button
                key={index}
                onClick={() => onSelect(item)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                whileHover={{ x: 4 }}
                className="w-full text-left p-3 bg-surface-elevated hover:bg-border/30 border border-border hover:border-primary/30 rounded-xl transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${sentimentColors[item.result.sentiment]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-semibold">{item.result.ticker}</span>
                      <span className="text-xs text-muted">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted truncate">{item.headline}</p>
                  </div>
                  <span className={`text-sm font-mono ${sentimentColors[item.result.sentiment]}`}>
                    {(item.result.score * 100).toFixed(0)}%
                  </span>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
