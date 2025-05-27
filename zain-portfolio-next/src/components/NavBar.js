import Link from "next/link";
import { FiGithub, FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import ThemeSwitcher from "./ThemeSwitcher";

export default function NavBar() {
  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Gradient line at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 dark:via-primaryDark/50 to-transparent"></div>
      
      {/* Glass effect background */}
      <nav className="px-8 h-16 flex justify-between items-center bg-light/75 dark:bg-dark/75 backdrop-blur-lg backdrop-saturate-150 shadow-lg shadow-black/[0.03] dark:shadow-white/[0.02]">
        <ul className="flex space-x-6 text-sm font-medium">
          {["home", "about", "projects", "resume", "leetcode"].map((item) => (
            <li key={item}>
              <Link
                href={`#${item}`}
                className="relative text-dark/90 dark:text-light/90 hover:text-primary dark:hover:text-primaryDark transition-colors group"
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-primary dark:bg-primaryDark transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex space-x-4 items-center">
          <a 
            href="https://github.com/muhammadzain03" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <FiGithub className="h-5 w-5 text-dark/90 dark:text-light/90 group-hover:text-primary dark:group-hover:text-primaryDark transition-colors" />
          </a>
          <a 
            href="https://www.linkedin.com/in/muhammad-zain03/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <FaLinkedinIn className="h-5 w-5 text-dark/90 dark:text-light/90 group-hover:text-primary dark:group-hover:text-primaryDark transition-colors" />
          </a>
          <a 
            href="mailto:muhammadzain0476@gmail.com"
            className="group relative p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            <FiMail className="h-5 w-5 text-dark/90 dark:text-light/90 group-hover:text-primary dark:group-hover:text-primaryDark transition-colors" />
          </a>
          <div className="pl-2">
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    </header>
  );
}