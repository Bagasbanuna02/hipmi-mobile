// hooks/useNotificationStore.ts
import { createContext, useContext, useState, ReactNode } from 'react';
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

type AppNotification = {
  id: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  read: boolean;
  timestamp: number;
};

const NotificationContext = createContext<{
  notifications: AppNotification[];
  addNotification: (notif: Omit<AppNotification, 'id' | 'read' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
}>({
  notifications: [],
  addNotification: () => {},
  markAsRead: () => {},
});

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  const addNotification = (notif: Omit<AppNotification, 'id' | 'read' | 'timestamp'>) => {
    setNotifications(prev => [
      {
        ...notif,
        id: Date.now().toString(),
        read: false,
        timestamp: Date.now(),
      },
      ...prev,
    ]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationStore = () => useContext(NotificationContext);