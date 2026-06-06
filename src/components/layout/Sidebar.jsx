import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartSimple, 
  faUsers, 
  faBagShopping, 
  faChartLine, 
  faGear,
  faRightFromBracket,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', icon: faChartSimple, to: '/' },
  { name: 'Users', icon: faUsers, to: '/users' },
  { name: 'Orders', icon: faBagShopping, to: '/orders' },
  { name: 'Analytics', icon: faChartLine, to: '/analytics' },
  { name: 'Settings', icon: faGear, to: '/settings' },
];

const LogoutModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-200 dark:border-zinc-700 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-500/10 flex items-center justify-center">
            <FontAwesomeIcon icon={faTriangleExclamation} className="w-4 h-4 text-red-600 dark:text-red-400" />
          </div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Sign Out</h2>
        </div>
        <button
          onClick={onCancel}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 transition-colors"
        >
          <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
        </button>
      </div>

      <div className="px-6 py-5">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to sign out? The dashboard will be refreshed.
        </p>
      </div>

      <div className="px-6 pb-5 flex gap-3">
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4" />
          Yes, Sign Out
        </button>
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-xl text-sm font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false);
    window.location.reload();
  };

  return (
    <>
      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 transition-all duration-300 flex flex-col shadow-sm flex-shrink-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-zinc-800">
          {sidebarOpen && (
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Dashboard
            </span>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-gray-500 dark:text-gray-400"
          >
            <FontAwesomeIcon icon={sidebarOpen ? faChevronLeft : faChevronRight} className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-gray-100'
                }`
              }
            >
              <FontAwesomeIcon icon={item.icon} className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm">{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-gray-600 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;