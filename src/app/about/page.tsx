import type { Metadata } from 'next';
import Link from 'next/link';

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

export default function About() {
  return (
    <div className='normal-container animate-main'>
      <h2 className='mb-4 pt-6 text-3xl'>关于</h2>
      <div className='prose'>
        <p>
          Github:{' '}
          <Link
            href='https://github.com/rde9'
            target='_blank'
            rel='noreferrer'
            className='text-link no-underline hover:text-link-hover'
          >
            rde9
          </Link>
          <br />
          Twitter / X:{' '}
          <Link
            href='https://twitter.com/haru_nc_'
            target='_blank'
            rel='noreferrer'
            className='text-link no-underline hover:text-link-hover'
          >
            Haru
          </Link>
          <br />
          Email: <span>her#ayame.network</span>
        </p>
      </div>
    </div>
  );
}
