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
      <div className="bg-gray-50 text-gray-800 font-sans">
        <NavBar />
        <main className="pt-16">{children}</main>
        <Footer />
      </div>
    </>
  );
}
