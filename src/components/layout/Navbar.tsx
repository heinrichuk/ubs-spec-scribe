
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
      <div className="ubs-container py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2 pl-2">  {/* Reduced space-x from space-x-4 to space-x-2, added pl-2 to push further left */}
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
              className="h-20 w-auto"  // ... keep existing logo size
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
