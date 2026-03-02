export const NAV_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Contact', href: '#contact' },
] as const;

export const SKILLS = {
  'AI / LLMs': {
    color: 'cyan',
    items: [
      { name: 'RAG Pipelines', level: 95 },
      { name: 'LangChain', level: 90 },
      { name: 'OpenAI API', level: 95 },
      { name: 'Vector DBs', level: 88 },
      { name: 'Fine-Tuning', level: 85 },
      { name: 'Prompt Eng.', level: 92 },
    ],
  },
  'Full Stack': {
    color: 'blue',
    items: [
      { name: 'Next.js 14', level: 95 },
      { name: 'TypeScript', level: 93 },
      { name: 'Node.js', level: 90 },
      { name: 'PostgreSQL', level: 88 },
      { name: 'React', level: 95 },
      { name: 'GraphQL', level: 85 },
    ],
  },
  'DevOps': {
    color: 'violet',
    items: [
      { name: 'Docker', level: 90 },
      { name: 'AWS', level: 88 },
      { name: 'Vercel', level: 92 },
      { name: 'CI/CD', level: 87 },
      { name: 'Terraform', level: 82 },
      { name: 'K8s', level: 80 },
    ],
  },
} as const;

// export const PROJECTS = [
//   {
//     title: 'Smart iNotebook',
//     description: 'Enterprise RAG system processing 50K+ documents daily with sub-second query response. Multi-tenant architecture serving Fortune 500 clients.',
//     tech: ['LangChain', 'OpenAI', 'Pinecone', 'Next.js', 'PostgreSQL'],
//     result: 'Reduced document processing time by 87%',
//     metric: '87%',
//     metricLabel: 'faster processing',
//     image: '/images/project-1.jpg',
//   },
//   {
//     title: 'Autonomous Agent Orchestration Platform',
//     description: 'Multi-agent system coordinating 12+ specialized AI agents for end-to-end workflow automation in logistics and supply chain.',
//     tech: ['GPT-4', 'LangGraph', 'Redis', 'Node.js', 'Docker'],
//     result: 'Reduced operational overhead by 40%',
//     metric: '40%',
//     metricLabel: 'less overhead',
//     image: '/images/project-2.jpg',
//   },
//   {
//     title: 'Real-Time ML Pipeline Infrastructure',
//     description: 'Scalable data pipeline handling 2M+ events/hour with real-time model inference and automated retraining cycles on AWS.',
//     tech: ['AWS', 'Terraform', 'Python', 'Kafka', 'K8s'],
//     result: 'Scaled to 2M+ events/hour with 99.97% uptime',
//     metric: '2M+',
//     metricLabel: 'events/hour',
//     image: '/images/project-3.jpg',
//   },
// ] as const;
export const PROJECTS = [
  {
    title: "Smart iNotebook",
    description: "An AI Knowledge Architect that transforms raw, messy notes into high-retention study systems with automated quizzes and glossaries.",
    tech: ["OpenAI", "Markdown", "React", "Tailwind"],
    result: "Automated Study System",
    metric: "100%",
    metricLabel: "retention focus",
    image: "/images/inotebook.jpeg", // Replace with a screenshot of your iNotebook
    link: "/projects/inotebook" 
  },
  {
    title: "AI Text-to-UI Generator",
    description: "A specialized tool for frontend engineers that converts natural language prompts into production-ready Tailwind CSS components.",
    tech: ["Tailwind CSS", "Lucide Icons", "GPT-4o", "HTML5"],
    result: "Instant UI Generation",
    metric: "0s",
    metricLabel: "manual coding",
    image: "/images/Texttoui.jpeg", // Replace with a screenshot of your UI Gen
    link: "/projects/text-to-ui"
  },
  {
    title: "FinSense Analyzer",
    description: "Quantitative financial sentiment tool that analyzes market news headlines to predict market 'vibes' with strict JSON data output.",
    tech: ["Sentiment Analysis", "Python", "JSON", "Finance API"],
    result: "Predictive Market Vibes",
    metric: "0.0-1.0",
    metricLabel: "confidence score",
    image: "/images/finsense.jpeg", // Replace with a screenshot of FinSense
    link: "/projects/finsense"
  }
] as const;

export const STATS = [
  { value: '10+', label: 'AI Systems Deployed' },
  { value: '5x', label: 'Operational Efficiency Gain' },
  { value: '99.9%', label: 'System Uptime' },
  { value: '<200ms', label: 'Avg Response Time' },
] as const;
