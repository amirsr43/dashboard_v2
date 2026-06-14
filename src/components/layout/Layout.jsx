import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import ToastContainer from '../common/ToastContainer';
import { AppProvider } from '../../context/AppContext';

const LayoutInner = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dark');
      if (stored !== null) return stored === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleSidebar = () => setSidebarOpen(v => !v);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('dark', String(next));
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950 transition-colors duration-300">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
          <div className="flex-grow">
            <Outlet />
          </div>
          <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="ReactAja Logo" className="w-6 h-6 object-contain" />
              <span className="font-semibold text-gray-800 dark:text-zinc-200">ReactAja</span>
            </div>
            <div>
              © 2026 ReactAja. All rights reserved.
            </div>
          </footer>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

const Layout = () => (
  <AppProvider>
    <LayoutInner />
  </AppProvider>
);

export default Layout;