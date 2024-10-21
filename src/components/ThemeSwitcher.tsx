'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { SunMoon, Monitor, Sun, Moon } from 'lucide-react';
import { FC } from 'react';

const ThemeSwitcher: FC = () => {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    window.localStorage.setItem('theme', newTheme);
  };

  return (
    <li className='relative flex'>
      <button
        className='flex items-center px-2 lg:py-3 hover:text-link-hover'
        onClick={() => setMenuOpen(!menuOpen)}
        title='切换暗色模式'
      >
        <SunMoon />
      </button>
      {menuOpen && (
        <ul className='absolute right-0 top-full z-20 flex flex-col gap-1 whitespace-nowrap rounded-md bg-bg-card p-2 shadow-md'>
          <li>
            <button
              className='flex items-center gap-2 p-2 hover:text-link-hover'
              onClick={() => setTheme('system')}
            >
              <Monitor />
              <span>跟随系统</span>
            </button>
          </li>
          <li>
            <button
              className='flex items-center gap-2 p-2 hover:text-link-hover'
              onClick={() => setTheme('light')}
            >
              <Sun />
              <span>亮色模式</span>
            </button>
          </li>
          <li>
            <button
              className='flex items-center gap-2 p-2 hover:text-link-hover'
              onClick={() => setTheme('dark')}
            >
              <Moon />
              <span>暗色模式</span>
            </button>
          </li>
        </ul>
      )}
    </li>
  );
};
export default ThemeSwitcher;
