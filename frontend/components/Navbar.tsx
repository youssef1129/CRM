import React from 'react';
import { FaSearch, FaUser, FaBars } from 'react-icons/fa';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 text-gray-600 hover:text-gray-900"
      >
        <FaBars className="text-lg" />
      </button>

      <div className="flex-1 flex justify-center">
        <div className="relative w-full max-w-md">
        </div>
      </div>

      {/* User Avatar */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
          <FaUser className="text-white text-sm" />
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">Dr. Sarah Mitchell</p>
          <p className="text-xs text-gray-500">Paramètres du profil</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;