import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Input from '../common/Input';
import { PaymentMethod } from '../../store/billingStore';

interface PaymentMethodModalProps {
  isOpen: boolean;
  current: PaymentMethod;
  onClose: () => void;
  onSave: (method: PaymentMethod) => void;
}

const PaymentMethodModal: React.FC<PaymentMethodModalProps> = ({ isOpen, current, onClose, onSave }) => {
  const [brand, setBrand] = useState(current.brand);
  const [last4, setLast4] = useState(current.last4);
  const [expiry, setExpiry] = useState(current.expiry);

  const handleSave = () => {
    if (!/^\d{4}$/.test(last4)) return;
    onSave({ brand, last4, expiry });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update payment method" size="md">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-navy-800 dark:text-earth-100 mb-2">Card brand</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-earth-200 dark:border-navy-600 dark:bg-navy-900 dark:text-earth-100"
          >
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="RuPay">RuPay</option>
          </select>
        </div>
        <Input
          label="Last 4 digits"
          value={last4}
          onChange={(e) => setLast4(e.target.value.replace(/\D/g, '').slice(0, 4))}
          placeholder="4242"
        />
        <Input
          label="Expiry (MM/YY)"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
          placeholder="12/26"
        />
        <Button className="btn-primary w-full" onClick={handleSave} disabled={last4.length !== 4}>
          Save payment method
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentMethodModal;
