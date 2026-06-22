import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { StoredInterview } from '../../store/studyStore';
import { formatRelativeTime } from '../../store/studyStore';

interface FeedbackDetailModalProps {
  interview: StoredInterview | null;
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackDetailModal: React.FC<FeedbackDetailModalProps> = ({ interview, isOpen, onClose }) => {
  if (!interview) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${interview.type === 'hr' ? 'HR' : 'Technical'} Interview Feedback`}
      size="lg"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <p className="text-sm text-earth-500">{formatRelativeTime(interview.createdAt)} · {interview.duration} min</p>
          <p className="text-3xl font-bold text-brand-500">{interview.score}%</p>
        </div>

        <div className="grid grid-cols-3 gap-4 p-4 bg-earth-50 dark:bg-navy-900 rounded-lg">
          <div className="text-center">
            <p className="text-2xl font-bold text-navy-800 dark:text-earth-100">{interview.communicationScore}</p>
            <p className="text-xs text-earth-500">Communication</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-navy-800 dark:text-earth-100">{interview.technicalScore}</p>
            <p className="text-xs text-earth-500">Technical</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-navy-800 dark:text-earth-100">{interview.confidenceScore}</p>
            <p className="text-xs text-earth-500">Confidence</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-navy-800 dark:text-earth-100 mb-2">Overall feedback</h4>
          <p className="text-earth-600 dark:text-earth-400">{interview.feedback}</p>
        </div>

        <div>
          <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Strengths</h4>
          <ul className="list-disc list-inside text-earth-600 dark:text-earth-400 space-y-1">
            {interview.strengths.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Improvements</h4>
          <ul className="list-disc list-inside text-earth-600 dark:text-earth-400 space-y-1">
            {interview.improvements.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-navy-800 dark:text-earth-100 mb-2">Questions asked</h4>
          <ol className="list-decimal list-inside text-sm text-earth-600 dark:text-earth-400 space-y-2">
            {interview.questionsAsked.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ol>
        </div>

        <Button className="btn-primary w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default FeedbackDetailModal;
