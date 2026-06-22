import React, { useState } from 'react';
import { PlayCircle, Trash2 } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import QuizPlayerModal from '../components/study/QuizPlayerModal';
import { useStudyStore, StoredQuiz, formatRelativeTime } from '../store/studyStore';
import { QUIZ_TOPICS } from '../data/studyLibrary';
import { useToastStore } from '../store/toastStore';

const QuizzesPage: React.FC = () => {
  const { quizzes, createQuiz, saveQuizAttempt, deleteQuiz } = useStudyStore();
  const toast = useToastStore();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [topic, setTopic] = useState('Machine Learning');
  const [activeQuiz, setActiveQuiz] = useState<StoredQuiz | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleCreate = () => {
    const quiz = createQuiz(topic);
    if (!quiz) {
      toast.show('No questions available for this topic', 'warning');
      return;
    }
    toast.show(`Created "${quiz.title}" with ${quiz.questions.length} questions`, 'success');
    setIsCreateOpen(false);
    setActiveQuiz(quiz);
    setIsPlaying(true);
  };

  const startQuiz = (quiz: StoredQuiz) => {
    setActiveQuiz(quiz);
    setIsPlaying(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-navy-800 dark:text-earth-100">Quizzes</h1>
            <p className="text-earth-500 dark:text-earth-400 mt-2">
              ML, DSA & placement quizzes from your study library
            </p>
          </div>
          <Button className="btn-primary" onClick={() => setIsCreateOpen(true)}>
            Create Quiz
          </Button>
        </div>

        {quizzes.length === 0 ? (
          <Card>
            <p className="text-center text-earth-500 py-8">
              No quizzes yet. Create one from Machine Learning, Deep Learning, DSA, or Placement topics.
            </p>
          </Card>
        ) : (
          <div className="grid gap-4">
            {quizzes.map((quiz) => (
              <Card key={quiz.id} variant="glass">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="text-xl font-semibold text-navy-800 dark:text-earth-100">{quiz.title}</h3>
                    <p className="text-earth-500 text-sm mt-1">
                      {quiz.questions.length} questions ·{' '}
                      {quiz.lastAttemptAt ? formatRelativeTime(quiz.lastAttemptAt) : formatRelativeTime(quiz.createdAt)}
                    </p>
                  </div>
                  {quiz.score !== undefined && (
                    <div className="text-center">
                      <p className="text-3xl font-bold text-brand-500">{quiz.score}%</p>
                      <p className="text-sm text-earth-500">Score</p>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Button variant="secondary" size="sm" className="flex items-center gap-2" onClick={() => startQuiz(quiz)}>
                      <PlayCircle size={18} />
                      {quiz.score !== undefined ? 'Retry' : 'Start'}
                    </Button>
                    <button
                      type="button"
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg text-red-600"
                      onClick={() => {
                        deleteQuiz(quiz.id);
                        toast.show('Quiz deleted', 'info');
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Quiz" size="md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy-800 dark:text-earth-100 mb-2">Topic</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-earth-200 dark:border-navy-600 dark:bg-navy-900 dark:text-earth-100"
              >
                {QUIZ_TOPICS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-sm text-earth-500">5 random questions will be pulled from the reference question bank.</p>
            <Button className="btn-primary w-full" onClick={handleCreate}>
              Create & start quiz
            </Button>
          </div>
        </Modal>

        <QuizPlayerModal
          quiz={activeQuiz}
          isOpen={isPlaying}
          onClose={() => setIsPlaying(false)}
          onComplete={(score) => {
            if (activeQuiz) {
              saveQuizAttempt(activeQuiz.id, score);
              toast.show(`Quiz finished! Score: ${score}%`, 'success');
            }
          }}
        />
      </div>
    </DashboardLayout>
  );
};

export default QuizzesPage;
