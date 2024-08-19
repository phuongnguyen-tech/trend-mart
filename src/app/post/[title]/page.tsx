import { paramCase } from 'src/utils/change-case';
import axiosInstance, { endpoints } from 'src/utils/axios';

import PostDetailsHomeView from 'src/sections/post/view/post-details-home-view';

import { IPostItem } from 'src/types/post';

// Hàm để lấy chi tiết bài viết
async function getPostDetails(title: string): Promise<IPostItem | null> {
  try {
    const res = await axiosInstance.get(`${endpoints.post.details}?title=${title}`);
    return res.data.post ?? null;
  } catch (error) {
    console.error('Failed to fetch post details:', error);
    return null;
  }
}

// Tạo metadata động
export async function generateMetadata({ params }: { params: { title: string } }) {
  const { title } = params;
  const post = await getPostDetails(title);

  return {
    title: `Post: ${post?.title || 'Not Found'}`, // Sử dụng tên bài viết để tạo metadata
  };
}

type Props = {
  params: {
    title: string;
  };
};

export default async function PostDetailsHomePage({ params }: Props) {
  const { title } = params;
  const post = await getPostDetails(title);

  if (!post) {
    return <div>Failed to fetch post details</div>;
  }

  return <PostDetailsHomeView postData={post} title={title} />;
}

export async function generateStaticParams() {
  const res = await axiosInstance.get(endpoints.post.list);

  return res.data.posts.map((post: { title: string }) => ({
    title: paramCase(post.title),
  }));
}
