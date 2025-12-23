// hooks/useNotificationStore.ts
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./use-auth";
import {
  apiGetNotificationsById,
  apiNotificationUnreadCount,
} from "@/service/api-notifications";

type AppNotification = {
  id: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  isRead: boolean;
  timestamp: number;
  type: "notification" | "trigger";
  // untuk id dari setiap kategori app
  appId?: string;
  kategoriApp?:
    | "JOB"
    | "VOTING"
    | "EVENT"
    | "DONASI"
    | "INVESTASI"
    | "COLLABORATION"
    | "FORUM"
    | "ACCESS"; // Untuk trigger akses user;
};

type NotificationContextType = {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (
    notif: Omit<AppNotification, "id" | "isRead" | "timestamp">
  ) => void;
  markAsRead: (id: string) => void;
  syncUnreadCount: () => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  syncUnreadCount: async () => {},
});

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  console.log(
    "🚀 Notifications Masuk:",
    JSON.stringify(notifications, null, 2)
  );

  // Sync unread count dari backend saat provider di-mount
  useEffect(() => {
    fetchUnreadCount();
  }, [user?.id]);

  const fetchUnreadCount = async () => {
    try {
      const count = await apiNotificationUnreadCount({
        id: user?.id as any,
        role: user?.masterUserRoleId as any
      }); // ← harus return number
      const result = count.data;
      console.log("📖 Unread count:", result);
      setUnreadCount(result);
    } catch (error) {
      console.error("Gagal fetch unread count:", error);
    }
  };

  const addNotification = (
    notif: Omit<AppNotification, "id" | "isRead" | "timestamp">
  ) => {
    setNotifications((prev) => [
      {
        ...notif,
        id: Date.now().toString(),
        isRead: false,
        timestamp: Date.now(),
      },
      ...prev,
    ]);

    setUnreadCount((prev) => prev + 1);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const syncUnreadCount = async () => {
    try {
      const count = await apiNotificationUnreadCount({
        id: user?.id as any,
        role: user?.masterUserRoleId as any,
      }); // ← harus return number
      const result = count.data;
      console.log("📖 Unread count sync:", result);
      setUnreadCount(result);
    } catch (error) {
      console.warn("⚠️ Gagal sync unread count:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAsRead,
        unreadCount,
        syncUnreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationStore = () => useContext(NotificationContext);
