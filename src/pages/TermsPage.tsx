import React from 'react';
import { Link } from 'react-router-dom';
import { CUSTOMER_CARE, CUSTOMER_CARE_MAILTO } from '../constants/support';

const TermsPage: React.FC = () => (
  <main className="section-container py-16 max-w-3xl">
    <h1 className="text-4xl font-bold text-navy-800 dark:text-earth-100 mb-6">Terms of Service</h1>
    <div className="space-y-4 text-earth-600 dark:text-earth-400 leading-relaxed text-sm">
      <p>By using PrepMind AI you agree to use the platform for lawful educational purposes only.</p>
      <p>Subscription fees are billed monthly. You may cancel anytime from your billing settings.</p>
      <p>AI-generated content is for study assistance and should be verified before academic or professional submission.</p>
      <p>
        For disputes, billing issues, or any concerns, contact{' '}
        <strong>{CUSTOMER_CARE.name}</strong> at{' '}
        <a href={CUSTOMER_CARE_MAILTO} className="text-brand-500 hover:text-brand-600">
          {CUSTOMER_CARE.email}
        </a>{' '}
        or visit our <Link to="/support" className="text-brand-500 hover:text-brand-600">Customer Care portal</Link>.
      </p>
      <p className="text-earth-400">Last updated: May 24, 2026</p>
    </div>
  </main>
);

export default TermsPage;
