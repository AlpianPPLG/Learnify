import React from "react";
import Header from "@/components/header";
import ProgressOverview from "@/components/progress-overview";

export default function ProgressPage() {
  return (
    <>
      <Header title="Progress Tracking" />
      <div className="flex-1 overflow-auto">
        <div className="container py-6 space-y-6">
          <ProgressOverview />
          
          {/* Additional progress sections could be added here */}
        </div>
      </div>
    </>
  );
}