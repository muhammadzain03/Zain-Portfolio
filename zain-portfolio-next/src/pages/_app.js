/**
 * _app.js
 * Purpose: Main application wrapper for the Next.js portfolio
 * Features:
 * - Global layout and styling
 * - Theme provider setup
 * - Font optimization
 * - Global state management (if any)
 */

import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
