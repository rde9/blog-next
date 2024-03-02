import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `搜索`,
  description: '查找文章',
  openGraph: {
    type: 'website',
    url: `/search`,
    title: `搜索`,
    description: '查找文章',
  },
};

export default function Search() {
  return (
    <div className='flex min-h-[calc(80vh_-_96px)] animate-main'>
      <div className='m-auto flex flex-wrap justify-center gap-2 text-2xl text-primary-text'>
        <h2>⛏️ Under Construction...</h2>
      </div>
    </div>
  );
}
