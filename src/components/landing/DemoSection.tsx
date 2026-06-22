import React, { useState } from 'react';
import { BookOpen, Brain, Code, Mic, FileText, BarChart3 } from 'lucide-react';
import Card from '../common/Card';

const demos = [
  {
    id: 'notes',
    label: 'AI Notes',
    icon: BookOpen,
    title: 'Turn PDFs into study packs',
    description: 'Upload lecture slides and get summaries, key points, and flashcards in seconds.',
  },
  {
    id: 'quizzes',
    label: 'Quizzes',
    icon: Brain,
    title: 'Practice with smart quizzes',
    description: 'Auto-generated MCQs and viva questions tailored to your uploaded materials.',
  },
  {
    id: 'coding',
    label: 'Coding',
    icon: Code,
    title: 'Interview-ready coding prep',
    description: 'Company-specific DSA paths, timed challenges, and solution walkthroughs.',
  },
  {
    id: 'interviews',
    label: 'Interviews',
    icon: Mic,
    title: 'AI mock interviews',
    description: 'Technical and HR simulations with scores for communication and confidence.',
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: FileText,
    title: 'ATS resume feedback',
    description: 'Actionable suggestions to improve structure, keywords, and impact.',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    title: 'Track your progress',
    description: 'See study streaks, weak topics, and personalized next-step recommendations.',
  },
];

const DemoSection: React.FC = () => {
  const [activeId, setActiveId] = useState(demos[0].id);
  const active = demos.find((d) => d.id === activeId) ?? demos[0];
  const ActiveIcon = active.icon;

  return (
    <section id="demo" className="section-container bg-earth-50 scroll-mt-24">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-navy-800">See PrepMind in action</h2>
        <p className="text-xl text-earth-500 max-w-2xl mx-auto">
          Explore the core workflows students use every day to study smarter and prepare faster.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {demos.map((demo) => (
          <button
            key={demo.id}
            type="button"
            onClick={() => setActiveId(demo.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeId === demo.id
                ? 'bg-gradient-brand text-white shadow-glow'
                : 'bg-white text-navy-800 border border-earth-200 hover:border-brand-300'
            }`}
          >
            {demo.label}
          </button>
        ))}
      </div>

      <Card variant="elevated" className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="w-14 h-14 bg-gradient-brand rounded-xl flex items-center justify-center">
              <ActiveIcon size={28} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-navy-800">{active.title}</h3>
            <p className="text-earth-500 leading-relaxed">{active.description}</p>
          </div>
          <div className="bg-gradient-to-br from-brand-100 to-brand-50 rounded-2xl p-8 min-h-56 flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="text-5xl">✨</div>
              <p className="font-semibold text-navy-800">{active.label} workspace preview</p>
              <p className="text-sm text-earth-500">Sign up free to unlock the full dashboard experience.</p>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default DemoSection;
