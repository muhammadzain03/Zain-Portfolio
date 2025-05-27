import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeSwitcher = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Once mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-light/40 dark:bg-dark/40 hover:bg-light dark:hover:bg-dark transition-all duration-200 ease-in-out"
      aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {resolvedTheme === 'dark' ? (
        <FiSun className="w-5 h-5 text-primary hover:text-primaryDark transition-colors" />
      ) : (
        <FiMoon className="w-5 h-5 text-primary hover:text-primaryDark transition-colors" />
      )}
    </button>
  );
};

export default ThemeSwitcher;
