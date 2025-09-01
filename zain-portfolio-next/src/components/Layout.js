/**
 * Layout.js
 * Purpose: Page chrome — persistent NavBar, Footer, and viewport/meta.
 * Note: Per-page SEO is handled by the SEO component; Layout stays presentation-only.
 */

import NavBar from "./NavBar";
import Footer from "./Footer";
import LoadingIndicator from "./LoadingIndicator";
import BottomNavigation from "./BottomNavigation";
import PageTransition from "./PageTransition";

export default function Layout({ children }) {
  return (
    <>
      {/* Head tags are managed per-page via SEO component */}
      <LoadingIndicator />
      <div className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light">
        <NavBar />
        <PageTransition>
          <main className="pt-14 sm:pt-16 pb-16 md:pb-0">{children}</main>
        </PageTransition>
        <Footer />
        <BottomNavigation />
      </div>
    </>
  );
}