import { FC } from 'react';
import type { Article } from 'contentlayer/generated';
import Link from 'next/link';
import { formatDate } from '@/utils/posts';
import { Clock, MoreHorizontal, Save } from 'react-feather';
import Image from 'next/image';
type Props = {
  post: Article;
};

const PostCard: FC<Props> = ({ post }) => {
  return (
    <article className='post-card group'>
      <div id='post-thumb' className='overflow-hidden md:h-72 md:basis-[55%]'>
        <div className='relative h-72 w-full md:max-h-72 md:w-full'>
          <Link href={`/post/${post.slug}`} className='cursor-default'>
            <Image
              src={post.photo ?? '/no-image.png'}
              alt={post.title}
              fill
              placeholder='blur'
              blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
              className='object-cover'
              // className='transition-transform duration-300 ease-linear group-hover:rotate-2 group-hover:scale-125'
            />
          </Link>
        </div>
      </div>
      <div id='post-meta' className='m-4 basis-full md:basis-[45%]'>
        <div className='flex h-full flex-col justify-between'>
          <div className='flex flex-col gap-2'>
            <div className='flex flex-wrap gap-4 text-secondary-text'>
              <span className='flex items-center'>
                <Clock size={16} strokeWidth={1} className='inline-block' />
                <span className='ml-1 text-sm'>
                  {`${formatDate(post.createdAt)}`}
                </span>
              </span>
              <span className='flex items-center'>
                <Save size={16} strokeWidth={1} className='inline-block' />
                <span className='ml-1 text-sm'>
                  {`${formatDate(post.updatedAt ?? post.createdAt)}`}
                </span>
              </span>
            </div>
            <Link href={`/post/${post.slug}`}>
              <span className='my-2 block text-xl font-bold text-primary'>
                {post.title}
              </span>
            </Link>
            <p className='mb-4 text-primary-text'>
              {post.summary ?? post.excerpt}
            </p>
          </div>
          <div className='flex flex-wrap gap-2 text-primary-text'>
            {post.tags.map((tag) => (
              <TagItem key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

const TagItem = ({ tag }: { tag: string }) => {
  return (
    <Link href={`/tags/${tag}`}>
      <span className='card-tag-item text-xs'>{tag}</span>
    </Link>
  );
};

export default PostCard;
