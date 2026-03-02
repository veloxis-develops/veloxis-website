import { motion } from 'framer-motion'
import { Brain, Sparkles } from 'lucide-react'

export function ProcessingIndicator() {
  const steps = [
    { icon: Brain, label: 'Analyzing concepts', delay: 0 },
    { icon: Sparkles, label: 'Generating summaries', delay: 0.2 },
    { icon: Brain, label: 'Creating quizzes', delay: 0.4 },
    { icon: Sparkles, label: 'Building glossary', delay: 0.6 },
  ]

  return (
    <div className="flex flex-col items-center justify-center h-96">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="mb-8"
      >
        <div className="p-4 bg-linear-to-br from-purple-500 to-blue-600 rounded-3xl shadow-2xl">
          <Brain className="w-12 h-12 text-white" />
        </div>
      </motion.div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-6">AI Processing Your Notes</h3>
      
      <div className="space-y-3 w-full max-w-sm">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: step.delay }}
            className="flex items-center gap-3 p-3 bg-white/50 backdrop-blur-sm rounded-xl"
          >
            <step.icon className="w-5 h-5 text-purple-600" />
            <span className="text-gray-700">{step.label}</span>
            <motion.div
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: step.delay }}
              className="h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full ml-auto"
              style={{ width: '60px' }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}