import { FC } from 'react';
import Post from '@/components/Post';
import { notFound } from 'next/navigation';
import { getPagesCount, getPost } from '@/utils/posts';
import { allArticles } from 'contentlayer/generated';
import Link from 'next/link';
import {
  formatDate,
  getSortedPosts,
  getSortedPostsByPage,
  getSortedPostsGroupedByYear,
} from '@/utils/posts';
import { PaginationControl } from '@/components/PaginationControl';
import PostCard from '@/components/PostCard';

type Params = {
  pageId: string;
};

const perPage = 6;
const pagesCount = getPagesCount(perPage);

export const generateStaticParams = async () => {
  const pageIds = Array.from({ length: pagesCount }, (_, i) => i + 1);
  const res = pageIds.map((pageId) => ({ pageId: String(pageId) }));
  return res;
};

const MainPage: FC<{ params: Params }> = ({ params }) => {
  const { pageId } = params;
  const posts = getSortedPostsByPage(Number(pageId), perPage);

  // if (posts.length === 0 || Number(pageId) > pagesCount) {
  //   return notFound()
  // }

  const hasNextPage = Number(pageId) < pagesCount;
  const hasPrevPage = Number(pageId) > 1;

  return (
    <div className='normal-container animate-main'>
      <div className='mx-4 flex flex-col gap-8 pt-6'>
        {posts.map((post) => {
          return (
            <PostCard key={post.slug} post={post} />
            // <div key={post.slug} className='archive-card'>
            //   <div className='archive-card-detail'>
            //     <div className='mb-2 text-sm text-[--text-l]'>
            //       <span>{formatDate(post.createdAt)}</span>
            //     </div>
            //     <Link href={`/post/${post.slug}`}>
            //       <span className='block'>{post.title}</span>
            //     </Link>
            //   </div>
            // </div>
          );
        })}
        <PaginationControl
          pageId={pageId}
          pagePath='/page'
          pagesCount={pagesCount}
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
        />
      </div>
    </div>
  );
};

export default MainPage;
