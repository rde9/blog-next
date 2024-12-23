import Link from 'next/link';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className='flex animate-main flex-col gap-1 p-6 font-rubik text-secondary-text'>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <span>© 2021 - 2024</span>
        <span>
          made with ❤️ by{' '}
          <Link href='https://github.com/rde9' className='hover:underline'>
            rde9
          </Link>
        </span>
        <img src='/by-nc-sa.svg' alt='by-nc-sa' className='h-8' />
      </div>
    </footer>
  );
};

export default Footer;
