import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

type Props = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  value?: number;
};

export const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  Props
>(({ value = 0, ...props }, ref) => {
  const clamped = Math.max(0, Math.min(100, value ?? 0));
  return (
    <ProgressPrimitive.Root
      ref={ref}
      data-orientation="horizontal"
      style={{
        position: "relative",
        height: 8,
        width: "100%",
        overflow: "hidden",
        borderRadius: 9999,
        background: "var(--gray-5)",
      }}
      {...props}
    >
      <ProgressPrimitive.Indicator
        style={{
          height: "100%",
          width: `${clamped}%`,
          background: "var(--blue-9)",
          transition: "width .3s ease",
        }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = "Progress";
