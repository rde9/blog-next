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
    <div id='header-wrapper' className='animate-bg-img sm:animate-none'>
      <header className='header-container flex flex-wrap justify-center sm:justify-between'>
        <div className='flex basis-full justify-center sm:basis-auto sm:animate-header-left'>
          <a className='flex items-center gap-1 py-1 text-xl' href='/'>
            <Logo />
            <span className='relative z-10 px-1 font-fredoka text-2xl font-medium text-primary-600 transition-colors duration-500 before:absolute before:inset-0 before:-z-10 before:my-auto before:origin-top-right before:scale-x-0 before:bg-primary-600 before:transition-transform before:duration-500 hover:text-gray-50 hover:before:origin-top-left hover:before:scale-x-100 dark:text-primary-text dark:before:bg-primary-text hover:dark:text-primary-600'>
              {SITE_TITLE}
            </span>
          </a>
        </div>
        <div className='flex flex-wrap justify-center gap-1 sm:animate-header-right sm:justify-between'>
          <Navbar>
            <NavbarItem href='/page/1' item='首页' />
            <NavbarItem href='/archives' item='归档' />
            <NavbarItem href='/tags' item='标签' />
            <NavbarItem href='/about' item='关于' />
          </Navbar>
          <ul className='flex items-stretch text-primary-text'>
            <li className='flex hover:text-link-hover'>
              <a
                className='flex cursor-not-allowed items-center px-2 py-3'
                href='/feed.xml'
                title='RSS (not implemented yet)'
              >
                <Rss />
              </a>
            </li>
            <li className='flex hover:text-link-hover'>
              <a
                className='flex items-center px-2 py-3'
                href='/search'
                title='搜索'
              >
                <SearchIcon />
              </a>
            </li>
            <ThemeSwitcher />
          </ul>
        </div>
      </header>
    </div>
  );
};

const Navbar: FC<NodeProps> = ({ children }) => {
  return <ul className='flex items-stretch text-primary-text'>{children}</ul>;
};

const NavbarItem: FC<NavItemProps> = ({ href, item }) => {
  return (
    <li className='flex'>
      <Link
        href={href}
        className='group flex items-center px-2 py-3 text-lg lg:px-3 hover:text-link-hover'
      >
      <span className='bg-gradient-to-l from-link-hover to-link-hover bg-[length:0px_2px] bg-no-repeat bg-right-bottom py-2 transition-bg-size duration-300 group-hover:bg-[length:100%_2px] group-hover:bg-left-bottom'>{item}</span>
      </Link>
    </li>
  );
};

function Logo() {
  return (
    <div className='logo-wrapper my-2'>
      <Image src='/logo.svg' alt='Logo' width='32' height='32' priority />
    </div>
  );
}

export default Header;
