import * as React from "react";
import { Button as RTButton } from "@radix-ui/themes";

type Props = React.ComponentProps<typeof RTButton> & {
  asChild?: boolean;
  className?: string;
};

export function Button({ children, asChild, className, ...props }: Props) {
  // Ignore className (Tailwind) since we're using Radix Themes styling.
  // Map common sizes: sm->1, default->2, lg->3
  let size: 1 | 2 | 3 | 4 | undefined = props.size as any;
  if (props.size === "sm") size = 1;
  if (props.size === "lg") size = 3;
  return (
    <RTButton {...props} size={size}>
      {children}
    </RTButton>
  );
}
