import React, { useState } from 'react';
import { HelpCircle, Bug, CreditCard, Shield, MessageSquare } from 'lucide-react';
import CustomerCareCard from '../components/support/CustomerCareCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { CUSTOMER_CARE, CUSTOMER_CARE_MAILTO } from '../constants/support';

const topics = [
  {
    icon: Bug,
    title: 'Technical issues',
    description: 'App errors, login problems, uploads not working, or broken features.',
  },
  {
    icon: CreditCard,
    title: 'Billing & subscriptions',
    description: 'Plan changes, invoices, payment method, or cancellation questions.',
  },
  {
    icon: Shield,
    title: 'Account & privacy',
    description: 'Profile updates, data concerns, or account access help.',
  },
  {
    icon: MessageSquare,
    title: 'Feedback & suggestions',
    description: 'Ideas to improve PrepMind AI, study content, or new features.',
  },
];

const CustomerCarePage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${form.name}\nReply email: ${form.email}\n\n${form.message}`
    );
    const subject = encodeURIComponent(`[PrepMind AI] ${form.subject || 'Support request'}`);
    window.location.href = `${CUSTOMER_CARE_MAILTO}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <main className="section-container py-16 max-w-3xl">
      <div className="mb-10">
        <p className="text-sm font-semibold text-brand-500 uppercase tracking-wide flex items-center gap-2">
          <HelpCircle size={18} />
          Customer Care Portal
        </p>
        <h1 className="text-4xl font-bold text-navy-800 dark:text-earth-100 mt-2">Get help from our team</h1>
        <p className="text-earth-600 dark:text-earth-400 mt-3 text-lg leading-relaxed">
          If you face any consequences, difficulties, or concerns while using PrepMind AI, please reach out.
          Your message will be handled by our designated customer care contact below.
        </p>
      </div>

      <CustomerCareCard />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-navy-800 dark:text-earth-100 mb-6">What can we help with?</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {topics.map((topic) => {
            const Icon = topic.icon;
            return (
              <div
                key={topic.title}
                className="p-5 rounded-lg border border-earth-200 dark:border-navy-600 bg-white dark:bg-navy-800"
              >
                <Icon size={24} className="text-brand-500 mb-3" />
                <h3 className="font-semibold text-navy-800 dark:text-earth-100">{topic.title}</h3>
                <p className="text-sm text-earth-500 mt-1">{topic.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-12 p-6 rounded-xl bg-earth-50 dark:bg-navy-800 border border-earth-200 dark:border-navy-600">
        <h2 className="text-xl font-bold text-navy-800 dark:text-earth-100 mb-2">Send a support request</h2>
        <p className="text-sm text-earth-500 mb-6">
          This opens your email app addressed to{' '}
          <a href={CUSTOMER_CARE_MAILTO} className="text-brand-500 font-medium">
            {CUSTOMER_CARE.email}
          </a>{' '}
          ({CUSTOMER_CARE.name}).
        </p>

        {submitted ? (
          <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-300">
            Your email client should have opened. If not, email{' '}
            <a href={CUSTOMER_CARE_MAILTO} className="font-semibold underline">
              {CUSTOMER_CARE.email}
            </a>{' '}
            directly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Your name"
              name="name"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              required
            />
            <Input
              label="Your email (for reply)"
              name="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              required
            />
            <Input
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
              placeholder="e.g. Login issue, billing question"
              required
            />
            <div>
              <label className="block text-sm font-semibold text-navy-800 dark:text-earth-100 mb-2">Message</label>
              <textarea
                name="message"
                rows={5}
                className="w-full px-4 py-3 rounded-lg border-2 border-earth-200 dark:border-navy-600 dark:bg-navy-900 dark:text-earth-100 focus:border-brand-500 focus:outline-none"
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                placeholder="Describe the issue you are facing..."
                required
              />
            </div>
            <Button type="submit" className="btn-primary w-full">
              Open email to {CUSTOMER_CARE.name.split(' ')[0]}
            </Button>
          </form>
        )}
      </section>

      <p className="mt-8 text-center text-sm text-earth-500">
        Official customer care: <strong className="text-navy-800 dark:text-earth-200">{CUSTOMER_CARE.name}</strong> ·{' '}
        <a href={CUSTOMER_CARE_MAILTO} className="text-brand-500 hover:text-brand-600">
          {CUSTOMER_CARE.email}
        </a>
      </p>
    </main>
  );
};

export default CustomerCarePage;
