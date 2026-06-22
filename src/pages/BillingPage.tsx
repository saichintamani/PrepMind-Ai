import React, { useState } from 'react';
import { CreditCard, Download, Check } from 'lucide-react';
import { DashboardLayout } from '../components/dashboard';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import PlanPickerModal from '../components/billing/PlanPickerModal';
import PaymentMethodModal from '../components/billing/PaymentMethodModal';
import { PLANS } from '../constants';
import { useBillingStore, downloadInvoiceFile } from '../store/billingStore';
import { setSelectedPlan } from '../utils/planIntent';
import { useToastStore } from '../store/toastStore';

const BillingPage: React.FC = () => {
  const toast = useToastStore();
  const {
    planId,
    status,
    renewalDate,
    startDate,
    paymentMethod,
    transactions,
    setPlan,
    cancelSubscription,
    reactivateSubscription,
    updatePaymentMethod,
  } = useBillingStore();

  const [planPickerOpen, setPlanPickerOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  const activePlan = PLANS.find((p) => p.id === planId) ?? PLANS[1];

  const handlePlanSelect = (newPlanId: string) => {
    setPlan(newPlanId);
    setSelectedPlan(newPlanId);
    setPlanPickerOpen(false);
    toast.show(`Switched to ${PLANS.find((p) => p.id === newPlanId)?.name} plan`, 'success');
  };

  const handleDownload = (transactionId: string) => {
    const ok = downloadInvoiceFile(transactionId);
    if (ok) toast.show('Invoice downloaded', 'success');
    else toast.show('Could not download invoice', 'error');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl">
        <div>
          <h1 className="text-4xl font-bold text-navy-800 dark:text-earth-100">Billing & Subscriptions</h1>
          <p className="text-earth-500 dark:text-earth-400 mt-2">Manage your subscription and payments</p>
        </div>

        <Card className="border-2 border-brand-300 bg-brand-50 dark:bg-navy-800 dark:border-brand-700">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div className="space-y-4 flex-1">
              <div>
                <p className="text-sm text-earth-500">Current Plan</p>
                <h2 className="text-3xl font-bold text-navy-800 dark:text-earth-100 mt-1">{activePlan.name} Plan</h2>
              </div>
              <div className="flex gap-8 flex-wrap">
                <div>
                  <p className="text-sm text-earth-500">Monthly Price</p>
                  <p className="text-2xl font-bold text-brand-500">₹{activePlan.price}</p>
                </div>
                <div>
                  <p className="text-sm text-earth-500">Renewal Date</p>
                  <p className="text-lg font-semibold text-navy-800 dark:text-earth-100">{renewalDate}</p>
                </div>
                <div>
                  <p className="text-sm text-earth-500">Member since</p>
                  <p className="text-lg font-semibold text-navy-800 dark:text-earth-100">{startDate}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  status === 'active'
                    ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {status === 'active' ? 'Active' : 'Cancels at renewal'}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-brand-200 dark:border-navy-600">
            <h3 className="font-semibold text-navy-800 dark:text-earth-100 mb-4">Included Features</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {activePlan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check size={20} className="text-green-600 flex-shrink-0" />
                  <span className="text-navy-800 dark:text-earth-200">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-brand-200 dark:border-navy-600 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => setPlanPickerOpen(true)}>
              Change Plan
            </Button>
            {status === 'active' ? (
              <Button variant="ghost" className="text-red-600" onClick={() => setCancelConfirmOpen(true)}>
                Cancel Subscription
              </Button>
            ) : (
              <Button variant="primary" onClick={() => {
                reactivateSubscription();
                toast.show('Subscription reactivated', 'success');
              }}>
                Keep subscription
              </Button>
            )}
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-navy-800 dark:text-earth-100 mb-6 flex items-center gap-2">
            <CreditCard size={24} />
            Payment Method
          </h2>
          <div className="p-4 border border-earth-200 dark:border-navy-600 rounded-lg bg-earth-50 dark:bg-navy-900 flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="font-semibold text-navy-800 dark:text-earth-100">
                {paymentMethod.brand} ending in {paymentMethod.last4}
              </p>
              <p className="text-sm text-earth-500 mt-1">Expires {paymentMethod.expiry}</p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => setPaymentOpen(true)}>
              Update
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold text-navy-800 dark:text-earth-100 mb-6">Billing History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-earth-200 dark:border-navy-600">
                  <th className="text-left py-3 px-4 font-semibold text-navy-800 dark:text-earth-100">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-800 dark:text-earth-100">Description</th>
                  <th className="text-right py-3 px-4 font-semibold text-navy-800 dark:text-earth-100">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-navy-800 dark:text-earth-100">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-navy-800 dark:text-earth-100">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-earth-200 dark:border-navy-600 hover:bg-earth-50 dark:hover:bg-navy-800"
                  >
                    <td className="py-3 px-4 text-navy-800 dark:text-earth-200">{transaction.date}</td>
                    <td className="py-3 px-4 text-navy-800 dark:text-earth-200">{transaction.description}</td>
                    <td className="py-3 px-4 text-right font-semibold text-navy-800 dark:text-earth-100">
                      ₹{transaction.amount}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 rounded-full text-xs font-semibold">
                        {transaction.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="inline-flex items-center gap-2 text-brand-500 hover:text-brand-600"
                        onClick={() => handleDownload(transaction.id)}
                      >
                        <Download size={16} />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <PlanPickerModal
          isOpen={planPickerOpen}
          currentPlanId={planId}
          onClose={() => setPlanPickerOpen(false)}
          onSelect={handlePlanSelect}
        />

        <PaymentMethodModal
          isOpen={paymentOpen}
          current={paymentMethod}
          onClose={() => setPaymentOpen(false)}
          onSave={(method) => {
            updatePaymentMethod(method);
            toast.show('Payment method updated', 'success');
          }}
        />

        <Modal isOpen={cancelConfirmOpen} onClose={() => setCancelConfirmOpen(false)} title="Cancel subscription?" size="md">
          <p className="text-earth-600 dark:text-earth-400 mb-6">
            Your {activePlan.name} plan stays active until {renewalDate}. You can reactivate anytime before then.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setCancelConfirmOpen(false)}>
              Keep plan
            </Button>
            <Button
              className="flex-1 bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                cancelSubscription();
                setCancelConfirmOpen(false);
                toast.show('Subscription will cancel at end of billing period', 'info');
              }}
            >
              Confirm cancel
            </Button>
          </div>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default BillingPage;
