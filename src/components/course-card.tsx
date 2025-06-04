"use client";

import React from "react";
import { Course } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarClock } from "lucide-react";
import { format } from "date-fns";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const {
    title,
    instructor,
    progress,
    totalModules,
    completedModules,
    image,
    nextLesson,
    colorAccent,
  } = course;

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <div
        className="h-36 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div
          className="absolute top-2 right-2 text-xs font-medium py-1 px-2 rounded-full text-white"
          style={{ backgroundColor: colorAccent }}
        >
          {`${completedModules}/${totalModules} modules`}
        </div>
      </div>

      <CardContent className="flex-1 p-4">
        <h3 className="text-lg font-semibold line-clamp-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{instructor}</p>

        <div className="space-y-3 mt-4">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 border-t mt-auto">
        <div className="w-full">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarClock className="h-3 w-3" />
            <span>Next Lesson</span>
          </div>
          <div className="mt-1">
            <p className="text-sm font-medium line-clamp-1">
              {nextLesson.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(nextLesson.date), "MMM d, h:mm a")}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
