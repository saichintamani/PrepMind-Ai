import React from 'react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import { TrendingUp, Calendar, BookOpen, Target } from 'lucide-react';

const WEEKLY_ACTIVITY = [
  { day: 'Mon', hours: 2, minutes: 15 },
  { day: 'Tue', hours: 1, minutes: 45 },
  { day: 'Wed', hours: 3, minutes: 20 },
  { day: 'Thu', hours: 2, minutes: 0 },
  { day: 'Fri', hours: 4, minutes: 10 },
  { day: 'Sat', hours: 5, minutes: 30 },
  { day: 'Sun', hours: 1, minutes: 20 },
];

const AnalyticsPage: React.FC = () => {
  const maxMinutes = Math.max(...WEEKLY_ACTIVITY.map((d) => d.hours * 60 + d.minutes));

  const stats = [
    { label: 'Total Study Hours', value: '42.5', unit: 'hours', icon: Calendar, trend: '+12%' },
    { label: 'Topics Covered', value: '28', unit: 'topics', icon: BookOpen, trend: '+3' },
    { label: 'Quiz Accuracy', value: '78%', unit: 'average', icon: Target, trend: '+5%' },
    { label: 'Placement Score', value: '82%', unit: 'current', icon: TrendingUp, trend: '+8%' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-navy-800">Analytics & Progress</h1>
          <p className="text-earth-500 mt-2">Track your learning journey and achievements</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} variant="glass">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-earth-500">{stat.label}</p>
                    <Icon size={24} className="text-brand-500" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-navy-800">{stat.value}</p>
                    <span className="text-sm text-earth-500">{stat.unit}</span>
                  </div>
                  <p className="text-sm text-green-600 font-semibold">{stat.trend} this month</p>
                </div>
              </Card>
            );
          })}
        </div>

        <Card>
          <h2 className="text-2xl font-bold text-navy-800 mb-6">Weekly Activity</h2>
          <div className="space-y-4">
            {WEEKLY_ACTIVITY.map((entry) => {
              const totalMinutes = entry.hours * 60 + entry.minutes;
              const width = Math.round((totalMinutes / maxMinutes) * 100);
              return (
                <div key={entry.day} className="flex items-center gap-4">
                  <span className="w-12 font-semibold text-navy-800 dark:text-earth-100">{entry.day}</span>
                  <div className="flex-1 bg-earth-200 dark:bg-navy-700 rounded-full h-4 overflow-hidden">
                    <div className="bg-gradient-brand h-full rounded-full" style={{ width: `${width}%` }} />
                  </div>
                  <span className="w-16 text-right text-sm text-earth-500">
                    {entry.hours}h {entry.minutes}m
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-navy-800 mb-6">Learning Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'Data Structures', progress: 85 },
              { name: 'Algorithms', progress: 72 },
              { name: 'System Design', progress: 58 },
              { name: 'Web Development', progress: 91 },
              { name: 'Databases', progress: 64 },
              { name: 'DevOps', progress: 45 },
            ].map((category) => (
              <div key={category.name} className="space-y-2">
                <p className="font-semibold text-navy-800">{category.name}</p>
                <div className="bg-earth-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-brand h-full"
                    style={{ width: `${category.progress}%` }}
                  />
                </div>
                <p className="text-sm text-earth-500">{category.progress}%</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
