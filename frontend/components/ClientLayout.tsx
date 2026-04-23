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
    <div className="min-h-full flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 md:ml-60">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="pt-16 p-6">
          <Breadcrumbs />
          {children}
        </main>
      </div>
    </div>
  );
}