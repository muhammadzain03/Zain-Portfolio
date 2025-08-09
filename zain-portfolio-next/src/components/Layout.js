/**
 * Layout.js
 * Purpose: Main layout wrapper for consistent page structure
 * Features:
 * - Common layout elements (header, footer)
 * - Navigation integration
 * - Container sizing and padding
 * - Consistent styling across pages
 */

import NavBar from "./NavBar";
import Footer from "./Footer";
import LoadingIndicator from "./LoadingIndicator";

export default function Layout({ children }) {
  return (
    <>
      {/* Head tags are managed per-page via SEO component */}
      <LoadingIndicator />
      <div className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light">
        <NavBar />
        <main className="pt-16">{children}</main>
        <Footer />
      </div>
    </>
  );
}