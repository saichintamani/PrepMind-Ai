import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { StoredQuiz } from '../../store/studyStore';

interface QuizPlayerModalProps {
  quiz: StoredQuiz | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
}

const QuizPlayerModal: React.FC<QuizPlayerModalProps> = ({ quiz, isOpen, onClose, onComplete }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!quiz) return null;

  const question = quiz.questions[index];
  const isLast = index === quiz.questions.length - 1;

  const reset = () => {
    setIndex(0);
    setSelected(null);
    setCorrectCount(0);
    setFinished(false);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const submitAnswer = () => {
    if (selected === null) return;
    const isCorrect = selected === question.correctAnswer;
    const newCorrect = correctCount + (isCorrect ? 1 : 0);
    if (isLast) {
      const score = Math.round((newCorrect / quiz.questions.length) * 100);
      setCorrectCount(newCorrect);
      setFinished(true);
      onComplete(score);
    } else {
      setCorrectCount(newCorrect);
      setIndex(index + 1);
      setSelected(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={finished ? 'Quiz Complete' : quiz.title} size="lg">
      {finished ? (
        <div className="text-center space-y-4">
          <p className="text-5xl font-bold text-brand-500">
            {Math.round((correctCount / quiz.questions.length) * 100)}%
          </p>
          <p className="text-earth-500">
            {correctCount} of {quiz.questions.length} correct
          </p>
          <Button className="btn-primary w-full" onClick={handleClose}>
            Done
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <p className="text-sm text-earth-500">
            Question {index + 1} of {quiz.questions.length} · {question.topic}
          </p>
          <p className="text-lg font-semibold text-navy-800 dark:text-earth-100">{question.question}</p>
          <div className="space-y-2">
            {question.options.map((opt, i) => (
              <label
                key={i}
                className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                  selected === i
                    ? 'border-brand-500 bg-brand-50 dark:bg-navy-700'
                    : 'border-earth-200 dark:border-navy-600 hover:bg-earth-50 dark:hover:bg-navy-800'
                }`}
              >
                <input
                  type="radio"
                  name="quiz-opt"
                  checked={selected === i}
                  onChange={() => setSelected(i)}
                  className="w-4 h-4"
                />
                <span className="text-navy-800 dark:text-earth-100">{opt}</span>
              </label>
            ))}
          </div>
          <Button className="btn-primary w-full" onClick={submitAnswer} disabled={selected === null}>
            {isLast ? 'Finish quiz' : 'Next question'}
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default QuizPlayerModal;
