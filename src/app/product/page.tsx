import axiosInstance, { endpoints } from 'src/utils/axios';

import ProductShopView from 'src/sections/product/view/product-shop-view';

import { IProductItem } from 'src/types/product';

// Static metadata with enhancements
export const metadata = {
  title: 'TrendMart | Discover High-Quality Products Online',
  description:
    'Explore TrendMart, your go-to online store for top-quality products. Shop now for the best deals on electronics, fashion, home essentials, and more.',
  metadataBase: new URL('https://template-shopping.vercel.app'),
  openGraph: {
    url: 'https://template-shopping.vercel.app/product',
    title: 'TrendMart | Discover High-Quality Products Online',
    description:
      'Visit TrendMart to find the latest and greatest products across multiple categories. Enjoy an exceptional shopping experience with high-quality items and unbeatable prices.',
    images: [
      {
        url: 'https://sefamedia.vn/wp-content/uploads/2023/08/Thumbnail.png',
        width: 800,
        height: 600,
        alt: 'Explore high-quality products at TrendMart',
      },
    ],
    type: 'website',
    site_name: 'TrendMart',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@TrendMartOfficial',
    title: 'TrendMart | Discover High-Quality Products Online',
    description:
      'Shop the latest in electronics, fashion, home essentials, and more at TrendMart. Get the best deals on high-quality products today.',
    image: 'https://sefamedia.vn/wp-content/uploads/2023/08/Thumbnail.png',
  },
  robots: {
    index: true,
    follow: true,
  },
  canonical: 'https://template-shopping.vercel.app/product',
};

export default async function ShopPage() {
  const productList = await getProductList();

  return <ProductShopView productList={productList} />;
}

async function getProductList() {
  const res = await axiosInstance.get(`${endpoints.product.list}`);
  return res.data.products as IProductItem[];
}
