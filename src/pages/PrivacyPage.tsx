import React from 'react';
import { CUSTOMER_CARE, CUSTOMER_CARE_MAILTO } from '../constants/support';

const PrivacyPage: React.FC = () => (
  <main className="section-container py-16 max-w-3xl">
    <h1 className="text-4xl font-bold text-navy-800 dark:text-earth-100 mb-6">Privacy Policy</h1>
    <div className="space-y-4 text-earth-600 dark:text-earth-400 leading-relaxed text-sm">
      <p>PrepMind AI collects account information (email, name) and study content you upload to provide our services.</p>
      <p>We use industry-standard encryption and never sell your personal data to third parties.</p>
      <p>
        For privacy requests, account deletion, or data export, contact our customer care team:{' '}
        <strong>{CUSTOMER_CARE.name}</strong> at{' '}
        <a href={CUSTOMER_CARE_MAILTO} className="text-brand-500 hover:text-brand-600">
          {CUSTOMER_CARE.email}
        </a>
        .
      </p>
      <p className="text-earth-400">Last updated: May 24, 2026</p>
    </div>
  </main>
);

export default PrivacyPage;
