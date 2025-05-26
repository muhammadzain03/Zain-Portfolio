export default function Footer() {
    return (
      <footer className="py-8 text-center text-sm text-gray-500 bg-white border-t border-gray-200">
        <p>
          &copy; {new Date().getFullYear()} Muhammad Zain. All rights reserved.
        </p>
        <p className="mt-2">Built with Next.js & Tailwind CSS</p>
      </footer>
    );
  }
  