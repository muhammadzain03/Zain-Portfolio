/**
 * usePrefetch Hook
 * Purpose: Optimized prefetching for instant navigation
 * Features:
 * - Intelligent prefetching based on user behavior
 * - Priority-based loading
 * - Memory-efficient caching
 */

import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export const usePrefetch = () => {
  const router = useRouter();
  const prefetchedRoutes = useRef(new Set());

  // Next.js pages router prefetch signature is prefetch(href: string, asPath?: string)
  // Avoid passing an object (would cause indexOf errors). Priority is ignored here.
  const prefetchRoute = useCallback((route) => {
    if (!router.isReady || prefetchedRoutes.current.has(route)) return;

    try {
      router.prefetch(route);
      prefetchedRoutes.current.add(route);
    } catch (error) {
      console.warn(`Failed to prefetch ${route}:`, error);
    }
  }, [router]);

  const prefetchAllRoutes = useCallback(() => {
    if (!router.isReady) return;

    const routes = ['/', '/about', '/projects', '/resume', '/leetcode'];
    
    // Use requestIdleCallback for non-blocking prefetch
    const prefetch = window.requestIdleCallback || ((cb) => setTimeout(cb, 0));
    
    prefetch(() => {
      routes.forEach(route => prefetchRoute(route));
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
      routes.forEach(route => {
        if (route !== router.asPath) prefetchRoute(route);
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router, prefetchRoute]);

  return { prefetchRoute, prefetchAllRoutes };
}; 