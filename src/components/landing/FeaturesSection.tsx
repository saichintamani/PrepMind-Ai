import React from 'react';
import { BookOpen, Brain, Code, Mic, FileText, BarChart3, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import { FEATURE_ROUTES } from '../../constants/featureRoutes';
import { useAuthStore } from '../../store/authStore';

const features = [
  {
    icon: BookOpen,
    title: 'AI-Powered Notes',
    description: 'Upload PDFs and get AI-generated summaries, flashcards, and revision notes instantly.',
    gradient: 'from-blue-500 to-cyan-500',
    color: 'text-blue-500',
  },
  {
    icon: Brain,
    title: 'Smart Quizzes',
    description: 'Generate personalized quizzes and viva questions from your study materials.',
    gradient: 'from-purple-500 to-pink-500',
    color: 'text-purple-500',
  },
  {
    icon: Code,
    title: 'Coding Practice',
    description: 'Master DSA and coding interview questions with company-specific preparation paths.',
    gradient: 'from-green-500 to-emerald-500',
    color: 'text-green-500',
  },
  {
    icon: Mic,
    title: 'AI Mock Interviews',
    description: 'Practice with AI interviewers for technical and HR rounds with detailed feedback.',
    gradient: 'from-orange-500 to-red-500',
    color: 'text-orange-500',
  },
  {
    icon: FileText,
    title: 'Resume Analyzer',
    description: 'Get ATS-optimized suggestions to make your resume stand out to recruiters.',
    gradient: 'from-yellow-500 to-amber-500',
    color: 'text-yellow-500',
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    description: 'Track your learning journey with detailed insights and personalized recommendations.',
    gradient: 'from-indigo-500 to-purple-500',
    color: 'text-indigo-500',
  },
];

const FeaturesSection: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const openFeature = (title: string) => {
    const path = FEATURE_ROUTES[title];
    if (!path) return;
    if (user) {
      navigate(path);
      return;
    }
    navigate(`/signup?returnUrl=${encodeURIComponent(path)}`);
  };

  return (
    <section id="features" className="section-container scroll-mt-24 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="text-center space-y-4 mb-16 animate-fade-in-up">
        <span className="inline-block px-4 py-2 bg-brand-50 rounded-full text-sm font-semibold text-brand-600 glass">
          ⭐ Powerful Features
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-navy-800">Everything You Need</h2>
        <p className="text-xl text-earth-500 max-w-2xl mx-auto">
          Everything you need to excel in your studies and land your dream job
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <button
              key={feature.title}
              type="button"
              onClick={() => openFeature(feature.title)}
              className="text-left w-full animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card 
                variant="glass" 
                className="space-y-4 h-full hover:shadow-xl hover:border-brand-200 transition-all duration-300 group cursor-pointer border-2 border-transparent hover:border-brand-200 hover:-translate-y-2"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <Icon size={28} className="text-white" />
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-navy-800 group-hover:text-brand-600 transition-colors">{feature.title}</h3>
                  <p className="text-earth-500 mt-2 group-hover:text-earth-600 transition-colors">{feature.description}</p>
                  
                  <div className="flex items-center gap-2 text-brand-500 text-sm font-semibold mt-4 group-hover:gap-3 transition-all">
                    Explore
                    <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{
                  backgroundImage: `linear-gradient(to bottom right, rgba(99, 102, 241, 0.1), rgba(147, 51, 234, 0.1))`
                }} />
              </Card>
            </button>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="inline-block glass p-6 rounded-xl">
          <p className="text-earth-600 font-semibold mb-4">Ready to get started?</p>
          <button
            onClick={() => navigate('/signup')}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-brand text-white font-semibold rounded-lg hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
          >
            Start Learning Today
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
