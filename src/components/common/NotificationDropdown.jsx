import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheck, faXmark, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../../context/AppContext';

const NotificationDropdown = ({ onClose }) => {
  const { notifications, markAsRead, markAllRead, dismissNotification, unreadCount } = useApp();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 text-xs font-bold bg-indigo-600 text-white rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-zinc-800">
        {notifications.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-400 dark:text-gray-500">
            <FontAwesomeIcon icon={faBell} className="w-8 h-8 mb-2 opacity-30" />
            <p>No notifications</p>
          </div>
        ) : (
          notifications.map(n => (
            <div
              key={n.id}
              onClick={() => markAsRead(n.id)}
              className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800/70 ${
                !n.read ? 'bg-indigo-50/50 dark:bg-indigo-500/5' : ''
              }`}
            >
              <div className="text-xl mt-0.5 flex-shrink-0 w-8 text-center">{n.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-medium leading-snug ${!n.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                    {n.title}
                  </p>
                  {!n.read && (
                    <span className="mt-1 w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{n.message}</p>
                <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">{n.time}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); dismissNotification(n.id); }}
                className="flex-shrink-0 mt-0.5 p-1 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 text-gray-400 opacity-0 group-hover:opacity-100 transition-all"
                title="Dismiss"
              >
                <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-4 py-2.5 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between">
          <button
            onClick={() => { notifications.forEach(n => dismissNotification(n.id)); }}
            className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
            Clear all
          </button>
          <span className="text-xs text-gray-400">{notifications.length} total</span>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
