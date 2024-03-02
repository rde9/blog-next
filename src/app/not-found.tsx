import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `404 Not Found`,
  description: '404 Not Found',
  openGraph: {
    type: 'website',
    url: `/not-found`,
    title: `404 Not Found`,
    description: '404 Not Found',
  },
};

export default function NotFound() {
  return (
    <div className='flex min-h-[calc(80vh_-_96px)] animate-main'>
      <div className='m-auto flex flex-wrap justify-center gap-2 text-2xl text-primary-text'>
        <h2>（¯\_(ツ)_/¯）</h2>
        <h2>404 Page Not Found</h2>
      </div>
    </div>
  );
}
