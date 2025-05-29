"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { NavigationControls } from "./navigation-controls";
import ProgressBar from "./progress-bar";

const SectionTitle = ({ title }: { title: string }) => (
    <div>
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    </div>
);

const parseSection = (section: string) => {
  const [title, content] = section.split("\n");

  const cleanTitle = title.startsWith("#")
    ? title.substring(1).trim()
    : title.trim();

  const points: String[] = [];
  let currentPoint = "";
  content.split("\n").forEach((line: string) => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("-") || trimmedLine.startsWith("*")) {
      if (currentPoint) {
        points.push(currentPoint.trim());
      }
      currentPoint = trimmedLine.substring(1).trim();
    } else {
      currentPoint += " " + trimmedLine;
    }
  });

  if (currentPoint) {
    points.push(currentPoint.trim());
  }
  return {
    title: cleanTitle,
    points: points.filter((point) => point && !point.startsWith("[Choose")),
  };
};

export function SummaryViewer({ summary }: { summary: string }) {
  const [curr, setCurr] = useState(0);
  const handleNext = () =>
    setCurr((prev) => Math.min(prev + 1, sections.length - 1));
  const handlePrevious = () => setCurr((prev) => Math.max(prev - 1, 0));

  const sections = summary
    .split("\n#")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);
  return (
    <Card
      className="relative px-2
  h-[500px] sm:h-[600px] lg:h-[700px]
  w-full xl:w-[600px]
  overflow-hidden
  bg-gradient-to-br from-background via-background/95 to-blue-500/5
  backdrop-blur-lg shadow-2xl rounded-3xl
  border border-blue-500/10"
    >
        <ProgressBar sections={sections} currentSection={curr} />
      <div className="h-full overflow-y-auto scrollbar-hide pt-12 sm:pt-16 pb-20 sm:pb-24">
        <div className="px-4 sm:px-6">
          <h2 className="text-xl font-semibold mb-4">
            {sections[curr]?.title || ""}
          </h2>
          {/* Render your section content here */}
          <ul>
            {sections[curr]?.points && sections[curr].points.length > 0 ? (
              sections[curr].points.map((point, index) => (
                <li key={index} className="mb-2">
                  {point}
                </li>
              ))
            ) : (
              <li className="text-gray-500">
                No points available for this section.
              </li>
            )}
          </ul>
        </div>
      </div>

      <NavigationControls
        currentSection={curr}
        totalSections={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={setCurr}
      />
    </Card>
  );
}
