export interface StudyGuide {
  executiveSummary: string
  quiz: string
  glossary: string
}

export function processNotes(notes: string): StudyGuide {
  // Extract key concepts and technical terms
  const technicalTerms = extractTechnicalTerms(notes)
  const keyConcepts = extractKeyConcepts(notes)
  
  // Generate executive summary
  const executiveSummary = generateExecutiveSummary(keyConcepts)
  
  // Generate quiz questions
  const quiz = generateQuiz(keyConcepts, technicalTerms)
  
  // Generate glossary
  const glossary = generateGlossary(technicalTerms)
  
  return {
    executiveSummary,
    quiz,
    glossary
  }
}

function extractTechnicalTerms(text: string): Array<{term: string, definition: string}> {
  // Common technical terms and their definitions
  const termDatabase: Record<string, string> = {
    'mitochondria': 'The powerhouse of the cell that generates ATP through cellular respiration',
    'atp': 'Adenosine triphosphate, the main energy currency of cells',
    'cellular respiration': 'The process by which cells convert nutrients into energy',
    'glycolysis': 'The first stage of cellular respiration that breaks down glucose',
    'krebs cycle': 'The second stage of cellular respiration that produces electron carriers',
    'electron transport chain': 'The final stage of cellular respiration that produces most ATP',
    'photosynthesis': 'The process by which plants convert light energy into chemical energy',
    'chlorophyll': 'The green pigment in plants that absorbs light energy',
    'dna': 'Deoxyribonucleic acid, the molecule that carries genetic information',
    'rna': 'Ribonucleic acid, involved in protein synthesis and gene expression',
    'protein synthesis': 'The process of creating proteins from genetic information',
    'enzyme': 'A biological catalyst that speeds up chemical reactions',
    'metabolism': 'The sum of all chemical reactions in an organism',
    'homeostasis': 'The maintenance of stable internal conditions',
    'evolution': 'The change in heritable characteristics of biological populations over generations',
    'natural selection': 'The process by which organisms better adapted to their environment tend to survive',
    'ecosystem': 'A community of living organisms interacting with their environment',
    'biodiversity': 'The variety of life in the world or in a particular habitat',
    'climate change': 'Long-term changes in temperature and weather patterns',
    'sustainability': 'Meeting present needs without compromising future generations',
    'algorithm': 'A step-by-step procedure for solving a problem or accomplishing a task',
    'data structure': 'A way of organizing and storing data in a computer',
    'machine learning': 'The use of algorithms to enable computers to learn from data',
    'artificial intelligence': 'The simulation of human intelligence in machines',
    'neural network': 'A computing system inspired by biological neural networks',
    'blockchain': 'A distributed ledger technology that maintains a secure and decentralized record',
    'cryptocurrency': 'Digital or virtual currency that uses cryptography for security',
    'quantum computing': 'Computing using quantum-mechanical phenomena',
    'big data': 'Extremely large data sets that can be analyzed to reveal patterns',
    'cloud computing': 'Delivery of computing services over the internet',
    'cybersecurity': 'The practice of protecting systems, networks, and data from digital attacks'
  }
  
  const foundTerms: Array<{term: string, definition: string}> = []
  const lowerText = text.toLowerCase()
  
  Object.entries(termDatabase).forEach(([term, definition]) => {
    if (lowerText.includes(term)) {
      foundTerms.push({ term, definition })
    }
  })
  
  // If no technical terms found, create some from the content
  if (foundTerms.length === 0) {
    const words = text.split(/\s+/)
    const longWords = words.filter(word => word.length > 8 && /[a-zA-Z]/.test(word))
    
    longWords.slice(0, 3).forEach(word => {
      const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '')
      if (cleanWord.length > 4) {
        foundTerms.push({
          term: cleanWord,
          definition: `A key concept mentioned in your notes related to ${cleanWord}`
        })
      }
    })
  }
  
  return foundTerms.slice(0, 5) // Limit to 5 terms
}

function extractKeyConcepts(text: string): string[] {
  // Simple key concept extraction
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const concepts: string[] = []
  
  sentences.forEach(sentence => {
    const cleanSentence = sentence.trim()
    if (cleanSentence.length > 20) {
      concepts.push(cleanSentence)
    }
  })
  
  return concepts.slice(0, 3) // Top 3 concepts
}

function generateExecutiveSummary(concepts: string[]): string {
  if (concepts.length === 0) {
    return `**Core Concept Summary:**\n\n• Your notes contain important information that requires careful study\n• Focus on understanding the main relationships between key ideas\n• Practice active recall to strengthen your retention`
  }
  
  const summary = concepts.map((concept) => {
    const shortConcept = concept.length > 100 ? concept.substring(0, 100) + '...' : concept
    return `• ${shortConcept}`
  }).join('\n\n')
  
  return `**Core Concept Summary:**\n\n${summary}`
}

function generateQuiz(concepts: string[], technicalTerms: Array<{term: string, definition: string}>): string {
  const questions: string[] = []
  
  // Question 1: Direct concept question
  if (concepts.length > 0) {
    questions.push(`1. **Direct Recall:** Based on your notes, explain the main concept of ${concepts[0].substring(0, 30)}... in your own words.`)
  }
  
  // Question 2: Technical term question
  if (technicalTerms.length > 0) {
    questions.push(`2. **Definition Check:** What is ${technicalTerms[0].term}? Provide a detailed explanation and one example of its application.`)
  }
  
  // Question 3: Scenario-based question
  if (concepts.length > 1) {
    questions.push(`3. **Scenario Application:** Imagine you are teaching this topic to a fellow student. Using the concepts from your notes, create a real-world scenario that demonstrates how ${concepts[0].substring(0, 20)}... and ${concepts[1]?.substring(0, 20)}... work together. What would be the key points you would emphasize?`)
  } else {
    questions.push(`3. **Critical Thinking:** How might the concepts in your notes apply to a different field or context? Provide at least two specific examples.`)
  }
  
  return questions.join('\n\n')
}

function generateGlossary(technicalTerms: Array<{term: string, definition: string}>): string {
  if (technicalTerms.length === 0) {
    return 'No specific technical terms were identified in your notes. Focus on understanding the key concepts and relationships presented in the material.'
  }
  
  return technicalTerms.map(({ term, definition }) => {
    return `**${term.charAt(0).toUpperCase() + term.slice(1)}:** ${definition}`
  }).join('\n\n')
}