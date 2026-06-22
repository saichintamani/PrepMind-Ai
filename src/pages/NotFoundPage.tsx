import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold gradient-text">404</h1>
        <p className="text-earth-500 text-lg">The page you are looking for does not exist.</p>
        <Link to="/">
          <Button variant="primary" size="lg">
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
