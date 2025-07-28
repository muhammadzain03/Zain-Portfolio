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
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Aggressive prefetching for instant navigation
  useEffect(() => {
    const prefetchPages = async () => {
      // Use requestIdleCallback for better performance
      if (window.requestIdleCallback) {
        window.requestIdleCallback(() => {
          Promise.all([
            router.prefetch('/', undefined, { priority: true }),
            router.prefetch('/about', undefined, { priority: true }),
            router.prefetch('/projects', undefined, { priority: true }),
            router.prefetch('/leetcode', undefined, { priority: true }),
            router.prefetch('/resume', undefined, { priority: true }),
          ]);
        });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(() => {
          Promise.all([
            router.prefetch('/', undefined, { priority: true }),
            router.prefetch('/about', undefined, { priority: true }),
            router.prefetch('/projects', undefined, { priority: true }),
            router.prefetch('/leetcode', undefined, { priority: true }),
            router.prefetch('/resume', undefined, { priority: true }),
          ]);
        }, 100);
      }
    };
    prefetchPages();
  }, [router]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true} disableTransitionOnChange={false}>
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
}
