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
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'quizzes',
    label: 'Quizzes',
    icon: Brain,
    title: 'Practice with smart quizzes',
    description: 'Auto-generated MCQs and viva questions tailored to your uploaded materials.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'coding',
    label: 'Coding',
    icon: Code,
    title: 'Interview-ready coding prep',
    description: 'Company-specific DSA paths, timed challenges, and solution walkthroughs.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'interviews',
    label: 'Interviews',
    icon: Mic,
    title: 'AI mock interviews',
    description: 'Technical and HR simulations with scores for communication and confidence.',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: FileText,
    title: 'ATS resume feedback',
    description: 'Actionable suggestions to improve structure, keywords, and impact.',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    title: 'Track your progress',
    description: 'See study streaks, weak topics, and personalized next-step recommendations.',
    color: 'from-indigo-500 to-purple-500',
  },
];

const DemoSection: React.FC = () => {
  const [activeId, setActiveId] = useState(demos[0].id);
  const active = demos.find((d) => d.id === activeId) ?? demos[0];
  const ActiveIcon = active.icon;

  return (
    <section id="demo" className="section-container scroll-mt-24 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
      </div>

      <div className="text-center space-y-4 mb-16 animate-fade-in-up">
        <span className="inline-block px-4 py-2 bg-brand-50 rounded-full text-sm font-semibold text-brand-600 glass">
          🎬 Live Demo
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-navy-800">See PrepMind in action</h2>
        <p className="text-xl text-earth-500 max-w-2xl mx-auto">
          Explore the core workflows students use every day to study smarter and prepare faster.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        {demos.map((demo, index) => (
          <button
            key={demo.id}
            type="button"
            onClick={() => setActiveId(demo.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeId === demo.id
                ? 'bg-gradient-brand text-white shadow-glow scale-105'
                : 'bg-white text-navy-800 border-2 border-earth-200 hover:border-brand-300 hover:shadow-md'
            }`}
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            {demo.label}
          </button>
        ))}
      </div>

      <Card 
        variant="elevated" 
        className="max-w-4xl mx-auto animate-fade-in-up hover:shadow-xl transition-all duration-300"
        style={{ animationDelay: '0.2s' }}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className={`w-16 h-16 bg-gradient-to-br ${active.color} rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
              <ActiveIcon size={32} className="text-white" />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-bold text-navy-800">{active.title}</h3>
              <p className="text-earth-500 leading-relaxed text-lg">{active.description}</p>
            </div>
          </div>
          
          <div className={`relative bg-gradient-to-br ${active.color} rounded-3xl p-8 min-h-80 flex items-center justify-center overflow-hidden group`}>
            {/* Animated background */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300 animate-pulse" />
            
            <div className="relative z-10 text-center space-y-4 animate-scale-in">
              <div className="text-6xl animate-bounce-in">✨</div>
              <p className="font-semibold text-white text-lg">{active.label} workspace preview</p>
              <p className="text-white text-opacity-80 text-sm">Sign up free to unlock the full dashboard experience.</p>
              <div className="flex gap-1 justify-center pt-2">
                <div className="w-2 h-2 bg-white rounded-full opacity-60 animate-pulse" />
                <div className="w-2 h-2 bg-white rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-white rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-white opacity-10 rounded-lg animate-float" />
            <div className="absolute bottom-4 left-4 w-8 h-8 bg-white opacity-10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </Card>
    </section>
  );
};

export default DemoSection;
