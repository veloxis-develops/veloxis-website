export interface SentimentResult {
  ticker: string;
  sentiment: 'Bullish' | 'Bearish' | 'Neutral';
  score: number;
  logic: string;
  market_impact: 'High' | 'Medium' | 'Low';
}

export interface NewsInput {
  headline: string;
  description: string;
}

// Keyword-based sentiment analysis (simulates AI analysis)
const bullishKeywords = [
  'surge', 'soar', 'rally', 'gain', 'profit', 'growth', 'beat', 'exceed',
  'record', 'breakthrough', 'innovation', 'partnership', 'acquisition',
  'expand', 'bullish', 'upgrade', 'outperform', 'strong', 'positive',
  'success', 'milestone', 'approval', 'launch', 'revenue', 'earnings beat'
];

const bearishKeywords = [
  'crash', 'plunge', 'fall', 'drop', 'loss', 'decline', 'miss', 'below',
  'layoff', 'cut', 'downgrade', 'sell', 'bearish', 'weak', 'negative',
  'lawsuit', 'investigation', 'recall', 'debt', 'bankruptcy', 'warning',
  'concern', 'risk', 'threat', 'delay', 'cancel', 'fraud', 'scandal'
];

const highImpactKeywords = [
  'earnings', 'fed', 'merger', 'acquisition', 'bankruptcy', 'ceo',
  'regulation', 'antitrust', 'ipo', 'split', 'dividend', 'guidance'
];

const tickerPatterns: Record<string, string[]> = {
  'AAPL': ['apple', 'iphone', 'ipad', 'mac', 'tim cook'],
  'GOOGL': ['google', 'alphabet', 'android', 'youtube', 'sundar'],
  'MSFT': ['microsoft', 'windows', 'azure', 'xbox', 'satya nadella'],
  'AMZN': ['amazon', 'aws', 'prime', 'bezos', 'jassy'],
  'TSLA': ['tesla', 'elon musk', 'ev', 'electric vehicle', 'model'],
  'META': ['meta', 'facebook', 'instagram', 'whatsapp', 'zuckerberg'],
  'NVDA': ['nvidia', 'gpu', 'geforce', 'cuda', 'jensen huang'],
  'JPM': ['jpmorgan', 'jp morgan', 'jamie dimon', 'chase'],
  'BTC': ['bitcoin', 'btc', 'crypto', 'cryptocurrency'],
  'SPY': ['s&p', 'sp500', 's&p 500', 'market index']
};

function extractTicker(text: string): string {
  const lowerText = text.toLowerCase();
  
  // Check for explicit ticker symbols (e.g., $AAPL or AAPL:)
  const tickerMatch = text.match(/\$([A-Z]{1,5})|\b([A-Z]{2,5})(?=:)/g);
  if (tickerMatch) {
    return tickerMatch[0].replace('$', '').replace(':', '');
  }
  
  // Check for company name patterns
  for (const [ticker, patterns] of Object.entries(tickerPatterns)) {
    if (patterns.some(pattern => lowerText.includes(pattern))) {
      return ticker;
    }
  }
  
  return 'General Market';
}

function calculateSentiment(text: string): { sentiment: 'Bullish' | 'Bearish' | 'Neutral'; score: number } {
  const lowerText = text.toLowerCase();
  
  let bullishScore = 0;
  let bearishScore = 0;
  
  bullishKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) bullishScore += 1;
  });
  
  bearishKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) bearishScore += 1;
  });
  
  const totalSignals = bullishScore + bearishScore;
  
  if (totalSignals === 0) {
    return { sentiment: 'Neutral', score: 0.5 };
  }
  
  const netScore = (bullishScore - bearishScore) / totalSignals;
  const confidence = Math.min(0.95, 0.5 + (totalSignals * 0.1));
  
  if (netScore > 0.2) {
    return { sentiment: 'Bullish', score: Math.min(0.95, 0.6 + netScore * 0.3) };
  } else if (netScore < -0.2) {
    return { sentiment: 'Bearish', score: Math.min(0.95, 0.6 + Math.abs(netScore) * 0.3) };
  }
  
  return { sentiment: 'Neutral', score: confidence };
}

