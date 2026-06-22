import React from 'react';
import { Check } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { PLANS } from '../../constants';

interface PlanPickerModalProps {
  isOpen: boolean;
  currentPlanId: string;
  onClose: () => void;
  onSelect: (planId: string) => void;
}

const PlanPickerModal: React.FC<PlanPickerModalProps> = ({ isOpen, currentPlanId, onClose, onSelect }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Change plan" size="lg">
      <div className="grid md:grid-cols-3 gap-4">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`p-4 rounded-lg border-2 transition-colors ${
              currentPlanId === plan.id
                ? 'border-brand-500 bg-brand-50 dark:bg-navy-700'
                : 'border-earth-200 dark:border-navy-600 hover:border-brand-300'
            }`}
          >
            <h3 className="font-bold text-navy-800 dark:text-earth-100">{plan.name}</h3>
            <p className="text-2xl font-bold text-brand-500 mt-2">₹{plan.price}</p>
            <p className="text-xs text-earth-500 mb-3">/month</p>
            <ul className="text-xs text-earth-600 dark:text-earth-400 space-y-1 mb-4 max-h-32 overflow-auto">
              {plan.features.slice(0, 4).map((f, i) => (
                <li key={i} className="flex gap-1">
                  <Check size={12} className="text-brand-500 flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={currentPlanId === plan.id ? 'secondary' : 'primary'}
              size="sm"
              fullWidth
              disabled={currentPlanId === plan.id}
              onClick={() => onSelect(plan.id)}
            >
              {currentPlanId === plan.id ? 'Current plan' : 'Select'}
            </Button>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default PlanPickerModal;
