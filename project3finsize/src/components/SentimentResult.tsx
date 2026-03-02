import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Target, Brain, Zap, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import type { SentimentResult as SentimentResultType } from '../lib/sentimentAnalyzer';

interface Props {
  result: SentimentResultType;
  headline: string;
}

export default function SentimentResult({ result, headline }: Props) {
  const [copied, setCopied] = useState(false);

  const sentimentConfig = {
    Bullish: {
      icon: TrendingUp,
      color: 'text-bullish',
      bg: 'bg-bullish-dim',
      border: 'border-bullish/30',
      gradient: 'from-bullish/20 to-transparent'
    },
    Bearish: {
      icon: TrendingDown,
      color: 'text-bearish',
      bg: 'bg-bearish-dim',
      border: 'border-bearish/30',
      gradient: 'from-bearish/20 to-transparent'
    },
    Neutral: {
      icon: Minus,
      color: 'text-neutral',
      bg: 'bg-neutral-dim',
      border: 'border-neutral/30',
      gradient: 'from-neutral/20 to-transparent'
    }
  };

  const impactConfig = {
    High: 'text-high bg-high/10 border-high/30',
    Medium: 'text-medium bg-medium/10 border-medium/30',
    Low: 'text-low bg-low/10 border-low/30'
  };

  const config = sentimentConfig[result.sentiment];
  const Icon = config.icon;

  const copyToClipboard = () => {
    const json = JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, type: 'spring' }}
      className={`bg-surface border ${config.border} rounded-2xl overflow-hidden shadow-xl shadow-black/20`}
    >
      {/* Header gradient */}
      <div className={`h-1.5 bg-gradient-to-r ${config.gradient}`} />
      
      <div className="p-6">
        {/* Ticker & Sentiment */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className={`w-14 h-14 rounded-2xl ${config.bg} flex items-center justify-center`}
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <Icon className={`w-7 h-7 ${config.color}`} />
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-mono">{result.ticker}</span>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${config.bg} ${config.color}`}>
                  {result.sentiment}
                </span>
              </div>
              <p className="text-sm text-muted mt-1 max-w-md truncate">{headline}</p>
            </div>
          </div>
          
          <motion.button
            onClick={copyToClipboard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-lg bg-surface-elevated border border-border hover:border-primary/50 transition-colors"
            title="Copy JSON"
          >
            {copied ? (
              <Check className="w-4 h-4 text-bullish" />
            ) : (
              <Copy className="w-4 h-4 text-muted" />
            )}
          </motion.button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-surface-elevated rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 text-muted text-sm mb-2">
              <Target className="w-4 h-4" />
              Confidence Score
            </div>
            <div className="flex items-end gap-2">
              <span className={`text-3xl font-bold font-mono ${config.color}`}>
                {(result.score * 100).toFixed(0)}%
              </span>
            </div>
            <div className="mt-2 h-2 bg-background rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.score * 100}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`h-full rounded-full ${config.bg.replace('-dim', '')}`}
                style={{ backgroundColor: result.sentiment === 'Bullish' ? '#00e676' : result.sentiment === 'Bearish' ? '#ff5252' : '#ffc107' }}
              />
            </div>
          </div>

          <div className="bg-surface-elevated rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 text-muted text-sm mb-2">
              <Zap className="w-4 h-4" />
              Market Impact
            </div>
            <span className={`inline-flex px-3 py-1.5 rounded-lg text-sm font-semibold border ${impactConfig[result.market_impact]}`}>
              {result.market_impact}
            </span>
          </div>
        </div>

        {/* Logic */}
        <div className="bg-surface-elevated rounded-xl p-4 border border-border">
          <div className="flex items-center gap-2 text-muted text-sm mb-3">
            <Brain className="w-4 h-4" />
            Analysis Logic
          </div>
          <p className="text-foreground leading-relaxed">{result.logic}</p>
        </div>

        {/* JSON Output */}
        <details className="mt-4 group">
          <summary className="text-sm text-muted cursor-pointer hover:text-foreground transition-colors flex items-center gap-2">
            <span className="group-open:rotate-90 transition-transform">▶</span>
            View Raw JSON
          </summary>
          <pre className="mt-3 p-4 bg-background rounded-xl text-xs font-mono text-muted overflow-x-auto border border-border">
            {JSON.stringify(result, null, 2)}
          </pre>
        </details>
      </div>
    </motion.div>
  );
}
