import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { LibraryCodingProblem } from '../../data/studyLibrary';

interface CodingProblemModalProps {
  problem: LibraryCodingProblem | null;
  isOpen: boolean;
  solved: boolean;
  onClose: () => void;
  onMarkSolved: () => void;
}

const CodingProblemModal: React.FC<CodingProblemModalProps> = ({
  problem,
  isOpen,
  solved,
  onClose,
  onMarkSolved,
}) => {
  const [showHints, setShowHints] = useState(false);
  const [notes, setNotes] = useState('');

  if (!problem) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={problem.title} size="lg">
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <span className="text-xs px-3 py-1 rounded-full bg-brand-100 text-brand-700 capitalize">{problem.difficulty}</span>
          <span className="text-xs px-3 py-1 rounded-full bg-earth-100 text-earth-600">{problem.company}</span>
          {problem.topics.map((t) => (
            <span key={t} className="text-xs px-3 py-1 rounded-full bg-earth-50 text-earth-500">
              {t}
            </span>
          ))}
        </div>

        <p className="text-navy-800 dark:text-earth-200">{problem.description}</p>

        <button
          type="button"
          onClick={() => setShowHints(!showHints)}
          className="text-sm text-brand-500 font-semibold"
        >
          {showHints ? 'Hide hints' : 'Show hints'}
        </button>
        {showHints && (
          <ul className="list-disc list-inside text-sm text-earth-600 dark:text-earth-400 space-y-1">
            {problem.hints.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        )}

        <textarea
          className="w-full px-4 py-3 rounded-lg border border-earth-200 dark:border-navy-600 dark:bg-navy-900 dark:text-earth-100 min-h-[100px] font-mono text-sm"
          placeholder="// Write your approach or pseudocode here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Close
          </Button>
          <Button
            className="btn-primary flex-1"
            onClick={() => {
              onMarkSolved();
              onClose();
            }}
          >
            {solved ? 'Mark reviewed again' : 'Mark as solved'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default CodingProblemModal;
