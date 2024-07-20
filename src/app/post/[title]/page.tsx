import { paramCase } from 'src/utils/change-case';
import axiosInstance, { endpoints } from 'src/utils/axios';

import PostDetailsHomeView from 'src/sections/post/view/post-details-home-view';

export const metadata = {
  title: 'Post: Details',
};

type Props = {
  params: {
    title: string;
  };
};

export default function PostDetailsHomePage({ params }: Props) {
  const { title } = params;

  return <PostDetailsHomeView title={title} />;
}

export async function generateStaticParams() {
  const res = await axiosInstance.get(endpoints.post.list);

  return res.data.posts.map((post: { title: string }) => ({
    title: paramCase(post.title),
  }));
}
