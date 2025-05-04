
import React from 'react';
import Layout from '../components/layout/Layout';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { FileText, Users, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index: React.FC = () => {
  return (
    <Layout>
      <section className="mb-10">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">GIC Recruitment Tool</h1>
          <p className="text-lg text-ubs-gray max-w-3xl mx-auto">
            Generate professional job specifications and interview questions with AI-powered tools, inspired by UBS excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            title="Job Spec Generator" 
            description="Create professional job specifications from templates or customize your own."
            icon={<FileText size={24} />}
            link="/job-specs"
          />
          
          <FeatureCard 
            title="Interview Assistant" 
            description="Generate tailored interview questions based on job specs and CVs."
            icon={<Users size={24} />}
            link="/interviews"
          />
          
          <FeatureCard 
            title="Upload & Analyze" 
            description="Upload existing job specs or CVs for analysis and recommendations."
            icon={<Upload size={24} />}
            link="/uploads"
          />
        </div>
      </section>

      <section className="bg-ubs-lightGray rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-6 md:mb-0 md:mr-6">
            <h2 className="text-xl md:text-2xl font-bold mb-2">Ready to get started?</h2>
            <p className="text-ubs-gray">
              Begin by creating a new job specification or uploading existing documents.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild className="bg-ubs-red hover:bg-opacity-90 text-white">
              <Link to="/job-specs">Create Job Spec</Link>
            </Button>
            <Button asChild variant="outline" className="border-ubs-red text-ubs-red hover:bg-ubs-red/10">
              <Link to="/interviews">Generate Questions</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon,
  link
}) => {
  return (
    <Card className="border border-ubs-gray/20 h-full">
      <CardHeader>
        <div className="bg-ubs-lightGray w-12 h-12 rounded-lg flex items-center justify-center text-ubs-darkBlue mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full justify-start hover:bg-ubs-lightGray text-ubs-darkBlue">
          <Link to={link}>
            Get Started &rarr;
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Index;
