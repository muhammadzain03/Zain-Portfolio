/**
 * Layout.js
 * Purpose: Page chrome — persistent NavBar, Footer, and viewport/meta.
 * Note: Per-page SEO is handled by the SEO component; Layout stays presentation-only.
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