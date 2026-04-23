'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-full flex bg-slate-50/50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 md:ml-64 transition-all duration-300">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}