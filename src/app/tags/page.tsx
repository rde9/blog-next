import { getAllTags } from '@/utils/posts';
import { Metadata } from 'next';
import Link from 'next/link';
import { FC } from 'react';
import { LucideTag } from 'lucide-react';

const tags = getAllTags();
const tagsArray = Object.entries(tags);
const sortedTags = tagsArray.sort((a, b) => b[1] - a[1]);

export const metadata: Metadata = {
  title: `标签列表`,
  description: '文章标签',
  openGraph: {
    type: 'website',
    url: `/tags`,
    title: `Tags`,
    description: '文章标签',
  },
};

const TagsPage: FC = () => {
  return (
    <div className='normal-container animate-main'>
      <h2 className='mb-4 pt-6 text-3xl'>标签列表</h2>
      <div className='flex flex-wrap items-baseline gap-6 py-3'>
        {sortedTags.map(([tag, count]) => (
          <TagItem key={tag} tag={tag} count={count} />
        ))}
      </div>
    </div>
  );
};

const TagItem: FC<{ tag: string; count: number }> = ({ tag, count }) => {
  const size = `${Math.log(count) / 6 + 0.95}rem`;
  return (
    <span
      className='flex cursor-pointer items-center text-primary-text hover:text-link-hover'
      style={{
        fontSize: `${size}`,
      }}
    >
      <span className='flex items-center duration-300 hover:scale-105'>
        <LucideTag width={size} height={size} />
        <Link href={`/tags/${tag}`} className='mx-1'>
          {tag}
        </Link>
      </span>
      <sup className='text-sm text-secondary-text'>{count}</sup>
    </span>
  );
};

export default TagsPage;
