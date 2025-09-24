<!--
Masterclass README for Muhammad Zain – Portfolio
-->

<a name="muhammad-zain-portfolio"></a>
<h1 align="center">🌐 Muhammad Zain – Software Engineering Portfolio</h1>

<div align="center">

![Status](https://img.shields.io/badge/Status-Active-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-18-61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Node](https://img.shields.io/badge/Node-18%2B-339933)

<em>A modern, fast, and accessible portfolio built with Next.js and Tailwind CSS.</em>

</div>

---

## 📋 Table of Contents
- [Project Overview](#project-overview)
- [Features & Highlights](#features-and-highlights)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Performance & Optimization](#performance-and-optimization)
- [Deployment & Production](#deployment-and-production)
- [Development Process](#development-process)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

<a name="project-overview"></a>
## 🚀 Project Overview

This is my personal portfolio showcasing my background as a Software Engineering student at the University of Calgary, along with a curated selection of projects and interests. The site demonstrates modern web development practices with a focus on performance, accessibility, and user experience.

<a name="features-and-highlights"></a>
## ✨ Features & Highlights

### Core Features
- **Multi-page portfolio** with dedicated sections for projects, resume, and about information
- **Interactive project showcase** with modal image/video previews and detailed descriptions
- **Embedded resume viewer** with PDF display and download functionality
- **Contact system** with floating launcher and quick-copy actions for email/social links
- **Theme switching** with dark/light mode support and system preference detection

### User Experience
- **Fully responsive design** optimized for mobile → tablet → desktop viewports
- **Smooth animations** using framer-motion with GPU-friendly transforms and opacity changes
- **Zero layout shift (CLS)** through proper image sizing and skeleton loading states
- **Instant navigation** via idle-time route prefetching with custom `usePrefetch` hook
- **Accessibility-first** with semantic HTML, proper ARIA labels, and keyboard navigation

### Technical Implementation
- **SEO optimization** with per-page meta tags, Open Graph, Twitter cards, and structured data (JSON-LD)
- **Performance monitoring** using Web Vitals with silent metrics collection
- **Security headers** including strict CSP, HSTS, and content type validation
- **Image optimization** via Next.js Image component with custom wrapper for consistent sizing
- **Code splitting** with dynamic imports for secondary UI components to reduce initial bundle size

<a name="tech-stack"></a>
## 🧰 Tech Stack

### Framework & Core
- **Next.js 15** (Pages Router) - React framework with SSG/SSR capabilities
- **React 18** - UI library with concurrent features
- **Tailwind CSS 3.x** - Utility-first CSS framework with custom theme configuration

### Libraries & Tools
- **framer-motion** - Animation library for smooth, performant transitions
- **next-themes** - Theme management with system preference detection
- **react-icons** - Icon library with consistent styling
- **web-vitals** - Performance metrics collection for Core Web Vitals

### Development & Build
- **ESLint** - Code linting with custom rules
- **PostCSS** - CSS processing and optimization
- **Vercel** - Deployment platform with automatic builds

<a name="architecture"></a>
## 🏗 Architecture

```
Zain Portfolio/
  README.md
  LICENSE
  zain-portfolio-next/
    public/                      # Static assets
      images/                    # Optimized images (WebP format)
      Muhammad-Zain-Resume.pdf   # Resume file
      manifest.json              # PWA manifest
    src/
      components/                # Reusable UI components
        SEO.js                   # Per-page SEO management
        OptimizedImage.js        # Image wrapper with loading states
        ThemeSwitcher.js         # Dark/light theme toggle
        ContactChat.js           # Floating contact launcher
      hooks/                     # Custom React hooks
        usePrefetch.js           # Route prefetching logic
        useSwipeGestures.js      # Mobile gesture handling
      pages/                     # Next.js pages and API routes
        api/notify-visit.js      # Analytics endpoint
      styles/                    # Global styles and responsive design
    next.config.mjs              # Next.js configuration with security headers
    tailwind.config.js           # Tailwind theme and component configuration
```

<a name="performance-and-optimization"></a>
## ⚡ Performance & Optimization

You can see the portfolio in action on the live site. The production build achieves perfect optimization scores:

### Lighthouse Results (Production)
- **Performance: 100/100** - Optimized LCP, FID, and CLS metrics
- **Accessibility: 100/100** - WCAG compliance with semantic structure
- **Best Practices: 100/100** - Security headers, HTTPS, and modern standards
- **SEO: 100/100** - Complete meta tags, structured data, and crawlability

![Lighthouse score (production)](Lighthouse-score.png)

### Optimization Techniques
- **LCP optimization** - Hero images use `priority` loading and avoid fade-in animations
- **JavaScript optimization** - Code splitting reduces initial bundle to essential components only
- **Image handling** - Responsive images with proper `sizes` attributes and WebP format
- **Animation performance** - GPU-accelerated transforms avoid layout thrashing
- **Prefetching strategy** - Routes prefetch during idle time for instant navigation
- **Bundle analysis** - Tree shaking eliminates unused code in production builds

<a name="deployment-and-production"></a>
## 🚢 Deployment & Production

**Platform:** Vercel with automatic deployments from the main branch

**Build Process:**
- Development builds include HMR, React refresh, and debugging tools
- Production builds enable minification, tree-shaking, and static optimization
- Automatic image optimization and WebP conversion during build
- Environment-specific configuration for analytics and performance monitoring

**Performance Monitoring:**
- Web Vitals collection in production for real user metrics
- Lighthouse CI integration for automated performance testing
- Error tracking and performance regression detection

<a name="development-process"></a>
## 🛤 Development Process

Building this portfolio involved multiple iterations focused on achieving production-quality performance while maintaining clean, maintainable code.

### Development Approach
- **Performance-first design** - Every feature evaluated for impact on Core Web Vitals
- **Mobile-first responsive design** - Built for mobile with progressive enhancement
- **Accessibility integration** - WCAG guidelines followed from initial design phase
- **Cross-browser testing** - Verified compatibility across modern browsers and devices

### Key Implementation Details
- **SEO strategy** - Structured data, meta tags, and sitemap generation for search visibility
- **Security implementation** - CSP headers, input validation, and secure deployment practices
- **Code organization** - Component-based architecture with clear separation of concerns
- **Performance monitoring** - Integrated analytics for tracking user experience metrics

### Quality Assurance
- Manual testing across desktop, tablet, and mobile viewports
- Lighthouse audits for both desktop and mobile in production environment
- Code review processes for maintainability and performance optimization
- Accessibility testing with screen readers and keyboard navigation

<a name="contributing"></a>
## 🤝 Contributing

This is a personal portfolio project, but I'm always open to suggestions and improvements. Feel free to open an issue or reach out if you notice something that could be enhanced.

<a name="license"></a>
## 📄 License

MIT License © 2025 Muhammad Zain

<a name="contact"></a>
## 📞 Contact

- **Project Maintainer:** Muhammad Zain
- **Email:** muhammadzain0476@gmail.com

<div align="center">

Made with passion using Next.js, Tailwind CSS, and thoughtful attention to detail

[⬆ Back to Top](#muhammad-zain-portfolio)

</div>