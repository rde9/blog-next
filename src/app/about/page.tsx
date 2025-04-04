import type { Metadata } from 'next';
import Link from 'next/link';
import { Github, Twitter, Youtube, Mail, ExternalLinkIcon } from 'lucide-react';
import { FC } from 'react';

export const metadata: Metadata = {
  title: `关于`,
  description: '关于我',
  openGraph: {
    type: 'website',
    url: `/about`,
    title: `关于`,
    description: '关于我',
  },
};

type ExternalLinkProps = {
  href: string | undefined;
  children: React.ReactNode;
};

const ExternalLink: FC<ExternalLinkProps> = ({ href, children }) => (
  <Link
    href={href ?? ''}
    target='_blank'
    rel='noreferrer'
    className='group inline-flex items-center font-rubik text-sm no-underline transition-colors duration-300'
  >
    <span className='text-gray-600 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-300'>
      {children}
    </span>
    <span className='relative'>
      <ExternalLinkIcon className='ml-1 h-3 w-3 text-gray-600 transition-opacity duration-300 group-hover:opacity-0 dark:text-gray-200' />
      <ExternalLinkIcon className='absolute left-0 top-0 ml-1 h-3 w-3 text-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-gray-300' />
    </span>
  </Link>
);

export default function About() {
  return (
    <div className='normal-container animate-main space-y-8'>
      <section>
        <h2 className='page-heading'>
          <span>A</span>bout
        </h2>
        <p className='leading-relaxed text-gray-600 dark:text-gray-100'>22.</p>
      </section>

      <section>
        <h2 className='page-heading'>
          <span>L</span>inks
        </h2>
        <div className='flex flex-wrap gap-6 font-rubik'>
          <Link
            href='https://github.com/rde9'
            target='_blank'
            rel='noreferrer'
            className='group flex items-center no-underline transition-colors duration-300'
          >
            <div className='relative'>
              <Github className='mr-2 h-6 w-6 text-gray-600 transition-opacity duration-300 group-hover:opacity-0 dark:text-gray-200' />
              <Github className='absolute left-0 top-0 mr-2 h-6 w-6 text-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:text-gray-300' />
            </div>
            <span className='text-gray-600 transition-colors duration-300 group-hover:text-gray-900 dark:text-gray-200 dark:group-hover:text-gray-300'>
              GitHub
            </span>
          </Link>

          <Link
            href='https://x.com/haru_nc_'
            target='_blank'
            rel='noreferrer'
            className='group flex items-center no-underline transition-colors duration-300'
          >
            <div className='relative'>
              <Twitter className='mr-2 h-6 w-6 text-gray-600 transition-opacity duration-300 group-hover:opacity-0 dark:text-gray-200' />
              <Twitter className='absolute left-0 top-0 mr-2 h-6 w-6 text-blue-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </div>
            <span className='text-gray-600 transition-colors duration-300 group-hover:text-blue-400 dark:text-gray-200'>
              X(Twitter)
            </span>
          </Link>

          <Link
            href='https://www.youtube.com/@quppy_93rr'
            target='_blank'
            rel='noreferrer'
            className='group flex items-center no-underline transition-colors duration-300'
          >
            <div className='relative'>
              <Youtube className='mr-2 h-6 w-6 text-gray-600 transition-opacity duration-300 group-hover:opacity-0 dark:text-gray-200' />
              <Youtube className='absolute left-0 top-0 mr-2 h-6 w-6 text-red-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </div>
            <span className='text-gray-600 transition-colors duration-300 group-hover:text-red-600 dark:text-gray-200'>
              YouTube
            </span>
          </Link>

          <div className='group flex items-center no-underline transition-colors duration-300'>
            <div className='relative'>
              <Mail className='mr-2 h-6 w-6 text-gray-600 transition-opacity duration-300 group-hover:opacity-0 dark:text-gray-200' />
              <Mail className='absolute left-0 top-0 mr-2 h-6 w-6 text-link opacity-0 transition-opacity duration-300 group-hover:opacity-100' />
            </div>
            <span className='text-gray-600 transition-colors duration-300 group-hover:text-link dark:text-gray-200'>
              her#ayame.network
            </span>
          </div>
        </div>
      </section>

      <section>
        <h2 className='page-heading'>
          <span>C</span>redits
        </h2>
        <p className='leading-relaxed text-gray-600 dark:text-gray-100'>
          角色设计: はるゐろは 様{' | '}
          <ExternalLink href='https://sakuraharuiroha.wixsite.com/haruiroha'>
            HomePage
          </ExternalLink>
          {' · '}
          <ExternalLink href='https://x.com/_Haruiroha'>
            X(Twitter)
          </ExternalLink>
          <br />
          像素画: 千羽（ちはね） 様{' | '}
          <ExternalLink href='https://x.com/tobihaneta'>
            X(Twitter)
          </ExternalLink>
        </p>
      </section>
    </div>
  );
}
