import { ReactNode } from "react";
import { Theme, Container } from "@radix-ui/themes";

type Props = { children: ReactNode };

export default function AppLayout({ children }: Props) {
  return (
    <Theme appearance="light" radius="large">
      <Container size="3" px="3" py="5">
        {children}
      </Container>
    </Theme>
  );
}
