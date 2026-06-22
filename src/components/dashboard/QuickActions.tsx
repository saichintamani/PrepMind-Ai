import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, Code, Mic, FileText, BarChart3 } from 'lucide-react';
import Card from '../common/Card';
import { FEATURE_ROUTES } from '../../constants/featureRoutes';

const actions = [
  { label: 'Upload notes', icon: BookOpen, path: FEATURE_ROUTES['AI-Powered Notes'] },
  { label: 'Take a quiz', icon: Brain, path: FEATURE_ROUTES['Smart Quizzes'] },
  { label: 'Code practice', icon: Code, path: FEATURE_ROUTES['Coding Practice'] },
  { label: 'Mock interview', icon: Mic, path: FEATURE_ROUTES['AI Mock Interviews'] },
  { label: 'Analyze resume', icon: FileText, path: FEATURE_ROUTES['Resume Analyzer'] },
  { label: 'View progress', icon: BarChart3, path: FEATURE_ROUTES['Progress Analytics'] },
];

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <h2 className="text-xl font-semibold text-navy-800 dark:text-earth-100 mb-4">Quick actions</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-earth-200 dark:border-navy-600 hover:border-brand-400 hover:bg-brand-50 dark:hover:bg-navy-700 transition-colors text-center"
            >
              <div className="w-10 h-10 bg-gradient-brand rounded-lg flex items-center justify-center">
                <Icon size={20} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-navy-800 dark:text-earth-100">{action.label}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickActions;
