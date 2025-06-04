"use client";

import React from "react";
import { courses } from "@/lib/data";
import CourseCard from "@/components/course-card";
import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "list";

const CourseGrid: React.FC = () => {
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">My Courses</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={cn("h-8 w-8 p-0", viewMode === "grid" && "bg-accent")}
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
            <span className="sr-only">Grid view</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn("h-8 w-8 p-0", viewMode === "list" && "bg-accent")}
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="flex items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div
                className="w-16 h-16 rounded bg-cover bg-center mr-4 flex-shrink-0"
                style={{ backgroundImage: `url(${course.image})` }}
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate">{course.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {course.instructor}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <Progress value={course.progress} className="h-1.5 w-24" />
                  <span className="text-xs text-muted-foreground">
                    {course.progress}%
                  </span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground text-right flex-shrink-0">
                <div>
                  Next: {format(new Date(course.nextLesson.date), "MMM d")}
                </div>
                <div className="font-medium">
                  {course.completedModules}/{course.totalModules} modules
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Import the Progress component only in list view to avoid circular dependencies
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";

export default CourseGrid;
