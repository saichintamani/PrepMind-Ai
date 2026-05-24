import React from 'react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import { Flame, TrendingUp, BookOpen, Code } from 'lucide-react';

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-navy-800">Welcome back!</h1>
          <p className="text-earth-500 mt-2">Here's your learning overview</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">Study Streak</p>
                <p className="text-3xl font-bold text-navy-800 mt-1">7 days</p>
              </div>
              <Flame size={32} className="text-brand-500" />
            </div>
          </Card>

          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">Placement Score</p>
                <p className="text-3xl font-bold text-navy-800 mt-1">78%</p>
              </div>
              <TrendingUp size={32} className="text-brand-500" />
            </div>
          </Card>

          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">Topics Covered</p>
                <p className="text-3xl font-bold text-navy-800 mt-1">24</p>
              </div>
              <BookOpen size={32} className="text-brand-500" />
            </div>
          </Card>

          <Card variant="glass">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-earth-500">Problems Solved</p>
                <p className="text-3xl font-bold text-navy-800 mt-1">156</p>
              </div>
              <Code size={32} className="text-brand-500" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-semibold text-navy-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex gap-4 pb-4 border-b border-earth-200">
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen size={20} className="text-brand-500" />
                </div>
                <div>
                  <p className="font-semibold text-navy-800">Created quiz from PDF</p>
                  <p className="text-sm text-earth-500">Data Structures & Algorithms</p>
                </div>
              </div>
              <div className="flex gap-4 pb-4 border-b border-earth-200">
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Code size={20} className="text-brand-500" />
                </div>
                <div>
                  <p className="font-semibold text-navy-800">Solved coding problem</p>
                  <p className="text-sm text-earth-500">Two Sum - Easy</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Flame size={20} className="text-brand-500" />
                </div>
                <div>
                  <p className="font-semibold text-navy-800">7-day streak achieved</p>
                  <p className="text-sm text-earth-500">Keep it up!</p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-navy-800 mb-4">Recommended Next Steps</h2>
            <div className="space-y-3">
              <div className="p-4 bg-brand-50 rounded-lg border border-brand-200">
                <p className="font-semibold text-navy-800">Complete coding problems for interviews</p>
                <p className="text-sm text-earth-500 mt-1">You've solved 156 problems. Target: 200</p>
                <div className="w-full bg-brand-200 rounded-full h-2 mt-2">
                  <div className="bg-gradient-brand h-full rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
              <div className="p-4 bg-earth-100 rounded-lg border border-earth-200">
                <p className="font-semibold text-navy-800">Practice mock interviews</p>
                <p className="text-sm text-earth-500 mt-1">No interviews scheduled this week</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
