import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const StatusBadge = ({ status }) => {
  const config = {
    Success: {
      icon: faCheckCircle,
      className: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
    },
    Pending: {
      icon: faClock,
      className: 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400',
    },
    Failed: {
      icon: faTimesCircle,
      className: 'bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400',
    },
  };

  const { icon, className } = config[status] || config.Success;

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md ${className}`}>
      <FontAwesomeIcon icon={icon} className="w-3 h-3" />
      {status}
    </span>
  );
};

export default StatusBadge;