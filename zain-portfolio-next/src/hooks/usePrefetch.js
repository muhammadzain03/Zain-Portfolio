/**
 * usePrefetch.js
 * Purpose: Idle-time route prefetching to speed up first clicks.
 * Caution: Use pages-router prefetch signature (href only) to avoid runtime issues.
 */

import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export const usePrefetch = () => {
  const router = useRouter();
  const prefetchedRoutes = useRef(new Set());

  // Next.js pages router signature: prefetch(href: string, asPath?: string)
  // Do NOT pass an object; it causes vendor code to call indexOf on a non-string
  const prefetchRoute = useCallback((route) => {
    if (!router.isReady || typeof route !== 'string' || prefetchedRoutes.current.has(route)) return;

    try {
      router.prefetch(route);
      prefetchedRoutes.current.add(route);
    } catch (error) {
      // ignore non-critical prefetch errors
    }
  }, [router]);

  const prefetchAllRoutes = useCallback(() => {
    if (!router.isReady) return;

    const routes = ['/', '/about', '/projects', '/resume', '/leetcode'];

    // Use requestIdleCallback for non-blocking prefetch
    const defer = window.requestIdleCallback || ((cb) => setTimeout(cb, 0));

    defer(() => {
      routes.forEach((route) => prefetchRoute(route));
    });
  }, [router.isReady, prefetchRoute]);

  // Prefetch on mount
  useEffect(() => {
    prefetchAllRoutes();
  }, [prefetchAllRoutes]);

  // Prefetch on route change
  useEffect(() => {
    const handleRouteChange = () => {
      const routes = ['/', '/about', '/projects', '/resume', '/leetcode'];
      routes.forEach((route) => {
        if (typeof route === 'string' && route !== router.asPath) prefetchRoute(route);
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, prefetchRoute]);

  return { prefetchRoute, prefetchAllRoutes };
}; 