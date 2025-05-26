import Link from "next/link";
import { FiGithub, FiMail } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-white/90 backdrop-blur-md shadow-md z-50 px-8 flex justify-between items-center">
      <ul className="flex space-x-6 text-sm font-medium">
        <li><Link href="#home" className="hover:text-blue-600">Home</Link></li>
        <li><Link href="#about" className="hover:text-blue-600">About</Link></li>
        <li><Link href="#projects" className="hover:text-blue-600">Projects</Link></li>
        <li><Link href="#resume" className="hover:text-blue-600">Resume</Link></li>
        <li><Link href="#leetcode" className="hover:text-blue-600">LeetCode</Link></li>
      </ul>
      <div className="flex space-x-4">
        <a href="https://github.com/muhammadzain03" target="_blank" rel="noopener noreferrer" className="hover:text-black">
          <FiGithub className="h-5 w-5" />
        </a>
        <a href="https://www.linkedin.com/in/muhammad-zain03/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
          <FaLinkedinIn className="h-5 w-5" />
        </a>
        <a href="mailto:muhammadzain03@gmail.com" className="hover:text-red-500">
          <FiMail className="h-5 w-5" />
        </a>
      </div>
    </nav>
  );
}
