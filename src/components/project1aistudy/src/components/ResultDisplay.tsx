import { motion } from 'framer-motion'
import { Copy, Check, BookOpen, HelpCircle, FileText } from 'lucide-react'
import type { StudyGuide } from '../lib/studyProcessor'

interface ResultDisplayProps {
  studyGuide: StudyGuide
  onCopySection: (content: string, section: string) => void
  copiedSection: string | null
}

export function ResultDisplay({ studyGuide, onCopySection, copiedSection }: ResultDisplayProps) {
  const sections = [
    {
      id: 'summary',
      title: 'Executive Summary',
      icon: BookOpen,
      content: studyGuide.executiveSummary,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      id: 'quiz',
      title: "The 'Loom' Quiz",
      icon: HelpCircle,
      content: studyGuide.quiz,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      id: 'glossary',
      title: 'Glossary',
      icon: FileText,
      content: studyGuide.glossary,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50'
    }
  ]

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl overflow-hidden">
            {/* Header */}
            <div className={`bg-gradient-to-r ${section.bgColor} p-6 border-b border-white/20`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 bg-linear-to-br ${section.color} rounded-xl shadow-lg`}>
                    <section.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onCopySection(section.content, section.id)}
                  className="p-2 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-white/70 transition-all duration-200"
                >
                  {copiedSection === section.id ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </motion.button>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="prose prose-gray max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{ 
                    __html: section.content
                      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>')
                      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-4 mb-2 text-gray-800">$1</h3>')
                      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3 text-gray-900">$1</h2>')
                      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-8 mb-4 text-gray-900">$1</h1>')
                      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
                      .replace(/\n\n/g, '</p><p class="mb-4">')
                      .replace(/^(?!<[h|l])/gm, '<p class="mb-4">')
                      .replace(/<p class="mb-4"><\/p>/g, '')
                      .replace(/<p class="mb-4"><h/g, '<h')
                      .replace(/<\/li><\/p>/g, '</li>')
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}