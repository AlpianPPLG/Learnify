import React from "react";
import Header from "@/components/header";
import CourseGrid from "@/components/course-grid";
import ProgressOverview from "@/components/progress-overview";
import UpcomingEvents from "@/components/upcoming-events";

export default function Home() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="flex-1 overflow-auto">
        <div className="container py-6 space-y-6">
          {/* Stats overview */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Enrolled Courses"
              value="4"
              description="2 active this week"
              icon={<BookOpen className="h-5 w-5" />}
              color="bg-blue-500/10 text-blue-500"
            />
            <StatCard
              title="Total Study Time"
              value="17.8 hrs"
              description="This week"
              icon={<Clock className="h-5 w-5" />}
              color="bg-green-500/10 text-green-500"
            />
            <StatCard
              title="Assignments"
              value="3"
              description="2 pending, 1 completed"
              icon={<ClipboardCheck className="h-5 w-5" />}
              color="bg-amber-500/10 text-amber-500"
            />
            <StatCard
              title="Upcoming Tests"
              value="1"
              description="In 11 days"
              icon={<TestTube className="h-5 w-5" />}
              color="bg-purple-500/10 text-purple-500"
            />
          </div>

          {/* Progress section */}
          <ProgressOverview />

          {/* Courses and events */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <CourseGrid />
            </div>
            <div>
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Simple stat card component
const StatCard = ({
  title,
  value,
  description,
  icon,
  color,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <div className="p-4 border rounded-xl flex items-start gap-4">
    <div className={`p-2.5 rounded-lg ${color}`}>{icon}</div>
    <div>
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      <h4 className="text-2xl font-bold mt-0.5 mb-1">{value}</h4>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  </div>
);

import { BookOpen, Clock, ClipboardCheck, TestTube } from "lucide-react";
