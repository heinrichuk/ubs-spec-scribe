
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <header className="bg-white text-ubs-red border-b border-ubs-gray/20">
      <div className="ubs-container py-2 flex items-center justify-between"> {/* Reduced py-3 to py-2 to make banner narrower */}
        <div className="flex items-center space-x-2 pl-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-ubs-red md:hidden"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </Button>
          
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/cb3632ee-2e4c-4059-905c-bc1a642aba3b.png" 
              alt="UBS Logo" 
              className="h-20 w-auto"
            />
            <span className="text-xl font-semibold tracking-tight">GIC Recruitment Tool</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-ubs-red/80 transition-colors">
            Dashboard
          </Link>
          <Link to="/job-specs" className="text-sm font-medium hover:text-ubs-red/80 transition-colors">
            Job Specs
          </Link>
          <Link to="/interviews" className="text-sm font-medium hover:text-ubs-red/80 transition-colors">
            Interviews
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
