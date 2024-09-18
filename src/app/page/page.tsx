import { redirect } from 'next/navigation';

const PostPage: React.FC = async () => {
  redirect('/page/1');
};

export default PostPage;
