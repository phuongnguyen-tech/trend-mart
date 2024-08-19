import axiosInstance, { endpoints } from 'src/utils/axios';

import PostListHomeView from 'src/sections/post/view/post-list-home-view';

import { IPostItem } from 'src/types/post';

export const metadata = {
  title: 'Post: List',
};

async function getPostList() {
  const res = await axiosInstance.get(`${endpoints.post.list}`);
  return res.data as IPostItem[];
}

export default async function PostListHomePage() {
  const posts = await getPostList();

  return <PostListHomeView postList={posts} />;
}
