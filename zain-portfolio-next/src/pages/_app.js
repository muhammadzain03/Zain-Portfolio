/**
 * _app.js
 * Purpose: Main application wrapper for the Next.js portfolio
 * Features:
 * - Global layout and styling
 * - Theme provider setup
 * - Font optimization
 * - Global state management (if any)
 * - Advanced routing optimizations
 */

import Layout from "@/components/Layout";
import WebVitals from "@/components/WebVitals";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import { usePrefetch } from '@/hooks/usePrefetch';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  
  // Use custom prefetch hook for optimized routing
  usePrefetch();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange={false}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <WebVitals />
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
}
