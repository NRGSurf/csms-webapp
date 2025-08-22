import * as React from "react";
import { Card as RTCard, Box, Heading, Text } from "@radix-ui/themes";

export function Card({ children, ...props }: React.ComponentProps<typeof Box>) {
  return (
    <RTCard>
      <Box {...props}>{children}</Box>
    </RTCard>
  );
}

export function CardHeader({ children, ...props }: React.ComponentProps<typeof Box>) {
  return <Box mb="3" {...props}>{children}</Box>;
}

export function CardTitle({ children, ...props }: React.ComponentProps<typeof Heading>) {
  return <Heading size="3" {...props}>{children}</Heading>;
}

export function CardContent({ children, ...props }: React.ComponentProps<typeof Box>) {
  return <Box {...props}>{children}</Box>;
}
