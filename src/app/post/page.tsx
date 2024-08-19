import axiosInstance, { endpoints } from 'src/utils/axios';

import PostListHomeView from 'src/sections/post/view/post-list-home-view';

import { IPostItem } from 'src/types/post';

export const metadata = {
  title: 'Post: TrendMart',
  description:
    'Explore the list of blog posts on Your Blog Name. Find articles, updates, and more on various topics.',
  metadataBase: new URL('https://template-shopping.vercel.app/post'),
  siteName: 'Blog Name',
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
  openGraph: {
    url: 'https://template-shopping.vercel.app/post',
    title: 'Post: TrendMart',
    description:
      'Explore the latest blog posts on Your Blog Name. Stay updated with new articles and insights.',
    images: [
      {
        url: 'https://thinkzone.vn/uploads/2022_01/blogging-1641375905.jpg',
        width: 1200,
        height: 630,
        alt: 'Post List Image',
      },
    ],
    type: 'website',
    site_name: 'Blog Name',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@your_twitter_handle',
    title: 'Post: List',
    description:
      'Find the latest posts and updates on Your Blog Name. Explore various topics and articles.',
    image: 'https://thinkzone.vn/uploads/2022_01/blogging-1641375905.jpg',
  },
  robots: {
    index: true,
    follow: true,
  },
  canonical: 'https://template-shopping.vercel.app/post',
};

async function getPostList() {
  const res = await axiosInstance.get(`${endpoints.post.list}`);
  return res.data as IPostItem[];
}

export default async function PostListHomePage() {
  const posts = await getPostList();

  return <PostListHomeView postList={posts} />;
}
