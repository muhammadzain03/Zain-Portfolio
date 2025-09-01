/**
 * Layout.js
 * Purpose: Page chrome with mobile-optimized navigation and components.
 * Note: Per-page SEO is handled by the SEO component; Layout includes mobile enhancements.
 */

import NavBar from "./NavBar";
import Footer from "./Footer";
import LoadingIndicator from "./LoadingIndicator";
import BottomNavigation from "./BottomNavigation";

export default function Layout({ children }) {
  return (
    <>
      {/* Head tags are managed per-page via SEO component */}
      <LoadingIndicator />
      <div className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light">
        <NavBar />
        <main className="pt-14 sm:pt-16 pb-16 md:pb-0">{children}</main>
        <Footer />
        <BottomNavigation />
      </div>
    </>
  );
}