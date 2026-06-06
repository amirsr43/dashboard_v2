import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle, faTimesCircle, faExclamationTriangle,
  faInfoCircle, faXmark
} from '@fortawesome/free-solid-svg-icons';
import { useApp } from '../../context/AppContext';

const typeConfig = {
  success: {
    icon: faCheckCircle,
    cls: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300',
    iconCls: 'text-emerald-500',
  },
  error: {
    icon: faTimesCircle,
    cls: 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-700 text-red-800 dark:text-red-300',
    iconCls: 'text-red-500',
  },
  warning: {
    icon: faExclamationTriangle,
    cls: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700 text-amber-800 dark:text-amber-300',
    iconCls: 'text-amber-500',
  },
  info: {
    icon: faInfoCircle,
    cls: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-300',
    iconCls: 'text-blue-500',
  },
};

const ToastContainer = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(toast => {
        const cfg = typeConfig[toast.type] || typeConfig.success;
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg min-w-72 max-w-sm pointer-events-auto
              animate-[slideInRight_0.3s_ease-out] ${cfg.cls}`}
          >
            <FontAwesomeIcon icon={cfg.icon} className={`w-5 h-5 flex-shrink-0 ${cfg.iconCls}`} />
            <p className="text-sm font-medium flex-1">{toast.message}</p>
            <button
              onClick={() => dismissToast(toast.id)}
              className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
            >
              <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
