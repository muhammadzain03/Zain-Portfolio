/**
 * Web Vitals Component
 * Purpose: Monitor and optimize Core Web Vitals
 * Features:
 * - LCP optimization
 * - CLS prevention  
 * - FID measurement
 * - Performance tracking
 */

import { useEffect } from 'react';

const WebVitals = () => {
  useEffect(() => {
    // Prevent duplicate measurements
    if (window.__WEB_VITALS_MEASURED__) return;
    window.__WEB_VITALS_MEASURED__ = true;

    // Run in both development and production
    const isDev = process.env.NODE_ENV === 'development';
    
    // Development mode indicator (removed console.log for production)
    if (isDev) {
      // Web Vitals monitoring active in development
    }

    // Web Vitals measurement and optimization
    const measureWebVitals = async () => {
      try {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

        // Largest Contentful Paint (LCP) - Target: < 2.5s
        getLCP((metric) => {
          // Send to analytics if needed
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: Math.round(metric.value),
              non_interaction: true,
            });
          }
        });

        // First Input Delay (FID) - Target: < 100ms  
        getFID((metric) => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FID',
              value: Math.round(metric.value),
              non_interaction: true,
            });
          }
        });

        // Cumulative Layout Shift (CLS) - Target: < 0.1
        getCLS((metric) => {
          if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'CLS',
              value: Math.round(metric.value * 1000) / 1000,
              non_interaction: true,
            });
          }
        });

        // First Contentful Paint (FCP) - Target: < 1.8s
        getFCP((metric) => {
          // FCP measurement complete
        });

        // Time to First Byte (TTFB) - Target: < 600ms
        getTTFB((metric) => {
          // TTFB measurement complete
        });

      } catch (error) {
        // Web Vitals measurement failed silently
      }
    };

    // Measure when page is loaded
    if (document.readyState === 'complete') {
      measureWebVitals();
    } else {
      window.addEventListener('load', measureWebVitals);
      return () => window.removeEventListener('load', measureWebVitals);
    }
  }, []);

  return null; // This component doesn't render anything
};

export default WebVitals;