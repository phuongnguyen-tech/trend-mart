import axios from 'axios';

import { paramCase } from 'src/utils/change-case';
import axiosInstance, { endpoints } from 'src/utils/axios';

import PostDetailsHomeView from 'src/sections/post/view/post-details-home-view';

import { IPostItem } from 'src/types/post';

// Hàm để lấy chi tiết bài viết
async function getPostDetails(title: string): Promise<IPostItem> {
  const res = await axios.get(`${endpoints.post.details}?title=${title}`);
  return res.data?.post as IPostItem;
}

// Tạo metadata động
export async function generateMetadata({ params }: { params: { title: string } }) {
  const { title } = params;
  const post = await getPostDetails(title);

  return {
    title: `Post: ${post.title}`, // Sử dụng tên bài viết để tạo metadata
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
  console.log('detail', post);

  return <PostDetailsHomeView postData={post} title={title} />;
}

export async function generateStaticParams() {
  const res = await axiosInstance.get(endpoints.post.list);

  return res.data.posts.map((post: { title: string }) => ({
    title: paramCase(post.title),
  }));
}
