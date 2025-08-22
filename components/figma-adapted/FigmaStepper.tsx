import React from "react";
import { CheckCircle2 } from "lucide-react";

type Props = {
  labels: string[];
  currentIndex: number; // 0-based
  className?: string;
};

/**
 * Figma-inspired stepper header with numbered dots and a progress bar.
 * Pure Tailwind + lucide-react. No MUI dependency.
 */
export default function FigmaStepper({
  labels,
  currentIndex,
  className,
}: Props) {
  const total = Math.max(labels.length, 1);
  const pct = Math.min(100, Math.max(0, ((currentIndex + 1) / total) * 100));

  return (
    <div className={className ?? ""}>
      <div className="flex justify-between items-center mb-2">
        {labels.map((label, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;
          const circle = isCompleted
            ? "bg-green-500 text-white"
            : isActive
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-600";

          return (
            <div key={label} className="flex flex-col items-center">
              <div
                className={[
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  circle,
                ].join(" ")}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
              </div>
              <span className="text-xs mt-1 text-gray-600">{label}</span>
            </div>
          );
        })}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
