import React from 'react';
import { Code2, Trophy, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const CodingPrepPage: React.FC = () => {
  const problems = [
    { id: '1', title: 'Two Sum', difficulty: 'easy', company: 'Google', solved: true },
    { id: '2', title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', company: 'Facebook', solved: true },
    { id: '3', title: 'Median of Two Sorted Arrays', difficulty: 'hard', company: 'Google', solved: false },
    { id: '4', title: 'Reverse Integer', difficulty: 'easy', company: 'Microsoft', solved: false },
  ];

  const getDifficultyColor = (d: string) => {
    switch (d) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-navy-800">Coding Interview Prep</h1>
          <p className="text-earth-500 mt-2">Master data structures and algorithms</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">Problems Solved</p>
                <p className="text-3xl font-bold text-navy-800 mt-1">156</p>
              </div>
              <Trophy size={32} className="text-brand-500" />
            </div>
          </Card>

          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">Success Rate</p>
                <p className="text-3xl font-bold text-navy-800 mt-1">78%</p>
              </div>
              <TrendingUp size={32} className="text-brand-500" />
            </div>
          </Card>

          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">Current Streak</p>
                <p className="text-3xl font-bold text-navy-800 mt-1">12 days</p>
              </div>
              <Code2 size={32} className="text-brand-500" />
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-navy-800">Practice Problems</h2>
            <select className="px-4 py-2 rounded-lg border border-earth-200 focus:border-brand-500 focus:outline-none">
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="space-y-3">
            {problems.map((problem) => (
              <div key={problem.id} className="flex items-center justify-between p-4 border border-earth-200 rounded-lg hover:border-brand-300 transition">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded border-2 ${problem.solved ? 'bg-green-500 border-green-500' : 'border-earth-300'}`}>
                      {problem.solved && <span className="text-white text-sm">✓</span>}
                    </div>
                    <h3 className="font-semibold text-navy-800">{problem.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 mt-2 ml-9">
                    <span className={`text-xs px-3 py-1 rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-xs text-earth-500">{problem.company}</span>
                  </div>
                </div>
                <Button variant="secondary" size="sm">
                  {problem.solved ? 'Review' : 'Solve'}
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default CodingPrepPage;
