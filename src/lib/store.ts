import { create } from "zustand";
import { persist } from "zustand/middleware";

// Theme types
type Theme = "dark" | "light" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "announcement" | "reminder" | "update";
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

// Create theme store with persistence
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    }
  )
);

// Create notification store
export const useNotificationStore = create<NotificationState>()((set) => ({
  notifications: [
    {
      id: "1",
      title: "New Course Available",
      message: "Introduction to Machine Learning is now available. Enroll now!",
      date: "2025-04-15T10:00:00",
      read: false,
      type: "announcement",
    },
    {
      id: "2",
      title: "Assignment Due",
      message: "Web Development - Assignment #3 is due tomorrow.",
      date: "2025-04-14T15:30:00",
      read: false,
      type: "reminder",
    },
    {
      id: "3",
      title: "Schedule Change",
      message: "Data Science lecture has been rescheduled to Friday, 2PM.",
      date: "2025-04-13T09:15:00",
      read: false,
      type: "update",
    },
    {
      id: "4",
      title: "New Resource Added",
      message: "New study materials have been added to the UX Design course.",
      date: "2025-04-12T11:45:00",
      read: true,
      type: "update",
    },
    {
      id: "5",
      title: "Feedback Requested",
      message: "Please complete the feedback form for Web Development course.",
      date: "2025-04-11T16:20:00",
      read: true,
      type: "reminder",
    },
  ],
  unreadCount: 3,
  markAsRead: (id: string) =>
    set((state) => {
      const notifications = state.notifications.map((notification) => {
        if (notification.id === id && !notification.read) {
          return { ...notification, read: true };
        }
        return notification;
      });

      const unreadCount = notifications.filter((n) => !n.read).length;

      return { notifications, unreadCount };
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
      unreadCount: 0,
    })),
}));
