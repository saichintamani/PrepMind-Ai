import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CustomerCareCard from '../components/support/CustomerCareCard';
import { CUSTOMER_CARE, CUSTOMER_CARE_MAILTO } from '../constants/support';

const ContactPage: React.FC = () => {
  return (
    <main className="section-container py-16 max-w-3xl">
      <h1 className="text-4xl font-bold text-navy-800 dark:text-earth-100 mb-2">Contact us</h1>
      <p className="text-earth-500 dark:text-earth-400 mb-8">
        For support, issues, or any concerns, use our Customer Care portal or email us directly.
      </p>

      <CustomerCareCard />

      <div className="mt-10 p-6 rounded-lg border border-earth-200 dark:border-navy-600 bg-white dark:bg-navy-800">
        <h2 className="text-lg font-semibold text-navy-800 dark:text-earth-100 mb-2">Quick contact</h2>
        <p className="text-earth-600 dark:text-earth-400">
          <span className="font-medium text-navy-800 dark:text-earth-200">{CUSTOMER_CARE.name}</span>
          <br />
          <a href={CUSTOMER_CARE_MAILTO} className="text-brand-500 hover:text-brand-600">
            {CUSTOMER_CARE.email}
          </a>
        </p>
      </div>

      <Link
        to="/support"
        className="mt-8 inline-flex items-center gap-2 text-brand-500 font-semibold hover:text-brand-600"
      >
        Open full Customer Care portal
        <ArrowRight size={18} />
      </Link>
    </main>
  );
};

export default ContactPage;
