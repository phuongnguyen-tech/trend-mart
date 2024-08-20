import { paramCase } from 'src/utils/change-case';
import axiosInstance, { endpoints } from 'src/utils/axios';

import PostDetailsHomeView from 'src/sections/post/view/post-details-home-view';

import { IPostItem } from 'src/types/post';
import { HOST_API } from 'src/config-global';

export const revalidate = 20;

// Hàm để lấy chi tiết bài viết
async function getPostDetails(title: string): Promise<IPostItem | null> {
  try {
    // const res = await fetch(`${HOST_API}/${endpoints.post.details}?title=${title}`, {
    //   next: {
    //     revalidate: 20,
    //   },
    // }).then((r) => r.json());
    const res = await axiosInstance
      .get(`${endpoints.post.details}?title=${title}`)
      .then((r) => r.data);
    return res.post ?? null;
  } catch (error) {
    console.error('Failed to fetch post details:', error);
    return null;
  }
}

// Tạo metadata động
export async function generateMetadata({ params }: Props) {
  const { title } = params;
  const post = await getPostDetails(title);

  return {
    title: `Post: ${post?.title || 'Not Found'}`,
    description: post?.description || 'No description available for this post.',
    metadataBase: new URL(`https://template-shopping.vercel.app/post/${title}`),
    openGraph: {
      title: `Post: ${post?.title || 'Not Found'}`,
      description: post?.description || 'No description available for this post.',
      url: `https://template-shopping.vercel.app/post/${title}`,
      images: [
        {
          url:
            post?.coverUrl ||
            'https://tenten.vn/tin-tuc/wp-content/uploads/2021/09/blog-la-gi-4.jpg',
          width: 800,
          height: 600,
          alt: post?.title || 'Default Post Image',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@yourtwitterhandle',
      title: `Post: ${post?.title || 'Not Found'}`,
      description: post?.description || 'No description available for this post.',
      image:
        post?.coverUrl || 'https://tenten.vn/tin-tuc/wp-content/uploads/2021/09/blog-la-gi-4.jpg',
    },
    robots: {
      index: true,
      follow: true,
    },
    canonical: `https://template-shopping.vercel.app/post/${title}`,
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
