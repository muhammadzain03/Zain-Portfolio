/**
 * SEO Component
 * Purpose: Comprehensive SEO optimization for all pages
 * Features:
 * - Dynamic meta tags
 * - Open Graph optimization
 * - Twitter Card support
 * - Structured data integration
 */

import Head from 'next/head';

const SEO = ({
  title = "Muhammad Zain | Software Engineering Student",
  description = "Third-year Software Engineering student at University of Calgary. Passionate about full-stack development, machine learning, and building impactful software solutions.",
  canonical = "/",
  ogImage = "/images/profile/zain.webp",
  ogType = "website",
  twitterCard = "summary_large_image",
  noindex = false,
  children
}) => {
  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || '';
  const baseUrl = publicUrl || 'https://muhammadzain.dev';
  const fullCanonical = canonical.startsWith('http') ? canonical : `${baseUrl}${canonical}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="googlebot" content={noindex ? "noindex,nofollow" : "index,follow"} />
      <meta name="author" content="Muhammad Zain" />
      <meta name="keywords" content="Muhammad Zain, Software Engineering, University of Calgary, Full-Stack Developer, React, Node.js, Python, Java, Machine Learning, Database Systems, Web Development, Portfolio" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:alt" content="Muhammad Zain - Software Engineering Student" />
      <meta property="og:site_name" content="Muhammad Zain Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullOgImage} />
      <meta property="twitter:image:alt" content="Muhammad Zain - Software Engineering Student" />
      
      {/* LinkedIn */}
      <meta property="article:author" content="Muhammad Zain" />
      <meta property="profile:first_name" content="Muhammad" />
      <meta property="profile:last_name" content="Zain" />
      <meta property="profile:username" content="muhammad-zain03" />
      
      {/* Performance Hints */}
      <link rel="prefetch" href="/Muhammad-Zain-Resume.pdf" />
      
      {/* Additional Custom Tags */}
      {children}
    </Head>
  );
};

export default SEO;