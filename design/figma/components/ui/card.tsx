import * as React from "react";
import { Card as RTCard, Box, Heading } from "@radix-ui/themes";

type BoxProps = React.ComponentProps<typeof Box>;

export function Card({ children, ...props }: BoxProps) {
  // Using Radix Themes Card with default padding removed; consumers can add Box padding.
  return (
    <RTCard>
      <Box {...props}>{children}</Box>
    </RTCard>
  );
}

export function CardHeader({ children, ...props }: BoxProps) {
  return (
    <Box mb="3" {...props}>
      {children}
    </Box>
  );
}

export function CardTitle({ children, ...props }: React.ComponentProps<typeof Heading>) {
  return (
    <Heading size="3" {...props}>
      {children}
    </Heading>
  );
}

export function CardContent({ children, ...props }: BoxProps) {
  return <Box {...props}>{children}</Box>;
}
