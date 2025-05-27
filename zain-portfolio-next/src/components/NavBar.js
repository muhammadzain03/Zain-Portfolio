import Link from "next/link";
import { FiGithub, FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white/90 dark:bg-dark backdrop-blur-md shadow-md z-50 px-8 flex justify-between items-center">
      <ul className="flex space-x-6 text-sm font-medium">
        {["home", "about", "projects", "resume", "leetcode"].map((item) => (
          <li key={item}>
            <Link
              href={`#${item}`}
              className="relative text-dark dark:text-light hover:text-blue-600 nav-link"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex space-x-4 items-center">
        <a href="https://github.com/muhammadzain03" target="_blank" rel="noopener noreferrer">
          <FiGithub className="h-5 w-5 hover:text-black dark:hover:text-white transition" />
        </a>
        <a href="https://www.linkedin.com/in/muhammad-zain03/" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn className="h-5 w-5 hover:text-blue-700 transition" />
        </a>
        <a href="mailto:muhammadzain0476@gmail.com">
          <FiMail className="h-5 w-5 hover:text-red-500 transition" />
        </a>
        <ThemeSwitcher />
      </div>
    </nav>
  );
}