import { motion } from 'framer-motion'
import { FileText, Wand2 } from 'lucide-react'

interface NoteInputProps {
  notes: string
  onNotesChange: (notes: string) => void
  onProcess: () => void
  isProcessing: boolean
}

export function NoteInput({ notes, onNotesChange, onProcess, isProcessing }: NoteInputProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-linear-to-br from-blue-100 to-purple-100 rounded-xl">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Your Notes</h2>
        </div>
        
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder="Paste your messy notes here...\n\nExample: The mitochondria is the powerhouse of the cell. It generates ATP through cellular respiration which has three main stages: glycolysis, Krebs cycle, and electron transport chain."
          className="w-full h-96 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
        />
        
        <div className="mt-6 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {notes.length} characters
          </span>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onProcess}
            disabled={!notes.trim() || isProcessing}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Process Notes
              </>
            )}
          </motion.button>
        </div>
      </div>
      
      {/* Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <h3 className="font-semibold text-gray-700 mb-3">💡 Pro Tips:</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>Include key concepts, definitions, and examples for best results</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>The AI will extract technical terms and create scenario-based questions</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-1">•</span>
            <span>Longer notes (100+ words) provide more comprehensive study guides</span>
          </li>
        </ul>
      </div>
    </div>
  )
}