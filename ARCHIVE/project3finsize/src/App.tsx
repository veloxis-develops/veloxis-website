import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import NewsInput from './components/NewsInput';
import SentimentResult from './components/SentimentResult';
import SampleHeadlines from './components/SampleHeadlines';
import AnalysisHistory from './components/AnalysisHistory';
import { analyzeNews, type NewsInput as NewsInputType, type SentimentResult as SentimentResultType } from './lib/sentimentAnalyzer';

interface HistoryItem {
  result: SentimentResultType;
  headline: string;
  timestamp: Date;
}

function App() {
  const [currentResult, setCurrentResult] = useState<SentimentResultType | null>(null);
  const [currentHeadline, setCurrentHeadline] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleAnalyze = useCallback((input: NewsInputType) => {
    setIsAnalyzing(true);
    setCurrentHeadline(input.headline);
    
    // Simulate API delay for realistic feel
    setTimeout(() => {
      const result = analyzeNews(input);
      setCurrentResult(result);
      setHistory(prev => [{ result, headline: input.headline, timestamp: new Date() }, ...prev.slice(0, 19)]);
      setIsAnalyzing(false);
    }, 800);
  }, []);

  const handleSelectHistory = useCallback((item: HistoryItem) => {
    setCurrentResult(item.result);
    setCurrentHeadline(item.headline);
  }, []);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300d4aa' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Header />

      <main className="relative max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Decode Market <span className="text-primary">Sentiment</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            AI-powered analysis of financial news headlines. Get instant sentiment scores, 
            market impact assessments, and trading insights.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Input & Samples */}
          <div className="lg:col-span-1 space-y-6">
            <NewsInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            <SampleHeadlines onSelect={handleAnalyze} />
          </div>

          {/* Middle Column - Result */}
          <div className="lg:col-span-1">
            {currentResult ? (
              <SentimentResult result={currentResult} headline={currentHeadline} />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-surface border border-border border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]"
              >
                <div className="w-16 h-16 rounded-2xl bg-surface-elevated flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">No Analysis Yet</h3>
                <p className="text-sm text-muted max-w-xs">
                  Enter a news headline or select a sample to see the sentiment analysis results.
                </p>
              </motion.div>
            )}
          </div>

          {/* Right Column - History */}
          <div className="lg:col-span-1">
            <AnalysisHistory 
              history={history} 
              onSelect={handleSelectHistory}
              onClear={handleClearHistory}
            />
            
            {/* Stats Card */}
            {history.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 bg-surface border border-border rounded-2xl p-6 shadow-xl shadow-black/20"
              >
                <h3 className="text-sm font-semibold text-muted mb-4">Session Stats</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-bullish">
                      {history.filter(h => h.result.sentiment === 'Bullish').length}
                    </div>
                    <div className="text-xs text-muted">Bullish</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-bearish">
                      {history.filter(h => h.result.sentiment === 'Bearish').length}
                    </div>
                    <div className="text-xs text-muted">Bearish</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neutral">
                      {history.filter(h => h.result.sentiment === 'Neutral').length}
                    </div>
                    <div className="text-xs text-muted">Neutral</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center text-sm text-muted"
        >
          <p>FinSense • Quantitative Sentiment Analysis • For Educational Purposes Only</p>
        </motion.footer>
      </main>
    </div>
  );
}

export default App;
