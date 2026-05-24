import React from 'react';
import { LoginForm } from '../components/auth';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text">PrepMind</h2>
          <p className="text-earth-500 mt-2">Study Smart. Prepare Better. Get Hired.</p>
        </div>

        <div className="card">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
