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
          <a className='flex items-center gap-2 py-1 text-xl' href='/'>
            <Logo />
            <span className='font-fredoka text-2xl font-medium text-primary-600'>
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
        className='flex items-center px-2 py-3 text-lg hover:text-link-hover lg:px-3'
      >
        {item}
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
