import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, BookOpen, Sparkles, Download } from 'lucide-react'
import { NoteInput } from './components/NoteInput'
import { ProcessingIndicator } from './components/ProcessingIndicator'
import { ResultDisplay } from './components/ResultDisplay'
import type { StudyGuide } from './lib/studyProcessor'
import { processNotes } from './lib/studyProcessor'

function App() {
  const [notes, setNotes] = useState('')
  const [studyGuide, setStudyGuide] = useState<StudyGuide | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [copiedSection, setCopiedSection] = useState<string | null>(null)

  const handleProcessNotes = async () => {
    if (!notes.trim()) return

    setIsProcessing(true)
    setStudyGuide(null)

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    const result = processNotes(notes)
    setStudyGuide(result)
    setIsProcessing(false)
  }

  const handleCopySection = async (content: string, section: string) => {
    await navigator.clipboard.writeText(content)
    setCopiedSection(section)
    setTimeout(() => setCopiedSection(null), 2000)
  }

  const handleDownloadAll = () => {
    if (!studyGuide) return

    const content = `# Smart Study Guide\n\n## Executive Summary\n${studyGuide.executiveSummary}\n\n## The Loom Quiz\n${studyGuide.quiz}\n\n## Glossary\n${studyGuide.glossary}`
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'study-guide.md'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-linear-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-linear-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart iNotebook
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Transform your messy notes into structured, high-retention study guides with AI-powered processing
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <NoteInput
              notes={notes}
              onNotesChange={setNotes}
              onProcess={handleProcessNotes}
              isProcessing={isProcessing}
            />
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              {isProcessing && (
                <ProcessingIndicator key="processing" />
              )}

              {studyGuide && !isProcessing && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                      Your Study Guide
                    </h2>
                    <button
                      onClick={handleDownloadAll}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>

                  <ResultDisplay
                    studyGuide={studyGuide}
                    onCopySection={handleCopySection}
                    copiedSection={copiedSection}
                  />
                </motion.div>
              )}

              {!studyGuide && !isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-96 text-center"
                >
                  <div className="p-6 bg-white/50 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl">
                    <Sparkles className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Ready to transform your notes?
                    </h3>
                    <p className="text-gray-500">
                      Paste your notes on the left and click "Process Notes" to get started
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default App