import type { AppProps } from "next/app";
import "@radix-ui/themes/styles.css";
import "@/styles/tokens.css";
import "@/styles/globals.css";
import "@/styles/components.css";

import { Theme as RadixTheme } from "@radix-ui/themes";
import { ThemeProvider, CssBaseline } from "@mui/material";
import muiTheme from "@/theme/nrg-theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RadixTheme appearance="light" scaling="100%">
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </RadixTheme>
  );
}
