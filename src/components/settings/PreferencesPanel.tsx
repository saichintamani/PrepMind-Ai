import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Moon, Sun, Monitor, Target, Layout, Bell, RefreshCw } from 'lucide-react';
import Card from '../common/Card';
import Button from '../common/Button';
import {
  usePreferencesStore,
  ThemeMode,
  FocusArea,
  FOCUS_AREA_LABELS,
} from '../../store/preferencesStore';
import { useToastStore } from '../../store/toastStore';
import { useStudyStore } from '../../store/studyStore';

const PreferencesPanel: React.FC = () => {
  const navigate = useNavigate();
  const {
    theme,
    focusArea,
    dailyStudyGoalMinutes,
    studyReminders,
    reminderHour,
    compactSidebar,
    studyStreak,
    totalStudySessions,
    setPreferences,
    resetOnboarding,
    recordStudySession,
    requestReminderPermission,
    syncActivityFromStudy,
  } = usePreferencesStore();
  const studyCounts = useStudyStore((s) => ({
    quizzes: s.quizzes.length,
    interviews: s.interviews.length,
    uploads: s.uploads.length,
  }));
  const toast = useToastStore();

  useEffect(() => {
    recordStudySession();
    syncActivityFromStudy();
  }, [recordStudySession, syncActivityFromStudy]);

  const save = (message: string) => toast.show(message, 'success');

  const formatHour = (h: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:00 ${period}`;
  };

  const handleRemindersToggle = async (enabled: boolean) => {
    setPreferences({ studyReminders: enabled });
    if (enabled) {
      const granted = await requestReminderPermission();
      if (granted) {
        save(`Reminders on · daily at ${formatHour(reminderHour)}`);
      } else if ('Notification' in window && Notification.permission === 'denied') {
        toast.show('Enable notifications in browser settings for reminders', 'warning');
      } else {
        save('Study reminders enabled (in-app)');
      }
    } else {
      save('Study reminders disabled');
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold text-navy-800 dark:text-earth-100 mb-6">Personalization</h2>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-semibold text-navy-800 dark:text-earth-100 mb-3">Theme</label>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { value: 'light' as ThemeMode, icon: Sun, label: 'Light' },
                { value: 'dark' as ThemeMode, icon: Moon, label: 'Dark' },
                { value: 'system' as ThemeMode, icon: Monitor, label: 'System' },
              ] as const
            ).map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setPreferences({ theme: value });
                  save(`Theme set to ${label.toLowerCase()}`);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors ${
                  theme === value
                    ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-navy-700 dark:text-brand-300'
                    : 'border-earth-200 dark:border-navy-600 text-navy-800 dark:text-earth-200 hover:border-brand-300'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy-800 dark:text-earth-100 mb-2 flex items-center gap-2">
            <Target size={18} />
            Primary focus
          </label>
          <select
            value={focusArea}
            onChange={(e) => {
              setPreferences({ focusArea: e.target.value as FocusArea });
              save('Focus area updated');
            }}
            className="w-full px-4 py-3 rounded-lg border-2 border-earth-200 dark:border-navy-600 dark:bg-navy-800 dark:text-earth-100 focus:border-brand-500 focus:outline-none"
          >
            {(Object.keys(FOCUS_AREA_LABELS) as FocusArea[]).map((key) => (
              <option key={key} value={key}>
                {FOCUS_AREA_LABELS[key]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-navy-800 dark:text-earth-100 mb-2">
            Daily study goal (minutes)
          </label>
          <input
            type="range"
            min={15}
            max={120}
            step={15}
            value={dailyStudyGoalMinutes}
            onChange={(e) => setPreferences({ dailyStudyGoalMinutes: Number(e.target.value) })}
            onMouseUp={() => save(`Daily goal set to ${dailyStudyGoalMinutes} minutes`)}
            onTouchEnd={() => save(`Daily goal set to ${dailyStudyGoalMinutes} minutes`)}
            className="w-full accent-brand-500"
          />
          <p className="text-sm text-earth-500 mt-1">{dailyStudyGoalMinutes} minutes per day</p>
        </div>

        <div className="space-y-3 p-4 border border-earth-200 dark:border-navy-600 rounded-lg">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={studyReminders}
              onChange={(e) => handleRemindersToggle(e.target.checked)}
              className="w-4 h-4 accent-brand-500"
            />
            <div className="flex items-center gap-2 flex-1">
              <Bell size={18} className="text-brand-500" />
              <div>
                <p className="font-semibold text-navy-800 dark:text-earth-100">Study reminders</p>
                <p className="text-sm text-earth-500">
                  {studyReminders
                    ? `Daily nudge at ${formatHour(reminderHour)}`
                    : 'Get nudges to hit your daily goal'}
                </p>
              </div>
            </div>
          </label>
          {studyReminders && (
            <div>
              <label className="text-xs text-earth-500 block mb-1">Reminder time</label>
              <input
                type="range"
                min={6}
                max={22}
                value={reminderHour}
                onChange={(e) => setPreferences({ reminderHour: Number(e.target.value) })}
                onMouseUp={() => save(`Reminder time: ${formatHour(reminderHour)}`)}
                className="w-full accent-brand-500"
              />
            </div>
          )}
        </div>

        <label className="flex items-center gap-3 p-4 border border-earth-200 dark:border-navy-600 rounded-lg cursor-pointer hover:bg-earth-50 dark:hover:bg-navy-800">
          <input
            type="checkbox"
            checked={compactSidebar}
            onChange={(e) => {
              setPreferences({ compactSidebar: e.target.checked });
              save(
                e.target.checked
                  ? 'Compact sidebar on — check navigation labels'
                  : 'Full sidebar labels restored'
              );
            }}
            className="w-4 h-4 accent-brand-500"
          />
          <div className="flex items-center gap-2">
            <Layout size={18} className="text-brand-500" />
            <div>
              <p className="font-semibold text-navy-800 dark:text-earth-100">Compact sidebar</p>
              <p className="text-sm text-earth-500">
                {compactSidebar ? 'Short labels active on desktop nav' : 'Show full navigation labels'}
              </p>
            </div>
          </div>
        </label>

        <div className="p-4 bg-earth-50 dark:bg-navy-800 rounded-lg border border-earth-200 dark:border-navy-600">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm text-earth-500">Your activity</p>
            <button
              type="button"
              onClick={() => {
                recordStudySession();
                syncActivityFromStudy();
                toast.show('Activity synced', 'success');
              }}
              className="text-brand-500 hover:text-brand-600 p-1"
              title="Sync activity"
            >
              <RefreshCw size={16} />
            </button>
          </div>
          <p className="text-lg font-bold text-navy-800 dark:text-earth-100 mt-1">
            {studyStreak} day streak · {totalStudySessions} sessions logged
          </p>
          <p className="text-xs text-earth-500 mt-2">
            {studyCounts.quizzes} quizzes · {studyCounts.interviews} interviews · {studyCounts.uploads} materials
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => {
            resetOnboarding();
            toast.show('Opening dashboard setup…', 'info');
            navigate('/dashboard');
          }}
        >
          Replay welcome setup
        </Button>
      </div>
    </Card>
  );
};

export default PreferencesPanel;
