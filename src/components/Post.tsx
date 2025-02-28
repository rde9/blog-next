import { FC } from 'react';
import Image from 'next/image';
import { Article } from 'contentlayer/generated';
import { MarkdownRenderer } from './Markdown';
import TOCRenderer from './TOC';
import { CCInfo } from './CCInfo';
import Link from 'next/link';
import { formatDate } from '@/utils/posts';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
type Props = {
  post: Article;
  previousPost?: Article | null;
  nextPost?: Article | null;
};

const Spacer = () => {
  return (
    <div className='my-8 flex items-center justify-center'>
      <div className='h-[1px] flex-grow bg-gray-200 dark:bg-gray-700'></div>
      <span className='mx-4 font-serif text-sm italic text-gray-400 dark:text-gray-500'>
        fin
      </span>
      <div className='h-[1px] flex-grow bg-gray-200 dark:bg-gray-700'></div>
    </div>
  );
};

const Post: FC<Props> = ({ post, previousPost, nextPost }) => {
  return (
    <>
      <div className='bg-container animate-bg-img'>
        <div className='bg-image-container'>
          {post.photo && (
            <Image
              src={post.photo}
              alt={post.title}
              fill
              className='dark:img-dark-filter object-cover'
            />
          )}
        </div>
        <header className='absolute bottom-[9rem] w-full px-[10%] text-white'>
          <div className='post-container'>
            <div
              className='flex flex-col flex-wrap content-center gap-6 break-words'
              style={{
                textShadow: '2px 2px 8px #000',
              }}
            >
              <h1 className='text-center text-3xl font-bold'>{post.title}</h1>
              <div className='flex flex-wrap justify-center gap-2 text-sm font-medium'>
                <span className='ml-1'>
                  {`创建于 ${formatDate(post.createdAt)}`}
                </span>
                <span>&middot;</span>
                <span className='ml-1'>
                  {`更改于 ${formatDate(post.updatedAt ?? post.createdAt)}`}
                </span>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div className='post-container mt-4 animate-main'>
        <div className='gap-4 lg:grid lg:grid-cols-[minmax(36rem,_2.5fr)_1.25fr]'>
          <div id='grid-main' className='xl:max-w-none'>
            <div id='markdown-card' className='px-2 py-6'>
              <div
                id='markdown-wrapper'
                className='prose max-w-none dark:prose-invert  prose-blockquote:border-l-border prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-secondary-text dark:prose-blockquote:text-white/60'
              >
                {/* <div id='markdown-renderer' className='markdown-renderer'>
                <NodesRenderer nodes={mdastRoot.children} />
              </div> */}
                <MarkdownRenderer>{post.body.raw}</MarkdownRenderer>
                <Spacer />
                <CCInfo imageUrl='/cc_sign.png' />
              </div>
              <div className='flex flex-wrap gap-2 p-4 text-sm font-medium'>
                {post.tags.map((tag) => (
                  <Link href={`/tags/${tag}`} key={tag}>
                    <span key={tag} className='card-tag-item bg-bg-card'>
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {previousPost && (
                  <Link 
                    href={`/post/${previousPost.slug}`}
                    className="border md:border-none p-4 bg-bg-card hover:bg-bg-card-hover duration-500 rounded-xl"
                    aria-label="Older"
                  >
                    <div className="flex items-center text-sm text-secondary-text">
                      <ChevronLeftIcon className='w-4 h-4' />
                      <span>Older</span>
                    </div>
                    <h3 className="mt-2 line-clamp-2 text-lg font-medium text-primary-text">
                      {previousPost.title}
                    </h3>
                  </Link>
                )}
                {nextPost && (
                  <Link
                    href={`/post/${nextPost.slug}`}
                    className="border md:border-none p-4 bg-bg-card hover:bg-bg-card-hover duration-500 rounded-xl md:text-right"
                    aria-label="Newer"
                  >
                    <div className="flex items-center text-sm text-secondary-text md:justify-end">
                      <span>Newer</span>
                      <ChevronRightIcon className='w-4 h-4' />
                    </div>
                    <h3 className="mt-2 line-clamp-2 text-lg font-medium text-primary-text">
                      {nextPost.title}
                    </h3>
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div
            id='grid-right'
            className='hidden break-all lg:flex print:hidden'
          >
            <div
              id='toc-card'
              className='sticky top-6 max-h-[calc(-10rem+100vh)] self-start overflow-auto border-l-[1px] border-dotted px-4 py-6'
              style={{ scrollbarWidth: 'thin' }}
            >
              <TOCRenderer>{post.body.raw}</TOCRenderer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
