import { Metadata } from 'next';
import { FC } from 'react';
import Post from '@/components/Post';
import { notFound } from 'next/navigation';
import { getPost } from '@/utils/posts';
import { allArticles } from 'contentlayer/generated';

type Params = {
  slug: string;
};

export const generateStaticParams = async () => {
  const slugs = allArticles.map((article) => article.slug);

  return slugs.map((slug) => ({ slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Params;
}): Promise<Metadata> => {
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
  params: Params;
}> = async ({ params }) => {
  const { slug } = params;
  const post = getPost(slug);

  if (!post) notFound();

  return <Post post={post} />;
};

export default PostPage;
