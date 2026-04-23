'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaPaw, FaUsers } from 'react-icons/fa';
import { FiGrid, FiSettings, FiLogOut } from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  
  const navItems = [
    { 
        id: 'clients', 
        label: 'Clients', 
        href: '/', 
        icon: FaUsers, 
        active: pathname === '/' || (!pathname.startsWith('/animals') && pathname !== '/') 
    },
    { 
        id: 'animaux', 
        label: 'Animaux', 
        href: '/animals', 
        icon: FaPaw, 
        active: pathname.startsWith('/animals') 
    },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 flex flex-col transform transition-all duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2.5 bg-teal-600 rounded-2xl shadow-lg shadow-teal-200 group-hover:scale-110 transition-transform">
                <FaPaw className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight">VetCRM</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Management</p>
            </div>
          </Link>
        </div>

        <div className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-4">Menu Principal</p>
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 ${
                item.active
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-100'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`text-lg ${item.active ? 'text-white' : 'text-slate-400 group-hover:text-teal-600'}`} />
                <span className="font-bold text-sm">{item.label}</span>
              </div>
              {item.active && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
            </Link>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all font-bold text-sm">
                <FiSettings className="text-lg" />
                <span>Paramètres</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm">
                <FiLogOut className="text-lg" />
                <span>Déconnexion</span>
            </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
