import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import { useAuthStore } from '../../store/authStore';
import SupabaseConfigNotice from './SupabaseConfigNotice';

const ForgotPasswordForm: React.FC = () => {
  const { requestPasswordReset, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    try {
      const message = await requestPasswordReset(email);
      setSuccessMessage(message);
    } catch {
      // Error handled in store
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SupabaseConfigNotice />

      <div>
        <h1 className="text-4xl font-bold text-navy-800 mb-2">Reset password</h1>
        <p className="text-earth-500">Enter your email and we will send you reset instructions.</p>
      </div>

      <Input
        type="email"
        name="email"
        label="Email address"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) clearError();
          if (successMessage) setSuccessMessage(null);
        }}
        icon={<Mail size={20} />}
        required
      />

      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">{successMessage}</div>
      )}

      <Button type="submit" fullWidth isLoading={isLoading} className="btn-primary">
        Send reset link
      </Button>

      <p className="text-center text-sm text-earth-500">
        Remember your password?{' '}
        <Link to="/login" className="text-brand-500 font-semibold hover:text-brand-600">
          Back to sign in
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
