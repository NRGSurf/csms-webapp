import * as React from "react";
import { Button as RTButton } from "@radix-ui/themes";

type Props = React.ComponentProps<typeof RTButton> & { asChild?: boolean; className?: string };

export function Button({ children, asChild, className, size, ...props }: Props) {
  let mappedSize: 1 | 2 | 3 | 4 | undefined = undefined;
  if (size === "sm") mappedSize = 1;
  else if (size === "lg") mappedSize = 3;
  return (
    <RTButton size={mappedSize} {...props}>
      {children}
    </RTButton>
  );
}
