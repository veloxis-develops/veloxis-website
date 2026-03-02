import { motion } from 'framer-motion';
import { TrendingUp, Activity } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-border bg-surface/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-background" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-bullish animate-pulse-glow" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">FinSense</h1>
              <p className="text-xs text-muted">Sentiment Analyzer</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 text-sm text-muted"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span>Live Analysis</span>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
