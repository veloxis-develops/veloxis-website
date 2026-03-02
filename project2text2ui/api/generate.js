export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  // AI Simulation Logic
  // In a real app, this would call an LLM like GPT-4 or Claude.
  // Here we simulate it with high-quality templates based on keywords.

  let code = '';
  let title = 'Generated Component';
  let category = 'Other';

  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes('hero')) {
    title = 'Modern Hero Section';
    category = 'Hero';
    code = `<section class="relative bg-white overflow-hidden py-24 px-6 sm:py-32 lg:px-8">
  <div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
  <div class="mx-auto max-w-2xl text-center">
    <div class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10 mb-8">
      New feature: AI Generation
    </div>
    <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
      Design your vision with <span class="text-indigo-600">natural language</span>
    </h1>
    <p class="mt-6 text-lg leading-8 text-gray-600">
      Stop wasting hours on boilerplate. Describe what you need, and our AI will generate production-ready Tailwind CSS components in seconds.
    </p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <button class="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all">
        Get Started Free
      </button>
      <button class="text-sm font-semibold leading-6 text-gray-900 flex items-center gap-1 group">
        Live Demo <span class="group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </div>
  </div>
</section>`;
  } else if (lowerPrompt.includes('card') || lowerPrompt.includes('feature')) {
    title = 'Feature Card Grid';
    category = 'Features';
    code = `<div class="bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-2xl lg:text-center">
      <h2 class="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need to scale your app</p>
    </div>
    <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
      <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
        <div class="flex flex-col p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
          <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
            <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            Push to deploy
          </dt>
          <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
            <p class="flex-auto">Morbi viverra dui mi enim sed. Tellus iaculis integer id scelerisque tincidunt vehicula nisi.</p>
          </dd>
        </div>
        <div class="flex flex-col p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
          <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
            <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            SSL certificates
          </dt>
          <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
            <p class="flex-auto">Sit quis amet fariqum et et. Faucibus sed quis amet fariqum et et. Faucibus sed quis amet fariqum.</p>
          </dd>
        </div>
        <div class="flex flex-col p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
          <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
            <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </div>
            Simple queues
          </dt>
          <dd class="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
            <p class="flex-auto">Quisque est vel vulputate cursus. Risus nunc egestas feugiat massa. Quis amet fariqum et et.</p>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</div>`;
  } else if (lowerPrompt.includes('pricing')) {
    title = 'SaaS Pricing Table';
    category = 'Pricing';
    code = `<div class="bg-white py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <div class="mx-auto max-w-4xl text-center">
      <h2 class="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
      <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Plans that scale with you</p>
    </div>
    <div class="mt-16 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
      <div class="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 hover:border-indigo-600 transition-colors">
        <div>
          <h3 class="text-lg font-semibold leading-8 text-gray-900">Starter</h3>
          <p class="mt-4 text-sm leading-6 text-gray-600">Essential features for individuals.</p>
          <p class="mt-6 flex items-baseline gap-x-1">
            <span class="text-4xl font-bold tracking-tight text-gray-900">$19</span>
            <span class="text-sm font-semibold leading-6 text-gray-600">/mo</span>
          </p>
          <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600">
            <li class="flex gap-x-3"><span class="text-indigo-600">✓</span> 5 projects</li>
            <li class="flex gap-x-3"><span class="text-indigo-600">✓</span> Basic support</li>
          </ul>
        </div>
        <button class="mt-8 block w-full rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 bg-indigo-50 text-indigo-600 hover:bg-indigo-100">Get started</button>
      </div>
      <div class="flex flex-col justify-between rounded-3xl bg-indigo-600 p-8 ring-1 ring-indigo-600 xl:p-10 shadow-xl scale-105">
        <div>
          <h3 class="text-lg font-semibold leading-8 text-white">Pro</h3>
          <p class="mt-4 text-sm leading-6 text-indigo-100">Most popular for small teams.</p>
          <p class="mt-6 flex items-baseline gap-x-1">
            <span class="text-4xl font-bold tracking-tight text-white">$49</span>
            <span class="text-sm font-semibold leading-6 text-indigo-100">/mo</span>
          </p>
          <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-indigo-100">
            <li class="flex gap-x-3">✓ 25 projects</li>
            <li class="flex gap-x-3">✓ Priority support</li>
            <li class="flex gap-x-3">✓ Custom domains</li>
          </ul>
        </div>
        <button class="mt-8 block w-full rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 bg-white text-indigo-600 hover:bg-indigo-50">Get started</button>
      </div>
      <div class="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 hover:border-indigo-600 transition-colors">
        <div>
          <h3 class="text-lg font-semibold leading-8 text-gray-900">Enterprise</h3>
          <p class="mt-4 text-sm leading-6 text-gray-600">Custom solutions for large orgs.</p>
          <p class="mt-6 flex items-baseline gap-x-1">
            <span class="text-4xl font-bold tracking-tight text-gray-900">$99</span>
            <span class="text-sm font-semibold leading-6 text-gray-600">/mo</span>
          </p>
          <ul role="list" class="mt-8 space-y-3 text-sm leading-6 text-gray-600">
            <li class="flex gap-x-3"><span class="text-indigo-600">✓</span> Unlimited projects</li>
            <li class="flex gap-x-3"><span class="text-indigo-600">✓</span> 24/7 support</li>
          </ul>
        </div>
        <button class="mt-8 block w-full rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 bg-indigo-50 text-indigo-600 hover:bg-indigo-100">Contact sales</button>
      </div>
    </div>
  </div>
</div>`;
  } else if (lowerPrompt.includes('footer')) {
    title = 'Minimalist Footer';
    category = 'Footer';
    code = `<footer class="bg-white border-t border-gray-100">
  <div class="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
    <div class="flex justify-center space-x-6 md:order-2">
      <a href="#" class="text-gray-400 hover:text-gray-500">Twitter</a>
      <a href="#" class="text-gray-400 hover:text-gray-500">GitHub</a>
      <a href="#" class="text-gray-400 hover:text-gray-500">LinkedIn</a>
    </div>
    <div class="mt-8 md:order-1 md:mt-0">
      <p class="text-center text-xs leading-5 text-gray-500">&copy; 2024 Design Arena Inc. All rights reserved.</p>
    </div>
  </div>
</footer>`;
  } else {
    // Default fallback - a nice generic card
    title = 'Modern UI Card';
    category = 'Component';
    code = `<div class="max-w-sm mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
  <img src="https://picsum.photos/seed/${Math.random()}/600/400" alt="Placeholder" class="w-full h-48 object-cover" />
  <div class="p-6">
    <div class="flex items-center justify-between mb-2">
      <span class="px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full">New Design</span>
      <span class="text-sm text-gray-500">Oct 24, 2024</span>
    </div>
    <h3 class="text-xl font-bold text-gray-900 mb-2">AI Generated Component</h3>
    <p class="text-gray-600 text-sm leading-relaxed mb-4">
      This component was generated based on your natural language description. It uses clean Tailwind CSS classes and follows modern design principles.
    </p>
    <button class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
      View Details
    </button>
  </div>
</div>`;
  }

  // Simulate AI delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  return res.status(200).json({ code, title, category });
}
