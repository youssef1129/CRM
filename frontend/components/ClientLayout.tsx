'use client';

import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('clients');

  return (
    <div className="min-h-full flex">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 md:ml-60">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="pt-16 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}