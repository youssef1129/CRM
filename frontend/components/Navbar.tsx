import React from 'react';
import { FaSearch, FaUser, FaBars } from 'react-icons/fa';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <div className="fixed top-0 left-0 right-0 md:left-60 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 md:px-8 z-30 transition-all">
      <div className="flex items-center gap-4">
        {/* Hamburger Menu for Mobile */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
        >
          <FaBars className="text-xl" />
        </button>
        
        
      </div>

      {/* User Avatar */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-800 leading-tight mb-1!">Dr. Sarah Mitchell</p>
          <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Vétérinaire</p>
        </div>
        <div className="w-10 h-10 bg-gradient-to-tr from-teal-600 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-100 border-2 border-white">
          <FaUser className="text-white text-sm" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;