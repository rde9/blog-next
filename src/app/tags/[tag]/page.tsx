import { getAllTags } from '@/utils/posts';
import { redirect } from 'next/navigation';
import { FC } from 'react';

type Params = {
  tag: string;
};

export const generateStaticParams = async () => {
  const tags = getAllTags();
  const tagsArray = Object.entries(tags);
  return tagsArray.map(([tag, _]) => ({ tag }));
};

const TagPageRedirect: FC<{ params: Params }> = ({ params }) => {
  const { tag } = params;
  redirect(`/tags/${tag}/1`);
};

export default TagPageRedirect;
