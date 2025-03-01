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

export const generateMetadata = async (props: { params: Promise<Params> }) => {
  const params = await props.params;
  const { pageId } = params;

  return {
    title: `归档 - 第${pageId}页`,
    description: '文章归档',
    openGraph: {
      type: 'website',
      url: `/archives/${pageId}`,
      title: `归档 - 第${pageId}页`,
      description: '文章归档',
    },
  };
};

const Archives: FC<{ params: Promise<Params> }> = async (props) => {
  const params = await props.params;
  const { pageId } = params;
  const posts = getSortedPostsByPage(Number(pageId), perPage);

  // if (posts.length === 0 || Number(pageId) > pagesCount) {
  //   return notFound()
  // }

  const postGroups = getSortedPostsGroupedByYear(posts);
  const hasNextPage = Number(pageId) < pagesCount;
  const hasPrevPage = Number(pageId) > 1;

  return (
    <div className='normal-container animate-main'>
      <h2 className='page-heading'>
        <span>A</span>rchive
      </h2>
      {postGroups.map((group) => {
        return (
          <div key={group.year} id={`year-${group.year}`}>
            <h2 className='mb-4 mt-4 font-fredoka text-2xl font-medium'>
              {group.year}
            </h2>
            {group.posts.map((post) => {
              return (
                <div key={post.slug} className='archive-card'>
                  <div className='archive-card-detail text-primary-text'>
                    <div className='mb-2 font-rubik text-sm text-secondary-text'>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    <Link href={`/post/${post.slug}`}>
                      <span className='block text-lg'>{post.title}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
      <PaginationControl
        pageId={pageId}
        pagePath='/archives'
        pagesCount={pagesCount}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </div>
  );
};

export default Archives;
