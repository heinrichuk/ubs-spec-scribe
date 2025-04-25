
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X, FileText, Users, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar for mobile (sliding) */}
      <div 
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white border-r border-ubs-gray/20 z-50 transition-transform duration-300 ease-in-out md:hidden",
          open ? "transform-none" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-ubs-gray/20">
          <span className="font-semibold text-ubs-darkBlue">Menu</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        </div>
        
        <nav className="p-4">
          <MobileNavLinks />
        </nav>
      </div>
      
      {/* Sidebar for desktop (permanent) */}
      <div className="hidden md:block w-64 bg-white border-r border-ubs-gray/20">
        <nav className="p-4 space-y-1">
          <DesktopNavLinks />
        </nav>
      </div>
    </>
  );
};

const MobileNavLinks = () => {
  return (
    <div className="space-y-2">
      <Link to="/" className="flex items-center px-2 py-3 rounded-md text-ubs-darkBlue hover:bg-ubs-lightGray">
        <Search size={18} className="mr-3" />
        Dashboard
      </Link>
      <Link to="/job-specs" className="flex items-center px-2 py-3 rounded-md text-ubs-darkBlue hover:bg-ubs-lightGray">
        <FileText size={18} className="mr-3" />
        Job Specs
      </Link>
      <Link to="/interviews" className="flex items-center px-2 py-3 rounded-md text-ubs-darkBlue hover:bg-ubs-lightGray">
        <Users size={18} className="mr-3" />
        Interviews
      </Link>
    </div>
  );
};

const DesktopNavLinks = () => {
  return (
    <div className="space-y-2">
      <p className="px-2 py-1 text-xs font-semibold text-ubs-gray uppercase tracking-wider">
        Main
      </p>
      <Link to="/" className="flex items-center px-2 py-2 rounded-md text-sm text-ubs-darkBlue hover:bg-ubs-lightGray">
        <Search size={16} className="mr-3" />
        Dashboard
      </Link>
      <Link to="/job-specs" className="flex items-center px-2 py-2 rounded-md text-sm text-ubs-darkBlue hover:bg-ubs-lightGray">
        <FileText size={16} className="mr-3" />
        Job Specs
      </Link>
      <Link to="/interviews" className="flex items-center px-2 py-2 rounded-md text-sm text-ubs-darkBlue hover:bg-ubs-lightGray">
        <Users size={16} className="mr-3" />
        Interviews
      </Link>
    </div>
  );
};

export default Sidebar;
