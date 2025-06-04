"use client";

import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scheduleEvents } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, isSameDay } from "date-fns";

const ScheduleCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  // Get events for selected date
  const eventsForSelectedDate = selectedDate
    ? scheduleEvents.filter((event) =>
        isSameDay(new Date(event.date), selectedDate)
      )
    : [];

  // Find dates that have events
  const eventDates = scheduleEvents.map((event) => new Date(event.date));

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
      <Card className="md:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
            modifiers={{
              hasEvent: eventDates,
            }}
            modifiersStyles={{
              hasEvent: {
                fontWeight: "bold",
                textDecoration: "underline",
                textDecorationColor: "hsl(var(--primary))",
                textDecorationThickness: "2px",
                textUnderlineOffset: "4px",
              },
            }}
          />
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader className="pb-3">
          <CardTitle>
            {selectedDate
              ? format(selectedDate, "MMMM d, yyyy")
              : "Select a date"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {eventsForSelectedDate.length > 0 ? (
            <ScrollArea className="h-[350px]">
              <div className="space-y-4">
                {eventsForSelectedDate
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime()
                  )
                  .map((event) => (
                    <div
                      key={event.id}
                      className="flex p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="mr-4 p-2 rounded-md bg-muted flex items-center justify-center">
                        {getEventTypeIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-medium">{event.title}</h4>
                          <Badge variant={getEventTypeBadgeVariant(event.type)}>
                            {capitalizeFirstLetter(event.type)}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">
                          {event.course}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="mr-3">
                            {format(new Date(event.date), "h:mm a")}
                          </span>
                          {event.duration > 0 && (
                            <span className="mr-3">{event.duration} min</span>
                          )}
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="flex flex-col items-center justify-center h-[350px] text-center text-muted-foreground">
              <p>No events scheduled for this date</p>
              <p className="text-sm mt-1">
                Select a different date or add a new event
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Helper functions
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

const getEventTypeBadgeVariant = (
  type: string
): "default" | "secondary" | "outline" | "destructive" => {
  switch (type) {
    case "lecture":
      return "default";
    case "workshop":
      return "secondary";
    case "assignment":
      return "outline";
    case "exam":
      return "destructive";
    default:
      return "default";
  }
};

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

import { BookOpen, Users, FileText, FilePenLine } from "lucide-react";

export default ScheduleCalendar;
