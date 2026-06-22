import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PLANS } from '../constants';
import { CUSTOMER_CARE } from '../constants/support';

export interface PaymentMethod {
  brand: string;
  last4: string;
  expiry: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: string;
  status: 'Completed' | 'Pending' | 'Failed';
  invoiceNumber: string;
}

interface BillingState {
  planId: string;
  status: 'active' | 'cancelled' | 'pending_cancel';
  renewalDate: string;
  startDate: string;
  paymentMethod: PaymentMethod;
  transactions: Transaction[];

  setPlan: (planId: string) => void;
  cancelSubscription: () => void;
  reactivateSubscription: () => void;
  updatePaymentMethod: (method: Partial<PaymentMethod>) => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'invoiceNumber'>) => void;
  getInvoiceText: (transactionId: string) => string;
}

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' });
}

function seedTransactions(planName: string, amount: number): Transaction[] {
  const now = new Date();
  return [0, 1, 2].map((i) => {
    const d = new Date(now);
    d.setMonth(d.getMonth() - i);
    const id = `inv-${i + 1}`;
    return {
      id,
      date: d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      description: `${planName} Plan - Monthly`,
      amount,
      currency: 'INR',
      status: 'Completed' as const,
      invoiceNumber: `PM-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}-${1000 + i}`,
    };
  });
}

export const useBillingStore = create<BillingState>()(
  persist(
    (set, get) => ({
      planId: 'pro',
      status: 'active',
      startDate: 'May 24, 2026',
      renewalDate: addMonths(new Date(), 1),
      paymentMethod: { brand: 'Visa', last4: '4242', expiry: '12/26' },
      transactions: seedTransactions('Pro', 499),

      setPlan: (planId) => {
        const plan = PLANS.find((p) => p.id === planId) ?? PLANS[1];
        const tx: Omit<Transaction, 'id' | 'invoiceNumber'> = {
          date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
          description: `${plan.name} Plan - Plan change`,
          amount: plan.price,
          currency: 'INR',
          status: 'Completed',
        };
        const id = crypto.randomUUID();
        const invoiceNumber = `PM-${Date.now().toString().slice(-8)}`;
        set({
          planId,
          status: 'active',
          renewalDate: addMonths(new Date(), 1),
          transactions: [
            {
              ...tx,
              id,
              invoiceNumber,
            },
            ...get().transactions,
          ],
        });
      },

      cancelSubscription: () => set({ status: 'pending_cancel' }),

      reactivateSubscription: () => set({ status: 'active' }),

      updatePaymentMethod: (method) =>
        set({
          paymentMethod: { ...get().paymentMethod, ...method },
        }),

      addTransaction: (tx) => {
        const id = crypto.randomUUID();
        const invoiceNumber = `PM-${Date.now().toString().slice(-8)}`;
        set({
          transactions: [{ ...tx, id, invoiceNumber }, ...get().transactions],
        });
      },

      getInvoiceText: (transactionId) => {
        const tx = get().transactions.find((t) => t.id === transactionId);
        const plan = PLANS.find((p) => p.id === get().planId);
        if (!tx || !plan) return '';
        return [
          'PREPMIND AI — TAX INVOICE (DEMO)',
          '================================',
          `Invoice No: ${tx.invoiceNumber}`,
          `Date: ${tx.date}`,
          `Status: ${tx.status}`,
          '',
          `Description: ${tx.description}`,
          `Amount: ₹${tx.amount} ${tx.currency}`,
          '',
          `Subscription: ${plan.name} Plan`,
          `Payment: ${get().paymentMethod.brand} ****${get().paymentMethod.last4}`,
          '',
          'Thank you for learning with PrepMind AI.',
          `Customer care: ${CUSTOMER_CARE.name} — ${CUSTOMER_CARE.email}`,
        ].join('\n');
      },
    }),
    { name: 'prepmind_billing' }
  )
);

export function downloadInvoiceFile(transactionId: string) {
  const text = useBillingStore.getState().getInvoiceText(transactionId);
  if (!text) return false;
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `PrepMind-Invoice-${transactionId}.txt`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  return true;
}
