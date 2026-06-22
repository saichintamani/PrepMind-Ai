import React from 'react';
import { Mail, User, Headphones, Clock } from 'lucide-react';
import { CUSTOMER_CARE, CUSTOMER_CARE_MAILTO } from '../../constants/support';

interface CustomerCareCardProps {
  variant?: 'default' | 'compact';
}

const CustomerCareCard: React.FC<CustomerCareCardProps> = ({ variant = 'default' }) => {
  if (variant === 'compact') {
    return (
      <div className="p-4 rounded-lg border border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-navy-800">
        <p className="text-sm font-semibold text-navy-800 dark:text-earth-100 flex items-center gap-2">
          <Headphones size={16} className="text-brand-500" />
          Customer Care
        </p>
        <p className="text-sm text-earth-600 dark:text-earth-400 mt-2">
          {CUSTOMER_CARE.name} ·{' '}
          <a href={CUSTOMER_CARE_MAILTO} className="text-brand-500 hover:text-brand-600 font-medium">
            {CUSTOMER_CARE.email}
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border-2 border-brand-200 dark:border-brand-800 bg-gradient-to-br from-brand-50 to-white dark:from-navy-800 dark:to-navy-900 p-6 md:p-8 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 bg-gradient-brand rounded-xl flex items-center justify-center flex-shrink-0">
          <Headphones size={28} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide">
            PrepMind AI Customer Care
          </p>
          <h2 className="text-2xl font-bold text-navy-800 dark:text-earth-100 mt-1">We are here to help</h2>
          <p className="text-earth-600 dark:text-earth-400 mt-2 leading-relaxed">
            For any issues, feedback, billing questions, or technical difficulties, contact our customer care
            team directly. We aim to respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-4 bg-white dark:bg-navy-900 rounded-lg border border-earth-200 dark:border-navy-600">
          <User size={22} className="text-brand-500 flex-shrink-0" />
          <div>
            <p className="text-xs text-earth-500">Contact person</p>
            <p className="font-semibold text-navy-800 dark:text-earth-100">{CUSTOMER_CARE.name}</p>
            <p className="text-xs text-earth-500">{CUSTOMER_CARE.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 bg-white dark:bg-navy-900 rounded-lg border border-earth-200 dark:border-navy-600">
          <Mail size={22} className="text-brand-500 flex-shrink-0" />
          <div>
            <p className="text-xs text-earth-500">Email (primary support)</p>
            <a
              href={CUSTOMER_CARE_MAILTO}
              className="font-semibold text-brand-500 hover:text-brand-600 break-all"
            >
              {CUSTOMER_CARE.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-earth-500">
        <Clock size={16} />
        <span>Typical response within 24–48 hours on business days</span>
      </div>

      <a
        href={CUSTOMER_CARE_MAILTO}
        className="mt-6 inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-gradient-brand text-white font-semibold rounded-lg hover:shadow-glow transition-all"
      >
        <Mail size={18} />
        Email {CUSTOMER_CARE.name.split(' ')[0]}
      </a>
    </div>
  );
};

export default CustomerCareCard;
