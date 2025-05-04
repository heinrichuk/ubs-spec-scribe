
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h1 className="text-7xl font-bold text-ubs-darkBlue mb-6">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-ubs-gray mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-ubs-darkBlue hover:bg-opacity-90">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </Layout>
  );
};

export default NotFound;
