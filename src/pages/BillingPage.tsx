import React from 'react';
import { CreditCard, Download, Check } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const BillingPage: React.FC = () => {
  const subscription = {
    plan: 'Pro',
    price: 499,
    startDate: 'May 24, 2026',
    renewalDate: 'June 24, 2026',
    status: 'active',
  };

  const features = [
    'Unlimited PDF uploads',
    'Unlimited summaries',
    'Unlimited quizzes',
    'Advanced resume analysis',
    'AI mock interviews (2/month)',
    'Detailed analytics',
    'Priority support',
  ];

  const transactions = [
    { id: '1', date: 'May 24, 2026', description: 'Pro Plan - Monthly', amount: '₹499', status: 'Completed' },
    { id: '2', date: 'Apr 24, 2026', description: 'Pro Plan - Monthly', amount: '₹499', status: 'Completed' },
    { id: '3', date: 'Mar 24, 2026', description: 'Pro Plan - Monthly', amount: '₹499', status: 'Completed' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-4xl font-bold text-navy-800">Billing & Subscriptions</h1>
          <p className="text-earth-500 mt-2">Manage your subscription and payments</p>
        </div>

        <Card className="border-2 border-brand-300 bg-brand-50">
          <div className="flex items-start justify-between">
            <div className="space-y-4 flex-1">
              <div>
                <p className="text-sm text-earth-500">Current Plan</p>
                <h2 className="text-3xl font-bold text-navy-800 mt-1">{subscription.plan} Plan</h2>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-sm text-earth-500">Monthly Price</p>
                  <p className="text-2xl font-bold text-brand-500">₹{subscription.price}</p>
                </div>
                <div>
                  <p className="text-sm text-earth-500">Renewal Date</p>
                  <p className="text-lg font-semibold text-navy-800">{subscription.renewalDate}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                Active
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-brand-200">
            <h3 className="font-semibold text-navy-800 mb-4">Included Features</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check size={20} className="text-green-600 flex-shrink-0" />
                  <span className="text-navy-800">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-brand-200 flex gap-3">
            <Button variant="secondary">Change Plan</Button>
            <Button variant="ghost" className="text-red-600">
              Cancel Subscription
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-navy-800 mb-6 flex items-center gap-2">
            <CreditCard size={24} />
            Payment Method
          </h2>
          <div className="p-4 border border-earth-200 rounded-lg bg-earth-50 flex items-center justify-between">
            <div>
              <p className="font-semibold text-navy-800">Visa ending in 4242</p>
              <p className="text-sm text-earth-500 mt-1">Expires 12/26</p>
            </div>
            <Button variant="secondary" size="sm">
              Update
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-navy-800 mb-6">Billing History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-earth-200">
                  <th className="text-left py-3 px-4 font-semibold text-navy-800">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-800">Description</th>
                  <th className="text-right py-3 px-4 font-semibold text-navy-800">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-800">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-navy-800">Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-earth-200 hover:bg-earth-50">
                    <td className="py-3 px-4 text-navy-800">{transaction.date}</td>
                    <td className="py-3 px-4 text-navy-800">{transaction.description}</td>
                    <td className="py-3 px-4 text-right font-semibold text-navy-800">{transaction.amount}</td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-brand-500 hover:text-brand-600 flex items-center justify-end gap-2">
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;
