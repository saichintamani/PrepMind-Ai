import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../common/Button';
import Input from '../common/Input';
import { useAuthStore } from '../../store/authStore';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      const returnUrl = searchParams.get('returnUrl') || '/dashboard';
      navigate(returnUrl);
    } catch (err) {
      // Error is handled by the store
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-navy-800 mb-2">Welcome back</h1>
        <p className="text-earth-500">Sign in to continue to PrepMind AI</p>
      </div>

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
        required
      />

      {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

      <Button type="submit" fullWidth isLoading={isLoading} className="btn-primary">
        Sign in
      </Button>

      <div className="text-center space-y-2">
        <a href="/forgot-password" className="text-sm link-hover block">
          Forgot password?
        </a>
        <p className="text-sm text-earth-500">
          Don't have an account?{' '}
          <a href="/signup" className="text-brand-500 font-semibold hover:text-brand-600">
            Sign up
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
