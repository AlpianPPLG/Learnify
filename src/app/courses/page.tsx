import React from "react";
import Header from "@/components/header";
import CourseGrid from "@/components/course-grid";

export default function CoursesPage() {
  return (
    <>
      <Header title="My Courses" />
      <div className="flex-1 overflow-auto">
        <div className="container py-6">
          <CourseGrid />
        </div>
      </div>
    </>
  );
}
