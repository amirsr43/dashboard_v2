import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faSun, faMoon, faUser } from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../../context/AppContext';
import NotificationDropdown from '../common/NotificationDropdown';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const { unreadCount } = useApp();
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-6 flex items-center justify-between shadow-sm flex-shrink-0 z-40 relative">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotif(v => !v)}
            className={`relative p-2 rounded-lg transition-colors ${
              showNotif
                ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500 dark:text-gray-400'
            }`}
            title="Notifications"
          >
            <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white dark:ring-zinc-900">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showNotif && (
            <NotificationDropdown onClose={() => setShowNotif(false)} />
          )}
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-500 dark:text-gray-400"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} className="w-5 h-5" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-zinc-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Alex Johnson</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity">
            <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;