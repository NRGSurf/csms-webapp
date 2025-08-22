import type { AppProps } from "next/app";
import "@/styles/tokens.css"; // generated from tokens.json (next step)
import "@/styles/globals.css"; // your global styles (Tailwind or CSS)

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
