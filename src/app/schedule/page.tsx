import React from "react";
import Header from "@/components/header";
import ScheduleCalendar from "@/components/schedule-calendar";

export default function SchedulePage() {
  return (
    <>
      <Header title="Schedule" />
      <div className="flex-1 overflow-auto">
        <div className="container py-6">
          <ScheduleCalendar />
        </div>
      </div>
    </>
  );
}