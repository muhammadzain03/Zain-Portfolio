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
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Muhammad Zain | Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Software Engineer Portfolio for Muhammad Zain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light">
        <NavBar />
        <main className="pt-16">{children}</main>
        <Footer />
      </div>
    </>
  );
}
