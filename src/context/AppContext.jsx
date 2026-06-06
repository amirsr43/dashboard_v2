import React, { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

const initialNotifications = [
  {
    id: 1,
    type: 'order',
    title: 'New Order Received',
    message: 'Order #ORD-008 placed by Maria Garcia — $349.00',
    time: '2 min ago',
    read: false,
    icon: '🛒',
  },
  {
    id: 2,
    type: 'user',
    title: 'New User Registered',
    message: 'Kevin Lee joined as a Viewer',
    time: '15 min ago',
    read: false,
    icon: '👤',
  },
  {
    id: 3,
    type: 'alert',
    title: 'Server Alert',
    message: 'CPU usage spike detected at 92% — resolved',
    time: '1 hr ago',
    read: false,
    icon: '⚠️',
  },
  {
    id: 4,
    type: 'order',
    title: 'Order Delivered',
    message: 'Order #ORD-005 delivered to David Wilson',
    time: '3 hr ago',
    read: true,
    icon: '✅',
  },
  {
    id: 5,
    type: 'system',
    title: 'Backup Completed',
    message: 'Daily database backup completed successfully',
    time: '6 hr ago',
    read: true,
    icon: '💾',
  },
];

export const AppProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [toasts, setToasts] = useState([]);

  // --- Notifications ---
  const markAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, []);

  const dismissNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const addNotification = useCallback((notif) => {
    setNotifications(prev => [
      { id: Date.now(), read: false, time: 'just now', ...notif },
      ...prev,
    ]);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  // --- Toasts ---
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllRead,
      dismissNotification,
      addNotification,
      toasts,
      showToast,
      dismissToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
