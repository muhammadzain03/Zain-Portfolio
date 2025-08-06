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
import WebVitals from "@/components/WebVitals";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Optimized prefetching for better performance
  useEffect(() => {
    // Only prefetch when router is ready and on idle
    if (!router.isReady) return;
    
    const prefetchPages = () => {
      if (typeof window === 'undefined') return;
      
      // Use requestIdleCallback for non-blocking prefetch
      const prefetch = window.requestIdleCallback || ((cb) => setTimeout(cb, 0));
      
      prefetch(() => {
        const routes = ['/', '/about', '/projects', '/leetcode', '/resume'];
        routes.forEach(route => {
          router.prefetch(route);
        });
      });
    };

    // Only prefetch after initial load
    const timer = setTimeout(prefetchPages, 1000);
    return () => clearTimeout(timer);
  }, [router.isReady, router]);

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
