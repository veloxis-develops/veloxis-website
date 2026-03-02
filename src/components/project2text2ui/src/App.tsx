import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2,
  Code2,
  Eye,
  Copy,
  Check,
  Save,
  History,
  Sparkles,
  Terminal
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface ComponentData {
  id: number;
  title: string;
  prompt: string;
  code: string;
  category: string;
  created_at: string;
}
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model =
  genAI.getGenerativeModel({ model: "gemini-3-flash-preview" })
  console.log("Debug Key:",
    import.meta.env.VITE_GEMINI_API_KEY
  );

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [generatedCategory, setGeneratedCategory] = useState('');
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [savedComponents, setSavedComponents] = useState<ComponentData[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'generator' | 'history'>('generator');

  // const fetchHistory = async () => {
  //   try {
  //     const res = await fetch('/api/components');
  //     const data = await res.json();
  //     setSavedComponents(data);
  //   } catch (err) {
  //     console.error('Failed to fetch history:', err);
  //   }
  // };

  // useEffect(() => {
  //   fetchHistory();
  // }, []);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);

    try {
      // This is the prompt we send to the AI
      const fullPrompt = `Generate a clean, modern UI component using HTML and Tailwind CSS based on this: ${prompt}. Return ONLY the raw code. No markdown.`;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      let text = response.text();
      text = text.replace(/```html|```/g,"").trim()

      setGeneratedCode(text);
      setGeneratedTitle("Portfolio Generated UI");
    } catch (err) {
      console.error(err);
      alert("Free limit reached or API error. Try again in a minute!");
    } finally {
      setIsGenerating(false);
    }
  };
  // const handleGenerate = async () => {
  //   if (!prompt.trim()) return;
  //   setIsGenerating(true);
  //   setGeneratedCode('');
  //   try {
  //     const res = await fetch('http://localhost:5000/api/generate', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ prompt }),
  //     });
  //     const data = await res.json();
  //     setGeneratedCode(data.code);
  //     setGeneratedTitle(data.title);
  //     setGeneratedCategory(data.category);
  //     setViewMode('preview');
  //   } catch (err) {
  //     console.error('Generation error:', err);
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  const handleSave = async () => {
    if (!generatedCode) return;
    setIsSaving(true);
    try {
      const res = await fetch('/api/components', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: generatedTitle,
          prompt: prompt,
          code: generatedCode,
          category: generatedCategory
        }),
      });
      if (res.ok) {
        // fetchHistory();
        // alert('Component saved to history!');
      }
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-['Inter']">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <Wand2 size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
                Text2UI
              </span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setActiveTab('generator')}
                className={`px-4 py - 2 rounded - lg text - sm font - medium transition - colors ${activeTab === 'generator' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'} `}
              >
                Generator
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px - 4 py - 2 rounded - lg text - sm font - medium transition - colors ${activeTab === 'history' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-slate-50'} `}
              >
                History
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'generator' ? (
            <motion.div
              key="generator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Prompt Input */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="max-w-3xl mx-auto space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600 mb-2">
                    <Sparkles size={20} />
                    <span className="font-semibold text-sm uppercase tracking-wider">Describe your component</span>
                  </div>
                  <div className="relative">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g., A modern hero section with a bold heading, subtext, and two call-to-action buttons..."
                      className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none text-slate-700 placeholder:text-slate-400"
                    />
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating || !prompt.trim()}
                      className="absolute bottom-4 right-4 bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all active:scale-95"
                    >
                      {isGenerating ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 size={18} />
                          Generate UI
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {['Pricing Table', 'Hero Section', 'Feature Grid', 'Modern Footer', 'Dashboard Card'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setPrompt(`A ${tag.toLowerCase()} with modern SaaS aesthetics`)}
                        className="text-xs font-medium px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Output Section */}
              {generatedCode && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
                >
                  <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex bg-white rounded-lg p-1 border border-slate-200">
                        <button
                          onClick={() => setViewMode('preview')}
                          className={`px - 3 py - 1.5 rounded - md text - xs font - bold flex items - center gap - 1.5 transition - all ${viewMode === 'preview' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'} `}
                        >
                          <Eye size={14} /> Preview
                        </button>
                        <button
                          onClick={() => setViewMode('code')}
                          className={`px - 3 py - 1.5 rounded - md text - xs font - bold flex items - center gap - 1.5 transition - all ${viewMode === 'code' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'} `}
                        >
                          <Code2 size={14} /> Code
                        </button>
                      </div>
                      <span className="text-sm font-medium text-slate-400">|</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-700">{generatedTitle}</span>
                        <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 bg-indigo-50 text-indigo-600 rounded font-bold">{generatedCategory}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors relative"
                        title="Copy Code"
                      >
                        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50"
                      >
                        {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={16} />}
                        Save
                      </button>
                    </div>
                  </div>

                  <div className="min-h-[500px]">
                    {viewMode === 'preview' ? (
                      <div className="p-8 bg-slate-50 min-h-[500px] flex items-center justify-center">
                        <div
                          className="w-full bg-white rounded-xl shadow-2xl overflow-hidden"
                          dangerouslySetInnerHTML={{ __html: generatedCode }}
                        />
                      </div>
                    ) : (
                      <div className="bg-[#0f172a] p-6 font-mono text-sm overflow-x-auto min-h-[500px]">
                        <pre className="text-indigo-300">
                          <code>{generatedCode}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {!generatedCode && !isGenerating && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                    <Terminal size={32} />
                  </div>
                  <p className="text-lg font-medium">Ready to build? Enter a prompt above.</p>
                  <p className="text-sm">Try "A modern card for a blog post"</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Your History</h2>
                  <p className="text-slate-500">All your AI-generated components in one place.</p>
                </div>
                <button
                  // onClick={fetchHistory}
                  // className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                >
                  <History size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedComponents.map((comp) => (
                  <motion.div
                    key={comp.id}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="h-40 bg-slate-100 relative overflow-hidden flex items-center justify-center p-4">
                      <div className="scale-[0.4] origin-center w-[250%] h-[250%] pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                        <div dangerouslySetInnerHTML={{ __html: comp.code }} />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {comp.category}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(comp.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1 truncate">{comp.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4 h-8">{comp.prompt}</p>
                      <button
                        onClick={() => {
                          setGeneratedCode(comp.code);
                          setGeneratedTitle(comp.title);
                          setGeneratedCategory(comp.category);
                          setPrompt(comp.prompt);
                          setActiveTab('generator');
                          setViewMode('preview');
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-lg text-sm font-semibold transition-colors"
                      >
                        <Eye size={14} /> View Component
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {savedComponents.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <History size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No history yet</h3>
                  <p className="text-slate-500 max-w-xs mx-auto mt-2">Generate and save your first component to see it here.</p>
                  <button
                    onClick={() => setActiveTab('generator')}
                    className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all"
                  >
                    Start Generating
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-slate-200 mt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                <Wand2 size={18} />
              </div>
              <span className="text-lg font-bold text-slate-900">Text2UI</span>
            </div>
            <p className="text-slate-500 text-sm">
              Built for the AI-driven future of web development.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Documentation</a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">Templates</a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
