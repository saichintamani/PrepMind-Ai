import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { getQuestionsForInterview, type LibraryQuestion } from '../../data/studyLibrary';

interface InterviewSessionModalProps {
  isOpen: boolean;
  type: 'technical' | 'hr';
  durationMinutes: number;
  onClose: () => void;
  onComplete: (result: {
    score: number;
    communicationScore: number;
    technicalScore: number;
    confidenceScore: number;
    feedback: string;
    strengths: string[];
    improvements: string[];
    questionsAsked: string[];
  }) => void;
}

const InterviewSessionModal: React.FC<InterviewSessionModalProps> = ({
  isOpen,
  type,
  durationMinutes,
  onClose,
  onComplete,
}) => {
  const [questions, setQuestions] = useState<LibraryQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [phase, setPhase] = useState<'intro' | 'session' | 'done'>('intro');
  const [secondsLeft, setSecondsLeft] = useState(durationMinutes * 60);

  useEffect(() => {
    if (isOpen) {
      setQuestions(getQuestionsForInterview(type, 5));
      setIndex(0);
      setAnswers([]);
      setCurrentAnswer('');
      setPhase('intro');
      setSecondsLeft(durationMinutes * 60);
    }
  }, [isOpen, type, durationMinutes]);

  useEffect(() => {
    if (phase !== 'session' || !isOpen) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase, isOpen]);

  const scoreAnswer = (text: string, expected: string): number => {
    const words = text.toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length < 8) return 45;
    if (words.length < 20) return 65;
    const keywords = expected.toLowerCase().split(/\s+/).filter((w) => w.length > 4);
    const hits = keywords.filter((k) => text.toLowerCase().includes(k)).length;
    return Math.min(95, 55 + hits * 5 + Math.min(words.length, 40));
  };

  const finishInterview = (allAnswers: string[]) => {
    const scores = questions.map((q, i) => scoreAnswer(allAnswers[i] ?? '', q.answer));
    const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 70;
    const communication = Math.round(avg + (type === 'hr' ? 5 : 0));
    const technical = Math.round(avg + (type === 'technical' ? 5 : -3));
    const confidence = Math.round(avg + (allAnswers.filter((a) => a.length > 30).length / questions.length) * 10);

    onComplete({
      score: Math.round((communication + technical + confidence) / 3),
      communicationScore: Math.min(99, communication),
      technicalScore: Math.min(99, technical),
      confidenceScore: Math.min(99, confidence),
      feedback:
        avg >= 75
          ? 'Strong structure and depth. Practice concise openings and add metrics to examples.'
          : 'Good effort. Expand answers with STAR format and link to ML/project experience.',
      strengths:
        avg >= 70
          ? ['Clear communication', 'Relevant technical vocabulary', 'Completed all questions']
          : ['Willingness to attempt all questions', 'Room to add more structure'],
      improvements: [
        'Use 2–3 sentence intro then details',
        'Reference projects from your resume',
        'Practice ML fundamentals from the reference library',
      ],
      questionsAsked: questions.map((q) => q.question),
    });
    setPhase('done');
  };

  const nextQuestion = () => {
    const updated = [...answers];
    updated[index] = currentAnswer;
    setAnswers(updated);
    setCurrentAnswer('');

    if (index >= questions.length - 1) {
      finishInterview(updated);
      return;
    }
    setIndex(index + 1);
  };

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={phase === 'done' ? 'Interview Complete' : `${type === 'hr' ? 'HR' : 'Technical'} Mock Interview`}
      size="lg"
      closeOnBackdropClick={phase === 'done'}
    >
      {phase === 'intro' && (
        <div className="space-y-4">
          <p className="text-earth-500">
            You will answer {questions.length} questions in {durationMinutes} minutes. Questions are drawn from the ML
            & placement reference library.
          </p>
          <Button className="btn-primary w-full" onClick={() => setPhase('session')}>
            Begin interview
          </Button>
        </div>
      )}

      {phase === 'session' && questions[index] && (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-earth-500">
            <span>
              Question {index + 1} / {questions.length}
            </span>
            <span className="font-mono text-brand-500">{formatTime(secondsLeft)}</span>
          </div>
          <p className="text-lg font-semibold text-navy-800 dark:text-earth-100">{questions[index].question}</p>
          <textarea
            className="w-full px-4 py-3 rounded-lg border-2 border-earth-200 dark:border-navy-600 dark:bg-navy-900 dark:text-earth-100 focus:border-brand-500 focus:outline-none min-h-[120px]"
            placeholder="Type your answer here (aim for 3–5 sentences)..."
            value={currentAnswer}
            onChange={(e) => setCurrentAnswer(e.target.value)}
          />
          <Button className="btn-primary w-full" onClick={nextQuestion}>
            {index >= questions.length - 1 ? 'Submit & get feedback' : 'Next question'}
          </Button>
        </div>
      )}

      {phase === 'done' && (
        <div className="text-center space-y-4">
          <p className="text-earth-500">Your feedback has been saved to interview history.</p>
          <Button className="btn-primary w-full" onClick={onClose}>
            Close
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default InterviewSessionModal;
