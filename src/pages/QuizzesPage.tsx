import React from 'react';
import { PlayCircle, Trash2 } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const QuizzesPage: React.FC = () => {
  const quizzes = [
    { id: '1', title: 'Data Structures Basics', questions: 20, score: 85, date: 'Today' },
    { id: '2', title: 'Arrays and Lists', questions: 15, score: 92, date: 'Yesterday' },
    { id: '3', title: 'Sorting Algorithms', questions: 25, score: 78, date: '2 days ago' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-navy-800">Quizzes</h1>
            <p className="text-earth-500 mt-2">Practice with AI-generated quizzes</p>
          </div>
          <Button className="btn-primary">Create Quiz</Button>
        </div>

        <div className="grid gap-4">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} variant="glass">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-navy-800">{quiz.title}</h3>
                  <p className="text-earth-500 text-sm mt-1">{quiz.questions} questions • {quiz.date}</p>
                </div>
                <div className="text-center mr-6">
                  <p className="text-3xl font-bold text-brand-500">{quiz.score}%</p>
                  <p className="text-sm text-earth-500">Score</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="secondary" size="sm" className="flex items-center gap-2">
                    <PlayCircle size={18} />
                    Retry
                  </Button>
                  <button className="p-2 hover:bg-red-50 rounded-lg text-red-600">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QuizzesPage;
