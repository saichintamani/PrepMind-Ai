import React from 'react';
import { BookOpen, Brain, Code, Mic, FileText, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../common/Card';
import { FEATURE_ROUTES } from '../../constants/featureRoutes';
import { useAuthStore } from '../../store/authStore';

const features = [
  {
    icon: BookOpen,
    title: 'AI-Powered Notes',
    description: 'Upload PDFs and get AI-generated summaries, flashcards, and revision notes instantly.',
  },
  {
    icon: Brain,
    title: 'Smart Quizzes',
    description: 'Generate personalized quizzes and viva questions from your study materials.',
  },
  {
    icon: Code,
    title: 'Coding Practice',
    description: 'Master DSA and coding interview questions with company-specific preparation paths.',
  },
  {
    icon: Mic,
    title: 'AI Mock Interviews',
    description: 'Practice with AI interviewers for technical and HR rounds with detailed feedback.',
  },
  {
    icon: FileText,
    title: 'Resume Analyzer',
    description: 'Get ATS-optimized suggestions to make your resume stand out to recruiters.',
  },
  {
    icon: BarChart3,
    title: 'Progress Analytics',
    description: 'Track your learning journey with detailed insights and personalized recommendations.',
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
    <section id="features" className="section-container scroll-mt-24">
      <div className="text-center space-y-4 mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-navy-800">Powerful Features</h2>
        <p className="text-xl text-earth-500 max-w-2xl mx-auto">
          Everything you need to excel in your studies and land your dream job
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <button
              key={feature.title}
              type="button"
              onClick={() => openFeature(feature.title)}
              className="text-left w-full"
            >
              <Card variant="glass" className="space-y-4 h-full hover:shadow-lg hover:border-brand-200 transition-all cursor-pointer">
                <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center">
                  <Icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-navy-800">{feature.title}</h3>
                  <p className="text-earth-500 mt-2">{feature.description}</p>
                  <p className="text-brand-500 text-sm font-semibold mt-3">Explore →</p>
                </div>
              </Card>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturesSection;
