"use client";

import React from "react";
import Header from "@/components/header";
import { useNotificationStore, Notification } from "@/lib/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, unreadCount } =
    useNotificationStore();

  const groupedNotifications: Record<string, Notification[]> =
    notifications.reduce((groups, notification) => {
      const date = format(new Date(notification.date), "MMMM d, yyyy");
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(notification);
      return groups;
    }, {} as Record<string, Notification[]>);

  const dates = Object.keys(groupedNotifications).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const NotificationIcon = ({ type }: { type: Notification["type"] }) => {
    switch (type) {
      case "announcement":
        return <Bell className="h-5 w-5 text-blue-500" />;
      case "update":
        return <Info className="h-5 w-5 text-green-500" />;
      case "reminder":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <>
      <Header title="Notifications" />
      <div className="flex-1 overflow-auto">
        <div className="container py-6 max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">All Notifications</h2>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark all as read
              </Button>
            )}
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread {unreadCount > 0 && `(${unreadCount})`}
              </TabsTrigger>
              <TabsTrigger value="announcement">Announcements</TabsTrigger>
              <TabsTrigger value="reminder">Reminders</TabsTrigger>
              <TabsTrigger value="update">Updates</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <NotificationList
                groupedNotifications={groupedNotifications}
                dates={dates}
                markAsRead={markAsRead}
                filterFn={() => true}
              />
            </TabsContent>

            <TabsContent value="unread">
              <NotificationList
                groupedNotifications={groupedNotifications}
                dates={dates}
                markAsRead={markAsRead}
                filterFn={(notification) => !notification.read}
              />
            </TabsContent>

            <TabsContent value="announcement">
              <NotificationList
                groupedNotifications={groupedNotifications}
                dates={dates}
                markAsRead={markAsRead}
                filterFn={(notification) =>
                  notification.type === "announcement"
                }
              />
            </TabsContent>

            <TabsContent value="reminder">
              <NotificationList
                groupedNotifications={groupedNotifications}
                dates={dates}
                markAsRead={markAsRead}
                filterFn={(notification) => notification.type === "reminder"}
              />
            </TabsContent>

            <TabsContent value="update">
              <NotificationList
                groupedNotifications={groupedNotifications}
                dates={dates}
                markAsRead={markAsRead}
                filterFn={(notification) => notification.type === "update"}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

interface NotificationListProps {
  groupedNotifications: Record<string, Notification[]>;
  dates: string[];
  markAsRead: (id: string) => void;
  filterFn: (notification: Notification) => boolean;
}

const NotificationList: React.FC<NotificationListProps> = ({
  groupedNotifications,
  dates,
  markAsRead,
  filterFn,
}) => {
  let hasVisibleNotifications = false;

  return (
    <div className="space-y-8">
      {dates.map((date) => {
        const filteredNotifications = groupedNotifications[date]
          .filter(filterFn)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );

        if (filteredNotifications.length === 0) return null;

        hasVisibleNotifications = true;

        return (
          <div key={date}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              {date}
            </h3>
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer",
                    !notification.read && "bg-muted/20"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex">
                    <div className="mr-4 mt-0.5">
                      <NotificationIcon type={notification.type} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(notification.date), "h:mm a")}
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {!hasVisibleNotifications && (
        <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
          <Bell className="h-12 w-12 mb-2 opacity-20" />
          <p>No notifications to display</p>
        </div>
      )}
    </div>
  );
};
