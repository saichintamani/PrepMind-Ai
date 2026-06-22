import React, { useEffect, useState } from 'react';
import { Flame, TrendingUp, BookOpen, Code, Target } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import QuickActions from '../components/dashboard/QuickActions';
import WelcomeOnboarding from '../components/dashboard/WelcomeOnboarding';
import Card from '../components/common/Card';
import { useAuthStore } from '../store/authStore';
import {
  usePreferencesStore,
  FOCUS_AREA_LABELS,
} from '../store/preferencesStore';
import { useToastStore } from '../store/toastStore';

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const {
    hasCompletedOnboarding,
    focusArea,
    dailyStudyGoalMinutes,
    studyStreak,
    recordStudySession,
  } = usePreferencesStore();
  const toast = useToastStore();
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const { streak, isNewDay } = recordStudySession();
    if (isNewDay && streak > 1) {
      toast.show(`${streak} day study streak! Keep it up.`, 'success');
    }
  }, [recordStudySession, toast]);

  useEffect(() => {
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, [hasCompletedOnboarding]);

  const displayName = user?.name?.split(' ')[0] || user?.email?.split('@')[0] || 'there';
  const goalProgress = Math.min(100, Math.round((studyStreak > 0 ? 1 : 0) * 100));

  const focusTips: Record<string, string> = {
    placement: 'Upload a resume and run a mock HR interview this week.',
    exams: 'Generate quizzes from your latest PDF notes.',
    coding: 'Solve 2 medium problems on the coding prep page.',
    interviews: 'Schedule a 30-minute technical mock interview.',
    general: 'Review flashcards for 15 minutes today.',
  };

  return (
    <DashboardLayout>
      <WelcomeOnboarding
        isOpen={showOnboarding}
        onComplete={() => setShowOnboarding(false)}
        userName={user?.name}
      />

      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-brand-500 uppercase tracking-wide">
              {FOCUS_AREA_LABELS[focusArea]}
            </p>
            <h1 className="text-4xl font-bold text-navy-800 dark:text-earth-100">
              Welcome back, {displayName}!
            </h1>
            <p className="text-earth-500 dark:text-earth-400 mt-2">
              Daily goal: {dailyStudyGoalMinutes} min · {focusTips[focusArea]}
            </p>
          </div>
          <Card variant="glass" className="sm:min-w-[200px]">
            <div className="flex items-center gap-3">
              <Target size={28} className="text-brand-500" />
              <div>
                <p className="text-sm text-earth-500">Today&apos;s focus</p>
                <p className="text-2xl font-bold text-navy-800 dark:text-earth-100">{goalProgress}%</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">Study Streak</p>
                <p className="text-3xl font-bold text-navy-800 dark:text-earth-100 mt-1">
                  {studyStreak} {studyStreak === 1 ? 'day' : 'days'}
                </p>
              </div>
              <Flame size={32} className="text-brand-500" />
            </div>
          </Card>

          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">Placement Score</p>
                <p className="text-3xl font-bold text-navy-800 dark:text-earth-100 mt-1">78%</p>
              </div>
              <TrendingUp size={32} className="text-brand-500" />
            </div>
          </Card>

          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">Topics Covered</p>
                <p className="text-3xl font-bold text-navy-800 dark:text-earth-100 mt-1">24</p>
              </div>
              <BookOpen size={32} className="text-brand-500" />
            </div>
          </Card>

          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">Problems Solved</p>
                <p className="text-3xl font-bold text-navy-800 dark:text-earth-100 mt-1">156</p>
              </div>
              <Code size={32} className="text-brand-500" />
            </div>
          </Card>
        </div>

        <QuickActions />

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-semibold text-navy-800 dark:text-earth-100 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex gap-4 pb-4 border-b border-earth-200 dark:border-navy-600">
                <div className="w-10 h-10 bg-brand-100 dark:bg-navy-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen size={20} className="text-brand-500" />
                </div>
                <div>
                  <p className="font-semibold text-navy-800 dark:text-earth-100">Created quiz from PDF</p>
                  <p className="text-sm text-earth-500">Data Structures & Algorithms</p>
                </div>
              </div>
              <div className="flex gap-4 pb-4 border-b border-earth-200 dark:border-navy-600">
                <div className="w-10 h-10 bg-brand-100 dark:bg-navy-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code size={20} className="text-brand-500" />
                </div>
                <div>
                  <p className="font-semibold text-navy-800 dark:text-earth-100">Solved coding problem</p>
                  <p className="text-sm text-earth-500">Two Sum - Easy</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-brand-100 dark:bg-navy-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Flame size={20} className="text-brand-500" />
                </div>
                <div>
                  <p className="font-semibold text-navy-800 dark:text-earth-100">
                    {studyStreak > 0 ? `${studyStreak}-day streak active` : 'Start your streak today'}
                  </p>
                  <p className="text-sm text-earth-500">Visit daily to build momentum</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-navy-800 dark:text-earth-100 mb-4">Recommended Next Steps</h2>
            <div className="space-y-3">
              <div className="p-4 bg-brand-50 dark:bg-navy-700 rounded-lg border border-brand-200 dark:border-brand-800">
                <p className="font-semibold text-navy-800 dark:text-earth-100">Hit your {dailyStudyGoalMinutes}-minute goal</p>
                <p className="text-sm text-earth-500 mt-1">Use quick actions above to start a focused session</p>
                <div className="w-full bg-brand-200 dark:bg-navy-600 rounded-full h-2 mt-2">
                  <div className="bg-gradient-brand h-full rounded-full" style={{ width: `${goalProgress}%` }} />
                </div>
              </div>
              <div className="p-4 bg-earth-100 dark:bg-navy-800 rounded-lg border border-earth-200 dark:border-navy-600">
                <p className="font-semibold text-navy-800 dark:text-earth-100">{focusTips[focusArea]}</p>
                <p className="text-sm text-earth-500 mt-1">Personalized for {FOCUS_AREA_LABELS[focusArea].toLowerCase()}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
