import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import {
  usePreferencesStore,
  FocusArea,
  FOCUS_AREA_LABELS,
} from '../../store/preferencesStore';

interface WelcomeOnboardingProps {
  isOpen: boolean;
  onComplete: () => void;
  userName?: string;
}

const focusOptions: FocusArea[] = ['placement', 'exams', 'coding', 'interviews', 'general'];
const goalOptions = [15, 30, 45, 60, 90];

const WelcomeOnboarding: React.FC<WelcomeOnboardingProps> = ({ isOpen, onComplete, userName }) => {
  const { setPreferences } = usePreferencesStore();
  const [step, setStep] = useState(0);
  const [focusArea, setFocusArea] = useState<FocusArea>('placement');
  const [dailyStudyGoalMinutes, setDailyStudyGoalMinutes] = useState(30);

  const finish = () => {
    setPreferences({
      focusArea,
      dailyStudyGoalMinutes,
      hasCompletedOnboarding: true,
    });
    onComplete();
  };

  return (
    <Modal isOpen={isOpen} onClose={finish} title="" size="md" closeOnBackdropClick={false}>
      {step === 0 && (
        <div className="space-y-6 text-center py-2">
          <div className="text-5xl">🎓</div>
          <div>
            <h2 className="text-2xl font-bold text-navy-800 dark:text-earth-100">
              Welcome{userName ? `, ${userName.split(' ')[0]}` : ''}!
            </h2>
            <p className="text-earth-500 dark:text-earth-400 mt-2">
              Let us personalize PrepMind for your goals. This takes under a minute.
            </p>
          </div>
          <Button className="btn-primary w-full" onClick={() => setStep(1)}>
            Get started
          </Button>
          <button type="button" onClick={finish} className="text-sm text-earth-500 hover:text-brand-500">
            Skip for now
          </button>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-navy-800 dark:text-earth-100">What are you preparing for?</h2>
            <p className="text-sm text-earth-500 mt-1">We will tailor recommendations to your focus.</p>
          </div>
          <div className="space-y-2">
            {focusOptions.map((option) => (
              <label
                key={option}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  focusArea === option
                    ? 'border-brand-500 bg-brand-50 dark:bg-navy-700'
                    : 'border-earth-200 dark:border-navy-600 hover:bg-earth-50 dark:hover:bg-navy-800'
                }`}
              >
                <input
                  type="radio"
                  name="focus"
                  checked={focusArea === option}
                  onChange={() => setFocusArea(option)}
                  className="w-4 h-4 accent-brand-500"
                />
                <span className="font-medium text-navy-800 dark:text-earth-100">{FOCUS_AREA_LABELS[option]}</span>
              </label>
            ))}
          </div>
          <Button className="btn-primary w-full" onClick={() => setStep(2)}>
            Continue
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-navy-800 dark:text-earth-100">Daily study goal</h2>
            <p className="text-sm text-earth-500 mt-1">How many minutes do you want to study each day?</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {goalOptions.map((minutes) => (
              <button
                key={minutes}
                type="button"
                onClick={() => setDailyStudyGoalMinutes(minutes)}
                className={`py-3 rounded-lg font-semibold border transition-colors ${
                  dailyStudyGoalMinutes === minutes
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-earth-200 dark:border-navy-600 text-navy-800 dark:text-earth-100 hover:border-brand-300'
                }`}
              >
                {minutes}m
              </button>
            ))}
          </div>
          <Button className="btn-primary w-full" onClick={finish}>
            Start learning
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default WelcomeOnboarding;
