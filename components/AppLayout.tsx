import { ReactNode } from "react";
import { Theme, Container } from "@radix-ui/themes";
// IMPORTANT: ensure global styles are imported in pages/_app.tsx :
// import "@radix-ui/themes/styles.css";

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
