import React, { useEffect, useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getSelectedPlan, setSelectedPlan } from '../../utils/planIntent';
import Button from '../common/Button';
import Input from '../common/Input';
import { useAuthStore } from '../../store/authStore';
import { useToastStore } from '../../store/toastStore';
import SupabaseConfigNotice from './SupabaseConfigNotice';

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signup, isLoading, error, clearError } = useAuthStore();
  const toast = useToastStore();

  useEffect(() => {
    const plan = searchParams.get('plan');
    if (plan) setSelectedPlan(plan);
  }, [searchParams]);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) clearError();
    if (formError) setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setFormError('Password must be at least 8 characters');
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.name);
      const { user, error: storeError } = useAuthStore.getState();
      if (storeError || !user) return;

      const returnUrl = searchParams.get('returnUrl');
      const selectedPlan = getSelectedPlan();
      toast.show('Account created! Let us personalize your experience.', 'success');
      if (returnUrl) {
        navigate(returnUrl);
      } else if (selectedPlan) {
        navigate('/dashboard/billing');
      } else {
        navigate('/dashboard');
      }
    } catch {
      // Error is handled by the store
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <SupabaseConfigNotice />

      <div>
        <h1 className="text-4xl font-bold text-navy-800 mb-2">Create your account</h1>
        <p className="text-earth-500">Join PrepMind AI and start your learning journey</p>
      </div>

      <Input
        type="text"
        name="name"
        label="Full name"
        placeholder="John Doe"
        value={formData.name}
        onChange={handleChange}
        icon={<User size={20} />}
        required
      />

      <Input
        type="email"
        name="email"
        label="Email address"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleChange}
        icon={<Mail size={20} />}
        required
      />

      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="••••••••"
        value={formData.password}
        onChange={handleChange}
        icon={<Lock size={20} />}
        helperText="Must be at least 8 characters"
        required
      />

      <Input
        type="password"
        name="confirmPassword"
        label="Confirm password"
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChange={handleChange}
        icon={<Lock size={20} />}
        required
      />

      {(error || formError) && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error || formError}</div>
      )}

      <Button type="submit" fullWidth isLoading={isLoading} className="btn-primary">
        Create account
      </Button>

      <p className="text-center text-sm text-earth-500">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-500 font-semibold hover:text-brand-600">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
