import type { AppProps } from "next/app";
import "@/styles/tokens.css";
import "@/styles/globals.css";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "@/theme/nrg-theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div data-theme="light">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
