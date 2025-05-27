import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="ml-4 p-2 border rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
    >
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
};

export default ThemeSwitcher;
