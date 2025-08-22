import type { AppProps } from "next/app";
import "@radix-ui/themes/styles.css";
import "@/styles/tokens.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
