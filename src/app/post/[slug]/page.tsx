import { Metadata } from 'next';
import { FC } from 'react';
import Post from '@/components/Post';
import { notFound } from 'next/navigation';
import { getPost, getSortedPosts } from '@/utils/posts';
import { allArticles } from 'contentlayer/generated';

type Params = {
  slug: string;
};

export const generateStaticParams = async () => {
  const slugs = allArticles.map((article) => article.slug);

  return slugs.map((slug) => ({ slug }));
};

export const generateMetadata = async (
  props: {
    params: Promise<Params>;
  }
): Promise<Metadata> => {
  const params = await props.params;
  const post = getPost(params.slug);

  if (!post) return notFound();

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      url: `/post/${params.slug}`,
      title: post.title,
      images: post.photo ?? undefined,
      description: post.excerpt,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt ?? undefined,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      creator: `@haru_nc_`,
    },
  };
};

const PostPage: FC<{
  params: Promise<Params>;
}> = async (props) => {
  const params = await props.params;
  const { slug } = params;
  const post = getPost(slug);

  if (!post) notFound();

  const sortedPosts = getSortedPosts();
  const currentIndex = sortedPosts.findIndex((p) => p.slug === slug);
  const previousPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;

  return <Post post={post} previousPost={previousPost} nextPost={nextPost} />;
};

export default PostPage;
