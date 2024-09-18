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

const perPage = 6;
const pagesCount = getPagesCount(perPage);

const Home: FC = () => {
  const pageId = '1';
  const posts = getSortedPostsByPage(Number(pageId), perPage);
  const hasNextPage = pagesCount > 1;
  const hasPrevPage = false;

  return (
    <div className='normal-container animate-main'>
      <h2 className='page-heading'>
        <span>R</span>ecent <span>P</span>osts
      </h2>
      <div className='mx-4 flex flex-col gap-8 pt-6'>
        {posts.map((post) => {
          return <PostCard key={post.slug} post={post} />;
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

export default Home;
