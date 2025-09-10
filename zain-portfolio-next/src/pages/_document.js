/**
 * pages/_document.js
 * Purpose: Custom document shell; minimal critical styles and data.
 */

import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Resource Hints */}
        {/* Keep head light; avoid over-preconnecting to improve LCP consistency */}
        
        {/* Performance Optimizations */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* Critical CSS */}
        <style>{`
          /* Prevent Layout Shifts */
          html { scroll-behavior: smooth; }
          body { overflow-y: scroll; }
          * { text-rendering: optimizeLegibility; }
          img, svg { display: block; }
        `}</style>
        {/* Critical Resource Preconnections - Already defined above */}
        
        {/* Optimized Font Loading for Better LCP */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </noscript>
        

        
        {/* Security Headers: governed by server headers; keep meta minimal to avoid conflicts */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()" />
        
        {/* DNS Prefetch for External Resources */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        
        {/* PWA Manifest and Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="color-scheme" content="light dark" />
        
        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Zain Portfolio" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        
        {/* Structured Data for Enhanced SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Muhammad Zain",
              "jobTitle": "Software Engineering Student",
              "description": "Third-year Software Engineering student at University of Calgary specializing in full-stack development, machine learning, and database systems.",
              "url": "https://muhammadzain.dev",
              "image": "/images/profile/zain.webp",
              "sameAs": [
                "https://github.com/muhammadzain03",
                "https://linkedin.com/in/muhammadzain03"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "University of Calgary",
                "url": "https://ucalgary.ca"
              },
              "knowsAbout": [
                "Software Engineering",
                "Full-Stack Web Development",
                "Machine Learning",
                "Database Management",
                "React.js",
                "Node.js",
                "Python",
                "Java",
                "C++"
              ],
              "hasCredential": {
                "@type": "EducationalOccupationalCredential",
                "credentialCategory": "Bachelor's Degree",
                "educationalLevel": "Undergraduate",
                "about": "Software Engineering"
              }
            })
          }}
        />
      </Head>
      <body className="bg-gray-50 text-gray-800">
        <Main />
        <NextScript />
        {/* Notify-visit beacon (invisible, non-blocking, user not notified) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                if (window.__VISIT_NOTIFIED__) return; window.__VISIT_NOTIFIED__=true;
                var data = {
                  path: window.location.pathname,
                  tz: (Intl.DateTimeFormat && Intl.DateTimeFormat().resolvedOptions().timeZone) || '',
                  lang: (navigator.language || navigator.userLanguage || '')
                };
                try {
                  if (navigator.sendBeacon) {
                    var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
                    navigator.sendBeacon('/api/notify-visit', blob);
                  } else if (window.fetch) {
                    fetch('/api/notify-visit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data), keepalive: true, cache: 'no-store' });
                  }
                } catch(e) {}
              })();
            `
          }}
        />
      </body>
    </Html>
  );
}
