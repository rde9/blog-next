import { FC } from 'react';
import Post from '@/components/Post';
import { notFound } from 'next/navigation';
import {
  getAllTags,
  getPagesCount,
  getPost,
  getPostsByTag,
} from '@/utils/posts';
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
  tag: string;
  pageId: string;
};

const perPage = 6;

export const generateStaticParams = async () => {
  const tags = getAllTags();
  const tagsArray = Object.entries(tags);
  return tagsArray.map(([tag, _]) => {
    const pagesCount = getPagesCount(perPage, getPostsByTag(tag));
    const pageIds = Array.from({ length: pagesCount }, (_, i) => i + 1);
    return pageIds.map((pageId) => ({ tag, pageId: String(pageId) }));
  });
};

export const generateMetadata = async ({ params }: { params: Params }) => {
  const { tag, pageId } = params;

  return {
    title: `标签: ${tag} - 第${pageId}页`,
    description: '文章标签',
    openGraph: {
      type: 'website',
      url: `/tags/${tag}/${pageId}`,
      title: `标签: ${tag} - 第${pageId}页`,
      description: '文章标签',
    },
  };
};

const TagPage: FC<{ params: Params }> = ({ params }) => {
  const { tag, pageId } = params;
  const posts = getPostsByTag(tag);
  const postGroups = getSortedPostsGroupedByYear(posts);

  // if (posts.length === 0 || Number(pageId) > pagesCount) {
  //   return notFound()
  // }

  const pagesCount = getPagesCount(perPage, posts);
  const hasNextPage = Number(pageId) < pagesCount;
  const hasPrevPage = Number(pageId) > 1;

  return (
    <div className='normal-container animate-main'>
      <h2 className='page-heading'>
        Tag: <span>{tag}</span>
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
                  <div className='archive-card-detail'>
                    <div className='mb-2 font-rubik text-sm text-[--text-l]'>
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
        pagePath={`/tags/${tag}`}
        pagesCount={pagesCount}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </div>
  );
};

export default TagPage;
