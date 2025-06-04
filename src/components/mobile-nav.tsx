"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Calendar,
  Home,
  BarChart2,
  Bell,
  Settings,
} from "lucide-react";
import { useNotificationStore } from "@/lib/store";

const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { unreadCount } = useNotificationStore();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/courses", icon: BookOpen, label: "Courses" },
    { href: "/schedule", icon: Calendar, label: "Schedule" },
    { href: "/progress", icon: BarChart2, label: "Progress" },
    {
      href: "/notifications",
      icon: Bell,
      label: "Notifications",
      badge: unreadCount > 0,
    },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t flex justify-around py-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center py-1 px-2 text-xs",
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div className="relative">
              <item.icon className="h-6 w-6" />
              {item.badge && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-primary-foreground">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </div>
            <span className="mt-1">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileNav;