function determineImpact(text: string): 'High' | 'Medium' | 'Low' {
  const lowerText = text.toLowerCase();
  
  const highImpactCount = highImpactKeywords.filter(k => lowerText.includes(k)).length;
  
  if (highImpactCount >= 2) return 'High';
  if (highImpactCount === 1) return 'Medium';
  
  // Check text length and specificity
  if (text.length > 150) return 'Medium';
  
  return 'Low';
}

function generateLogic(ticker: string, sentiment: string, text: string): string {
  const lowerText = text.toLowerCase();
  
  if (sentiment === 'Bullish') {
    if (lowerText.includes('earnings') || lowerText.includes('revenue')) {
      return `Strong financial performance signals investor confidence in ${ticker}'s growth trajectory.`;
    }
    if (lowerText.includes('partnership') || lowerText.includes('deal')) {
      return `Strategic partnership expands ${ticker}'s market reach and revenue potential.`;
    }
    if (lowerText.includes('innovation') || lowerText.includes('launch')) {
      return `Product innovation positions ${ticker} for competitive advantage and market share gains.`;
    }
    return `Positive market sentiment likely to drive buying pressure on ${ticker}.`;
  }
  
  if (sentiment === 'Bearish') {
    if (lowerText.includes('layoff') || lowerText.includes('cut')) {
      return `Cost-cutting measures signal potential revenue challenges for ${ticker}.`;
    }
    if (lowerText.includes('lawsuit') || lowerText.includes('investigation')) {
      return `Legal uncertainty creates downside risk and potential liability for ${ticker}.`;
    }
    if (lowerText.includes('miss') || lowerText.includes('below')) {
      return `Underperformance versus expectations likely to trigger selling pressure on ${ticker}.`;
    }
    return `Negative sentiment may drive institutional selling and price decline for ${ticker}.`;
  }
  
  return `Mixed signals suggest sideways trading action for ${ticker} pending further catalysts.`;
}

export function analyzeNews(input: NewsInput): SentimentResult {
  const fullText = `${input.headline} ${input.description}`;
  
  const ticker = extractTicker(fullText);
  const { sentiment, score } = calculateSentiment(fullText);
  const market_impact = determineImpact(fullText);
  const logic = generateLogic(ticker, sentiment, fullText);
  
  return {
    ticker,
    sentiment,
    score: Math.round(score * 100) / 100,
    logic,
    market_impact
  };
}

export const sampleHeadlines: NewsInput[] = [
  {
    headline: "Apple Reports Record Q4 Earnings, iPhone Sales Surge 15%",
    description: "Apple Inc. exceeded analyst expectations with strong iPhone demand in emerging markets."
  },
  {
    headline: "Tesla Announces Major Layoffs Amid Slowing EV Demand",
    description: "Electric vehicle maker to cut 10% of workforce as competition intensifies globally."
  },
  {
    headline: "Federal Reserve Signals Potential Rate Cuts in 2024",
    description: "Fed Chair hints at monetary policy easing as inflation shows signs of cooling."
  },
  {
    headline: "Microsoft Azure Revenue Beats Expectations, Cloud Growth Accelerates",
    description: "Enterprise cloud adoption drives 29% year-over-year growth in Azure segment."
  },
  {
    headline: "NVIDIA Faces Antitrust Investigation Over AI Chip Dominance",
    description: "DOJ reportedly examining potential anti-competitive practices in GPU market."
  },
  {
    headline: "Amazon Expands Same-Day Delivery to 15 New Markets",
    description: "E-commerce giant invests $2B in logistics infrastructure expansion."
  },
  {
    headline: "Bitcoin Surges Past $100K on ETF Approval Speculation",
    description: "Cryptocurrency rally intensifies as institutional adoption accelerates."
  },
  {
    headline: "Meta Platforms Launches New AI Assistant Features",
    description: "Company integrates advanced language models across Facebook and Instagram."
  }
];
