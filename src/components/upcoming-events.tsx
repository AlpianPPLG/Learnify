"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { scheduleEvents } from "@/lib/data";
import { format, addDays, startOfDay, endOfDay, isBefore } from "date-fns";
import { BookOpen, Calendar, Users, FileText, FilePenLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const UpcomingEvents: React.FC = () => {
  const now = new Date();
  const nextWeek = addDays(now, 7);

  // Get events for the next 7 days, sorted by date
  const upcomingEvents = scheduleEvents
    .filter((event) => {
      const eventDate = new Date(event.date);
      return (
        isBefore(eventDate, endOfDay(nextWeek)) &&
        !isBefore(eventDate, startOfDay(now))
      );
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5); // Limit to 5 events

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingEvents.length > 0 ? (
          <div className="space-y-4">
            {upcomingEvents.map((event) => {
              const eventDate = new Date(event.date);
              const isToday =
                isBefore(eventDate, endOfDay(now)) &&
                !isBefore(eventDate, startOfDay(now));

              return (
                <div
                  key={event.id}
                  className="flex items-start p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="mr-3 p-2 bg-muted rounded-md">
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h4 className="text-sm font-medium">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">
                          {event.course}
                        </p>
                      </div>
                      <Badge
                        variant={isToday ? "destructive" : "outline"}
                        className="ml-2 flex-shrink-0"
                      >
                        {isToday ? "Today" : format(eventDate, "EEE, MMM d")}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="mr-3">
                        {format(eventDate, "h:mm a")}
                      </span>
                      {event.duration > 0 && (
                        <span className="mr-3">{event.duration} min</span>
                      )}
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
            <Calendar className="h-12 w-12 mb-2 opacity-20" />
            <p>No upcoming events for the next 7 days</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Helper function to get the icon for event type
const getEventTypeIcon = (type: string) => {
  switch (type) {
    case "lecture":
      return <BookOpen className="h-5 w-5 text-blue-500" />;
    case "workshop":
      return <Users className="h-5 w-5 text-green-500" />;
    case "assignment":
      return <FileText className="h-5 w-5 text-amber-500" />;
    case "exam":
      return <FilePenLine className="h-5 w-5 text-red-500" />;
    default:
      return <Calendar className="h-5 w-5" />;
  }
};

export default UpcomingEvents;
