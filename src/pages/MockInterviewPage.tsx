import React, { useMemo, useState } from 'react';
import { Mic, BarChart3, Play } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import InterviewSessionModal from '../components/study/InterviewSessionModal';
import FeedbackDetailModal from '../components/study/FeedbackDetailModal';
import { useStudyStore, formatRelativeTime } from '../store/studyStore';
import { useToastStore } from '../store/toastStore';

const MockInterviewPage: React.FC = () => {
  const { interviews, addInterview } = useStudyStore();
  const toast = useToastStore();

  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isSessionOpen, setIsSessionOpen] = useState(false);
  const [feedbackInterview, setFeedbackInterview] = useState<string | null>(null);

  const [interviewType, setInterviewType] = useState<'technical' | 'hr'>('technical');
  const [duration, setDuration] = useState(30);

  const stats = useMemo(() => {
    if (interviews.length === 0) {
      return { count: 0, avg: 0, best: 0, totalMinutes: 0 };
    }
    const scores = interviews.map((i) => i.score);
    const totalMinutes = interviews.reduce((s, i) => s + i.duration, 0);
    return {
      count: interviews.length,
      avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      best: Math.max(...scores),
      totalMinutes,
    };
  }, [interviews]);

  const selectedFeedback = interviews.find((i) => i.id === feedbackInterview) ?? null;

  const startSession = () => {
    setIsSetupOpen(false);
    setIsSessionOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-navy-800 dark:text-earth-100">AI Mock Interviews</h1>
            <p className="text-earth-500 dark:text-earth-400 mt-2">
              Practice with ML & placement questions from your reference library
            </p>
          </div>
          <Button className="btn-primary flex items-center gap-2" onClick={() => setIsSetupOpen(true)}>
            <Mic size={20} />
            Start Interview
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card variant="glass">
            <p className="text-sm text-earth-500">Interviews Completed</p>
            <p className="text-3xl font-bold text-navy-800 dark:text-earth-100 mt-1">{stats.count}</p>
          </Card>
          <Card variant="glass">
            <p className="text-sm text-earth-500">Average Score</p>
            <p className="text-3xl font-bold text-navy-800 dark:text-earth-100 mt-1">{stats.avg}%</p>
          </Card>
          <Card variant="glass">
            <p className="text-sm text-earth-500">Best Score</p>
            <p className="text-3xl font-bold text-navy-800 dark:text-earth-100 mt-1">{stats.best}%</p>
          </Card>
          <Card variant="glass">
            <p className="text-sm text-earth-500">Total Practice Time</p>
            <p className="text-3xl font-bold text-navy-800 dark:text-earth-100 mt-1">
              {Math.floor(stats.totalMinutes / 60)}h {stats.totalMinutes % 60}m
            </p>
          </Card>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-navy-800 dark:text-earth-100 mb-6">Interview History</h2>
          {interviews.length === 0 ? (
            <Card>
              <p className="text-earth-500 text-center py-8">No interviews yet. Start your first mock interview!</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {interviews.map((interview) => (
                <Card key={interview.id} variant="glass">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-navy-800 dark:text-earth-100 capitalize">
                          {interview.type} Interview
                        </h3>
                        <p className="text-sm text-earth-500 mt-1">
                          {formatRelativeTime(interview.createdAt)} · {interview.duration} minutes
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-brand-500">{interview.score}%</p>
                        <p className="text-sm text-earth-500">Overall Score</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 p-4 bg-white dark:bg-navy-900 bg-opacity-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-navy-800 dark:text-earth-100">
                          {interview.communicationScore}
                        </p>
                        <p className="text-xs text-earth-500">Communication</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-navy-800 dark:text-earth-100">
                          {interview.technicalScore}
                        </p>
                        <p className="text-xs text-earth-500">Technical</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-navy-800 dark:text-earth-100">
                          {interview.confidenceScore}
                        </p>
                        <p className="text-xs text-earth-500">Confidence</p>
                      </div>
                    </div>

                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => setFeedbackInterview(interview.id)}
                    >
                      <BarChart3 size={18} />
                      View Detailed Feedback
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Modal isOpen={isSetupOpen} onClose={() => setIsSetupOpen(false)} title="Start Mock Interview" size="md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy-800 dark:text-earth-100 mb-2">
                Interview Type
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 border border-earth-200 dark:border-navy-600 rounded-lg cursor-pointer hover:bg-brand-50 dark:hover:bg-navy-700">
                  <input
                    type="radio"
                    name="type"
                    checked={interviewType === 'technical'}
                    onChange={() => setInterviewType('technical')}
                    className="w-4 h-4"
                  />
                  <span className="font-medium text-navy-800 dark:text-earth-100">Technical Interview</span>
                </label>
                <label className="flex items-center gap-3 p-3 border border-earth-200 dark:border-navy-600 rounded-lg cursor-pointer hover:bg-brand-50 dark:hover:bg-navy-700">
                  <input
                    type="radio"
                    name="type"
                    checked={interviewType === 'hr'}
                    onChange={() => setInterviewType('hr')}
                    className="w-4 h-4"
                  />
                  <span className="font-medium text-navy-800 dark:text-earth-100">HR Interview</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-800 dark:text-earth-100 mb-2">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-lg border border-earth-200 dark:border-navy-600 dark:bg-navy-900 dark:text-earth-100 focus:border-brand-500 focus:outline-none"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="secondary" onClick={() => setIsSetupOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="btn-primary flex-1 flex items-center justify-center gap-2" onClick={startSession}>
                <Play size={18} />
                Start Interview
              </Button>
            </div>
          </div>
        </Modal>

        <InterviewSessionModal
          isOpen={isSessionOpen}
          type={interviewType}
          durationMinutes={duration}
          onClose={() => setIsSessionOpen(false)}
          onComplete={(result) => {
            addInterview({
              type: interviewType,
              duration,
              ...result,
            });
            toast.show('Interview complete! Feedback saved.', 'success');
            setIsSessionOpen(false);
          }}
        />

        <FeedbackDetailModal
          interview={selectedFeedback}
          isOpen={!!feedbackInterview}
          onClose={() => setFeedbackInterview(null)}
        />
      </div>
    </DashboardLayout>
  );
};

export default MockInterviewPage;
