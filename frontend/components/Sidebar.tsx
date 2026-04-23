'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaPaw, FaUsers } from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const activeTab = pathname?.startsWith('/animals') ? 'animaux' : 'clients';

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full w-60 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FaPaw className="text-green-600 text-2xl" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">VetCRM</h1>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Clinique Vétérinaire</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/"
            onClick={onClose}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'clients'
                ? 'text-teal-600 border-l-4 border-teal-600 bg-teal-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <FaUsers className="text-lg" />
            <span>Clients</span>
          </Link>

          <Link
            href="/animals"
            onClick={onClose}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'animaux'
                ? 'text-teal-600 border-l-4 border-teal-600 bg-teal-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <FaPaw className="text-lg" />
            <span>Animaux</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;