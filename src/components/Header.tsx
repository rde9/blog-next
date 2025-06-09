import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Rss, SearchIcon } from 'lucide-react';
import { SITE_TITLE } from '@/constants';
import ThemeSwitcher from './ThemeSwitcher';

type NodeProps = { children: React.ReactNode };
type NavItemProps = { href: string; item: string };

const Header: FC = () => {
  return (
    <div id='header-wrapper' className='animate-bg-img md:animate-none'>
      <header className='header-container grid grid-cols-1 items-center justify-items-center md:grid-cols-[auto_1fr] md:justify-items-start'>
        <div className='md:animate-header-left'>
          <Link
            className='mt-4 grid grid-cols-[auto_1fr] items-center text-xl md:mt-2'
            href='/'
          >
            <Logo />
            <span className='relative z-10 px-1 font-fredoka text-2xl font-medium text-link transition-colors duration-500 before:absolute before:inset-0 before:-z-10 before:my-auto before:origin-top-right before:scale-x-0 before:bg-link before:transition-transform before:duration-500 hover:text-gray-50 hover:before:origin-top-left hover:before:scale-x-100 dark:text-primary-text dark:before:bg-primary-text hover:dark:text-primary-600'>
              {SITE_TITLE}
            </span>
          </Link>
        </div>
        <div className='md:animate-header-right md:justify-self-end'>
          <div className='grid grid-cols-[auto_auto] items-center gap-1'>
            <Navbar>
              <NavbarItem href='/page/1' item='首页' />
              <NavbarItem href='/archives' item='归档' />
              <NavbarItem href='/tags' item='标签' />
              <NavbarItem href='/about' item='关于' />
            </Navbar>
            <ul className='grid grid-flow-col items-center text-primary-text'>
              <li className='hover:text-link-hover'>
                <a
                  className='grid cursor-not-allowed place-items-center px-2 lg:py-3'
                  href='/feed.xml'
                  title='RSS (not implemented yet)'
                >
                  <Rss />
                </a>
              </li>
              <li className='hover:text-link-hover'>
                <a
                  className='grid place-items-center px-2 lg:py-3'
                  href='/search'
                  title='搜索'
                >
                  <SearchIcon />
                </a>
              </li>
              <ThemeSwitcher />
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

const Navbar: FC<NodeProps> = ({ children }) => {
  return (
    <ul className='grid grid-flow-col items-center text-primary-text'>
      {children}
    </ul>
  );
};

const NavbarItem: FC<NavItemProps> = ({ href, item }) => {
  return (
    <li>
      <Link
        href={href}
        className='group grid place-items-center px-2 text-lg hover:text-link-hover lg:px-3 lg:py-3'
      >
        <span className='bg-gradient-to-l from-link-hover to-link-hover bg-[length:0px_2px] bg-right-bottom bg-no-repeat py-2 transition-bg-size duration-300 group-hover:bg-[length:100%_2px] group-hover:bg-left-bottom'>
          {item}
        </span>
      </Link>
    </li>
  );
};

function Logo() {
  return (
    <div
      className='logo-wrapper -mr-2 -mt-4 h-16 w-16 flex-shrink-0 bg-contain bg-center bg-no-repeat'
      aria-label='Logo'
    />
  );
}

export default Header;
