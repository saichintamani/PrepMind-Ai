import React, { useMemo, useState } from 'react';
import { Code2, Trophy, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import CodingProblemModal from '../components/study/CodingProblemModal';
import { CODING_PROBLEMS } from '../data/studyLibrary';
import { useStudyStore } from '../store/studyStore';
import { useToastStore } from '../store/toastStore';

const CodingPrepPage: React.FC = () => {
  const { codingProgress, toggleCodingSolved, setCodingReviewed } = useStudyStore();
  const toast = useToastStore();

  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [activeProblemId, setActiveProblemId] = useState<string | null>(null);

  const problems = useMemo(() => {
    return CODING_PROBLEMS.filter(
      (p) => difficultyFilter === 'all' || p.difficulty === difficultyFilter
    );
  }, [difficultyFilter]);

  const stats = useMemo(() => {
    const solved = CODING_PROBLEMS.filter((p) => codingProgress[p.id]?.solved).length;
    const total = CODING_PROBLEMS.length;
    return {
      solved,
      rate: total ? Math.round((solved / total) * 100) : 0,
      streak: solved > 0 ? Math.min(solved * 2, 14) : 0,
    };
  }, [codingProgress]);

  const activeProblem = CODING_PROBLEMS.find((p) => p.id === activeProblemId) ?? null;

  const getDifficultyColor = (d: string) => {
    switch (d) {
      case 'easy':
        return 'text-green-600 bg-green-50 dark:bg-green-950';
      case 'medium':
        return 'text-orange-600 bg-orange-50 dark:bg-orange-950';
      case 'hard':
        return 'text-red-600 bg-red-50 dark:bg-red-950';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-navy-800 dark:text-earth-100">Coding Interview Prep</h1>
          <p className="text-earth-500 dark:text-earth-400 mt-2">Master data structures and algorithms</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">Problems Solved</p>
                <p className="text-3xl font-bold text-navy-800 dark:text-earth-100 mt-1">{stats.solved}</p>
              </div>
              <Trophy size={32} className="text-brand-500" />
            </div>
          </Card>
          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">Success Rate</p>
                <p className="text-3xl font-bold text-navy-800 dark:text-earth-100 mt-1">{stats.rate}%</p>
              </div>
              <TrendingUp size={32} className="text-brand-500" />
            </div>
          </Card>
          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">Practice streak</p>
                <p className="text-3xl font-bold text-navy-800 dark:text-earth-100 mt-1">{stats.streak} days</p>
              </div>
              <Code2 size={32} className="text-brand-500" />
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-navy-800 dark:text-earth-100">Practice Problems</h2>
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-earth-200 dark:border-navy-600 dark:bg-navy-900 dark:text-earth-100 focus:border-brand-500 focus:outline-none"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="space-y-3">
            {problems.map((problem) => {
              const solved = codingProgress[problem.id]?.solved ?? false;
              return (
                <div
                  key={problem.id}
                  className="flex items-center justify-between p-4 border border-earth-200 dark:border-navy-600 rounded-lg hover:border-brand-300 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                          solved ? 'bg-green-500 border-green-500' : 'border-earth-300 dark:border-navy-500'
                        }`}
                      >
                        {solved && <span className="text-white text-sm">✓</span>}
                      </div>
                      <h3 className="font-semibold text-navy-800 dark:text-earth-100">{problem.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 mt-2 ml-9">
                      <span className={`text-xs px-3 py-1 rounded-full ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                      </span>
                      <span className="text-xs text-earth-500">{problem.company}</span>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setActiveProblemId(problem.id)}
                  >
                    {solved ? 'Review' : 'Solve'}
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>

        <CodingProblemModal
          problem={activeProblem}
          isOpen={!!activeProblemId}
          solved={activeProblem ? !!codingProgress[activeProblem.id]?.solved : false}
          onClose={() => setActiveProblemId(null)}
          onMarkSolved={() => {
            if (!activeProblem) return;
            if (codingProgress[activeProblem.id]?.solved) {
              setCodingReviewed(activeProblem.id);
              toast.show('Problem reviewed', 'success');
            } else {
              toggleCodingSolved(activeProblem.id);
              toast.show('Marked as solved!', 'success');
            }
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default CodingPrepPage;
