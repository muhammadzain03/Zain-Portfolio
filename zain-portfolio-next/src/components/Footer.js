export default function Footer() {
    return (
      <footer className="py-8 text-center text-sm bg-light dark:bg-dark text-dark/60 dark:text-light/60 border-t border-dark/10 dark:border-light/10">
        <p>
          &copy; {new Date().getFullYear()} Muhammad Zain. All rights reserved.
        </p>
        <p className="mt-2">Built with Next.js & Tailwind CSS</p>
      </footer>
    );
  }
  