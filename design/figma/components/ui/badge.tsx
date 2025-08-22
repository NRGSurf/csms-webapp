import * as React from "react";
import { Badge as RTBadge } from "@radix-ui/themes";

type Props = React.ComponentProps<typeof RTBadge> & {
  variant?: "solid" | "soft" | "outline";
};

export function Badge({ children, variant = "soft", ...props }: Props) {
  // Map outline -> 'outline', others to 'soft' / 'solid'
  return (
    <RTBadge variant={variant as any} {...props}>
      {children}
    </RTBadge>
  );
}
